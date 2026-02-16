from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import analyze
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend for TerraTwin: The AI Agronomist"
)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for hackathon speed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router, prefix=settings.API_V1_STR, tags=["analysis"])

@app.get("/")
def read_root():
    return {"message": "TerraTwin AI Engine Online"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
