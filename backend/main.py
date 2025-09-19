import shutil
import os
from datetime import datetime
from typing import List, Optional

from fastapi import FastAPI, File, UploadFile, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_URI: str
    DATABASE_NAME: str

    class Config:
        env_file = ".env"

settings = Settings()
UPLOAD_DIRECTORY = "./driver_uploads"

client = AsyncIOMotorClient(settings.MONGO_URI)
db = client[settings.DATABASE_NAME]
driver_collection = db["drivers"]

class VerificationDocument(BaseModel):
    document_type: str
    file_path: str
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)

class Driver(BaseModel):
    driver_id: str
    username: str
    verification_status: str = "NOT_VERIFIED"
    verification_documents: Optional[List[VerificationDocument]] = []

app = FastAPI()

@app.on_event("startup")
async def startup_db_client():
    if not os.path.exists(UPLOAD_DIRECTORY):
        os.makedirs(UPLOAD_DIRECTORY)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

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
        document_payloads.append(doc_data.model_dump())

    await driver_collection.find_one_and_update(
        {"driver_id": driver_id},
        {"$set": {"verification_status": "PENDING_REVIEW", "verification_documents": document_payloads}}
    )

    return {"message": f"Documents for driver '{driver_id}' are pending review.", "status": "PENDING_REVIEW"}

@app.get("/drivers/status/{driver_id}", response_model=Driver)
async def get_driver_status(driver_id: str):
    driver = await driver_collection.find_one({"driver_id": driver_id})
    if driver:
        return driver
    raise HTTPException(status_code=404, detail="Driver not found")
class StatusUpdate(BaseModel):
    new_status: str # Should be 'VERIFIED' or 'REJECTED'

@app.get("/admin/pending-drivers", response_model=List[Driver])
async def get_pending_drivers():
    """
    Returns a list of all drivers with a 'PENDING_REVIEW' status.
    """
    pending_drivers = await driver_collection.find({"verification_status": "PENDING_REVIEW"}).to_list(length=100)
    return pending_drivers

@app.post("/admin/update-status/{driver_id}")
async def update_driver_status(driver_id: str, status_update: StatusUpdate):
    """
    Allows an admin to update a driver's verification status.
    """
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