import random

async def classify_leaf_disease(image_bytes: bytes):
    """
    Simulates a running MobileNetV3 model.
    In reality, we would load the model and run inference.
    For the hackathon demo, we return 'Early Blight' with high confidence.
    """
    # Simulate processing delay if needed, but keeping it fast for "wow" factor
    
    # Mock Response
    return {
        "disease": "Early Blight",
        "confidence": 0.98,
        "plant": "Tomato",
        "severity": "High"
    }
