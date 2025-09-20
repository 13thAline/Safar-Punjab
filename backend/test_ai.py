# backend/test_ai.py
import face_recognition
import pytesseract
from PIL import Image
import os

print("--- Starting AI Verification Test ---")

# --- Configuration ---
# Make sure you have uploaded images in this exact path
DRIVER_UPLOADS_DIR = os.path.join("driver_uploads", "driver123")
ID_IMAGE_PATH = os.path.join(DRIVER_UPLOADS_DIR, "id.jpeg")
LICENSE_IMAGE_PATH = os.path.join(DRIVER_UPLOADS_DIR, "license.jpg")
SELFIE_IMAGE_PATH = os.path.join(DRIVER_UPLOADS_DIR, "selfie.jpg")

# --- Test 1: Facial Recognition ---
print("\n[1] Testing Facial Recognition...")
try:
    id_image = face_recognition.load_image_file(ID_IMAGE_PATH)
    selfie_image = face_recognition.load_image_file(SELFIE_IMAGE_PATH)

    id_face_encodings = face_recognition.face_encodings(id_image)
    selfie_face_encodings = face_recognition.face_encodings(selfie_image)

    if not id_face_encodings:
        print("   ERROR: No face found in the ID image.")
    elif not selfie_face_encodings:
        print("   ERROR: No face found in the selfie image.")
    else:
        distance = face_recognition.face_distance([id_face_encodings[0]], selfie_face_encodings[0])
        similarity = (1 - distance[0]) * 100
        print(f"   ---> SUCCESS: Face similarity is {similarity:.2f}%")
        
except FileNotFoundError:
    print(f"   ERROR: Make sure your test images exist at the correct paths:")
    print(f"   - {ID_IMAGE_PATH}")
    print(f"   - {SELFIE_IMAGE_PATH}")
except Exception as e:
    print(f"   ---> FAILED: An unexpected error occurred: {e}")

# --- Test 2: OCR (Text Extraction) ---
print("\n[2] Testing OCR with Pytesseract...")
try:
    extracted_text = pytesseract.image_to_string(Image.open(LICENSE_IMAGE_PATH))
    if extracted_text.strip():
        print(f"   ---> SUCCESS: Extracted Text:")
        print("   ---------------------------------")
        print(f"   {extracted_text[:300]}...") # Print first 300 chars
        print("   ---------------------------------")
    else:
        print("   WARNING: OCR ran but extracted no text. Image quality might be low.")
except FileNotFoundError:
     print(f"   ERROR: Make sure your license image exists at: {LICENSE_IMAGE_PATH}")
except Exception as e:
    print(f"   ---> FAILED: Tesseract error. Is it installed and in your system's PATH? Error: {e}")

print("\n--- Test Complete ---")