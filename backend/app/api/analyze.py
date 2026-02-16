from fastapi import APIRouter, File, UploadFile, HTTPException
from app.services.vision import classify_leaf_disease
from app.services.nasa import get_soil_data
from pydantic import BaseModel

router = APIRouter()

class AnalysisResponse(BaseModel):
    disease_analysis: dict
    environmental_data: dict
    risk_assessment: str
    recommendation: list

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_crop(
    lat: float,
    lon: float,
    file: UploadFile = File(...)
):
    # 1. Vision Analysis
    contents = await file.read()
    vision_result = await classify_leaf_disease(contents)
    
    # 2. NASA Data
    env_data = await get_soil_data(lat, lon)
    
    # 3. Logic Engine Co-relation (The "Magic")
    # Rule-based logic for the prototype
    risk = "Moderate"
    if vision_result["disease"] == "Early Blight" and env_data["soil_moisture"] > 40:
        risk = "Critical (High Spread Risk)"
        
    # 4. Mock AI Recommendations (To be replaced by LLM later)
    recommendations = [
        "Apply copper-based fungicide immediately.",
        "Improve air circulation by pruning lower leaves.",
        "Avoid overhead irrigation to reduce humidity."
    ]
    
    return {
        "disease_analysis": vision_result,
        "environmental_data": env_data,
        "risk_assessment": risk,
        "recommendation": recommendations
    }
