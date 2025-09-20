# backend/celery_worker.py
import os
import face_recognition
import pytesseract
from PIL import Image
from celery import Celery
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings

# --- Configuration ---
class Settings(BaseSettings):
    MONGO_URI: str
    DATABASE_NAME: str

    class Config:
        env_file = ".env"

settings = Settings()
# In backend/celery_worker.py
celery_app = Celery("tasks", broker="redis://redis:6379/0", backend="redis://redis:6379/0")

# --- AI Helper Functions (Local Processing) ---
def compare_faces_local(id_image_path, selfie_image_path):
    try:
        # Load images
        id_image = face_recognition.load_image_file(id_image_path)
        selfie_image = face_recognition.load_image_file(selfie_image_path)

        # Get face encodings
        id_face_encodings = face_recognition.face_encodings(id_image)
        selfie_face_encodings = face_recognition.face_encodings(selfie_image)

        # Ensure exactly one face is found in each image
        if len(id_face_encodings) == 1 and len(selfie_face_encodings) == 1:
            # Compare faces and get the distance (lower is better)
            distance = face_recognition.face_distance([id_face_encodings[0]], selfie_face_encodings[0])
            # Convert distance to a similarity percentage (this is an approximation)
            similarity = (1 - distance[0]) * 100
            return similarity
    except Exception as e:
        print(f"Error processing faces: {e}")
    return 0.0

def extract_text_from_image(image_path):
    try:
        return pytesseract.image_to_string(Image.open(image_path))
    except Exception as e:
        print(f"Error with Tesseract OCR: {e}")
    return ""

# --- Celery Task Definition ---
@celery_app.task
def process_verification(driver_id: str):
    client = AsyncIOMotorClient(settings.MONGO_URI)
    db = client[settings.DATABASE_NAME]
    driver_collection = db["drivers"]
    
    driver = driver_collection.find_one({"driver_id": driver_id})
    if not driver or not driver.get("verification_documents"):
        return {"error": "Driver or documents not found"}

    docs = driver["verification_documents"]
    paths = {doc['document_type']: doc['file_path'] for doc in docs}

    try:
        # 1. Compare faces
        similarity = compare_faces_local(paths["GOVERNMENT_ID"], paths["SELFIE"])

        # 2. Extract text from license (example)
        license_text = extract_text_from_image(paths["LICENSE"])
        # TODO: Implement logic to parse the license_text and compare it with other data
        
        print(f"Driver: {driver_id}, Face Similarity: {similarity:.2f}%")
        print(f"Extracted License Text:\n---\n{license_text[:200]}...\n---")

        # 3. Automated Decision
        final_status = "NEEDS_REVIEW"
        # Use a more lenient threshold for local models
        if similarity > 85.0:
            final_status = "VERIFIED"
        
        driver_collection.update_one(
            {"driver_id": driver_id},
            {"$set": {"verification_status": final_status}}
        )
        return {"driver_id": driver_id, "status": final_status, "face_similarity": similarity}

    except FileNotFoundError:
        return {"error": f"Files not found for driver {driver_id}"}
    finally:
        client.close()