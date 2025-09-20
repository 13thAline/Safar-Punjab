# backend/main.py
import shutil
import os
from datetime import datetime
from typing import List, Optional

from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings

# --- NEW: Import Celery ---
from celery import Celery

# --- Configuration ---
class Settings(BaseSettings):
    MONGO_URI: str
    DATABASE_NAME: str

    class Config:
        env_file = ".env"

settings = Settings()
UPLOAD_DIRECTORY = "./driver_uploads"

# --- NEW: Configure Celery for the API ---
# This tells the API how to talk to Redis to send jobs
celery_app = Celery("tasks", broker="redis://redis:6379/0", backend="redis://redis:6379/0")


# --- Database Connection ---
client = AsyncIOMotorClient(settings.MONGO_URI)
db = client[settings.DATABASE_NAME]
driver_collection = db["drivers"]

# --- Pydantic Models ---
class VerificationDocument(BaseModel):
    document_type: str
    file_path: str
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)

class Driver(BaseModel):
    driver_id: str
    username: str
    verification_status: str = "NOT_VERIFIED"
    verification_documents: Optional[List[VerificationDocument]] = []

class StatusUpdate(BaseModel):
    new_status: str

# --- FastAPI App ---
app = FastAPI()

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIRECTORY), name="uploads")
templates = Jinja2Templates(directory="templates")


@app.on_event("startup")
async def startup_db_client():
    if not os.path.exists(UPLOAD_DIRECTORY):
        os.makedirs(UPLOAD_DIRECTORY)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


# --- API Endpoints ---

# This endpoint is what your frontend calls
@app.post("/drivers/upload-verification")
async def upload_verification_documents(files: List[UploadFile] = File(...)):
    if len(files) != 3:
        raise HTTPException(status_code=400, detail="Please upload exactly 3 files.")
    
    driver_id = "driver123" 

    driver = await driver_collection.find_one({"driver_id": driver_id})
    if not driver:
        await driver_collection.insert_one({
            "driver_id": driver_id, "username": "some_driver", 
            "verification_status": "NOT_VERIFIED", "verification_documents": []
        })

    driver_upload_path = os.path.join(UPLOAD_DIRECTORY, driver_id)
    os.makedirs(driver_upload_path, exist_ok=True)

    document_payloads = []
    doc_map = {'id': 'GOVERNMENT_ID', 'license': 'LICENSE', 'selfie': 'SELFIE'}

    for file in files:
        file_base_name = os.path.splitext(file.filename)[0]
        doc_type = doc_map.get(file_base_name, "UNKNOWN")
        file_path = os.path.join(driver_upload_path, file.filename)
        with open(file_path, "wb+") as file_object:
            shutil.copyfileobj(file.file, file_object)
        
        doc_data = VerificationDocument(document_type=doc_type, file_path=file_path)
        document_payloads.append(doc_data.model_dump(mode='json'))

    await driver_collection.find_one_and_update(
        {"driver_id": driver_id},
        {"$set": {"verification_status": "PENDING_REVIEW", "verification_documents": document_payloads}}
    )
    
    # --- THIS LINE NOW WORKS ---
    # It sends a message to Redis, which the worker will pick up.
    celery_app.send_task("celery_worker.process_verification", args=[driver_id])

    return {"message": f"Documents for driver '{driver_id}' submitted for processing.", "status": "PENDING_REVIEW"}


# ... (The rest of your endpoints: get_driver_status, admin_dashboard, etc. remain the same) ...

@app.get("/drivers/status/{driver_id}", response_model=Driver)
async def get_driver_status(driver_id: str):
    driver = await driver_collection.find_one({"driver_id": driver_id})
    if driver:
        return Driver(**driver)
    raise HTTPException(status_code=404, detail="Driver not found")

@app.get("/admin/dashboard", response_class=HTMLResponse)
async def admin_dashboard(request: Request):
    return templates.TemplateResponse("admin.html", {"request": request})

@app.get("/admin/pending-drivers", response_model=List[Driver])
async def get_pending_drivers():
    pending_drivers = []
    cursor = driver_collection.find({"verification_status": "PENDING_REVIEW"})
    async for document in cursor:
        pending_drivers.append(Driver(**document))
    return pending_drivers

@app.post("/admin/update-status/{driver_id}")
async def update_driver_status(driver_id: str, status_update: StatusUpdate):
    new_status = status_update.new_status
    if new_status not in ["VERIFIED", "REJECTED"]:
        raise HTTPException(status_code=400, detail="Invalid status. Must be 'VERIFIED' or 'REJECTED'.")

    update_result = await driver_collection.find_one_and_update(
        {"driver_id": driver_id},
        {"$set": {"verification_status": new_status}}
    )

    if update_result is None:
        raise HTTPException(status_code=404, detail=f"Driver '{driver_id}' not found.")

    return {"driver_id": driver_id, "new_status": new_status}