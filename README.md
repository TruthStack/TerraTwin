# 🌍 TerraTwin: The AI Agronomist

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> **Bio-Futurism meets Precision Agriculture.** TerraTwin is a state-of-the-art AI platform designed to empower farmers with real-time satellite insights, computer vision crop analysis, and LLM-driven expert recommendations.

---

## ✨ Features

- **🛡️ Dr. Green AI**: A persistent, intelligent agronomist agent that analyzes your farm data and provides actionable insights.
- **🛰️ Satellite Intelligence**: Integrated NASA data feeds for moisture, heat maps, and soil health monitoring.
- **👁️ Vision Engine**: Edge-ready computer vision to detect crop diseases and nutrient deficiencies from simple smartphone uploads.
- **🌐 Bio-Futurist UI**: A stunning, high-performance dashboard featuring 3D Hero Globes (Three.js) and fluid animations (Framer Motion).
- **📊 Precision Analytics**: Detailed crop-specific metrics and growth projections.

---

## 🛠️ Tech Stack

### Frontend (Bio-Futurist Interface)
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS + Custom Bio-Glass themes
- **Animations**: Framer Motion
- **Visuals**: Three.js & React Three Fiber (Global Mapping)
- **Maps**: Leaflet (Precision Farm Overlays)

### Backend (Intelligence Layer)
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Models**: Vision Transformers (Disease Detection)
- **Interactions**: LLM Agent (Groq/Gemini fallbacks)
- **Integrations**: NASA EarthData API

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TruthStack/TerraTwin.git
   cd TerraTwin
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## ☁️ Deployment

### Frontend (Vercel)
The frontend is optimized for zero-config Vercel deployment.
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FTruthStack%2FTerraTwin&root-directory=frontend)

---

## 🗺️ Roadmap

- [ ] **Phase 1**: Real-time multi-spectral satellite integration.
- [ ] **Phase 2**: Autonomous drone flight path generation.
- [ ] **Phase 3**: Blockchain-based supply chain transparency for "Terra-Certified" crops.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by <b>TruthStack</b> for <b>AI for Good</b>
</p>
