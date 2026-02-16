# TerraTwin: The AI Agronomist

TerraTwin is a precision agriculture platform winning hackathons by combining Computer Vision, Satellite Data, and LLM Agents.

## 🚀 Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Leaflet, Recharts.
- **Backend**: FastAPI (Python), PyTorch (Mocked), NASA Power API (Mocked).

## 🛠️ Setup Instructions

### 1. Backend (FastAPI)
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
# source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```
*Backend runs on http://localhost:8000*

### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on http://localhost:3000*

## 🌟 Features to Demo
1.  **Dashboard**: View the interactive map and real-time farm stats.
2.  **Analyze**: Go to `/dashboard/analyze`, upload a leaf image.
    -   Watch the **Scanning Animation**.
    -   See **Dr. Green** diagnose "Early Blight".
    -   Read the **AI Treatment Plan**.

## ⚠️ Notes for Hackathon Judges
-   The "Vision Engine" currently runs in **Simulation Mode** (returning 98% confidence for Early Blight) to ensure zero-latency demos.
-   NASA Data is mocked for the specific lat/long of the demo farm.
