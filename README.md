# HeatShield AI - Urban Heat Intelligence Platform

**AI-Powered Urban Heat Island Detection and Analysis System for Bharatiya Antariksh Hackathon 2026**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Python](https://img.shields.io/badge/python-3.11+-green)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Flutter](https://img.shields.io/badge/Flutter-3.0+-blue)

## 🚀 Overview

HeatShield AI is a comprehensive geospatial AI/ML platform designed to identify Urban Heat Island (UHI) hotspots, analyze the drivers of urban heating, and recommend optimized cooling interventions using satellite imagery, machine learning, and physics-informed decision making.

## 🎯 Key Features

### Web Dashboard (Next.js)
- **Interactive Heat Maps**: Real-time LST visualization using Leaflet/OpenStreetMap
- **NDVI Vegetation Layer**: Monitor vegetation health and coverage
- **Heat Hotspot Detection**: AI-powered identification of high-risk areas
- **Heat Impact Score**: Comprehensive scoring system for heat vulnerability
- **AI-Generated Recommendations**: Data-driven cooling intervention suggestions
- **Scenario Simulator**: Model the impact of different interventions
- **Analytics Dashboard**: Comprehensive metrics and trends
- **Cost-Benefit Analysis**: Evaluate intervention effectiveness
- **Explainable AI**: SHAP-based model interpretability

### Flutter Mobile App
- **Heatwave Alerts**: Real-time push notifications for extreme heat events
- **Real-time Heat Index**: Current conditions at your location
- **Nearby Cooling Centers**: Find and navigate to cooling facilities
- **Heat-Safe Routes**: Optimal path planning avoiding heat hotspots
- **Hospital & Emergency Locations**: Quick access to medical facilities
- **Community Heat Reporting**: Citizen science data collection
- **Location-Based Services**: Personalized heat risk assessment

### Backend (FastAPI)
- **REST APIs**: Comprehensive API endpoints for all features
- **JWT Authentication**: Secure user authentication and authorization
- **Role-Based Access**: Admin, researcher, and public user roles
- **PostgreSQL + PostGIS**: Advanced geospatial database capabilities
- **Geospatial Processing**: Spatial queries and analysis endpoints
- **Recommendation Engine**: AI-driven intervention suggestions
- **Dashboard Analytics**: Aggregated data for visualization
- **Mobile App APIs**: Optimized endpoints for mobile clients

### AI/ML Engine
- **Random Forest**: Robust ensemble learning for heat prediction
- **XGBoost**: Gradient boosting for accurate forecasting
- **Heat Hotspot Prediction**: Proactive identification of emerging hotspots
- **Future Heat Forecasting**: Time-series prediction capabilities
- **Explainable AI (SHAP)**: Model interpretability and feature importance
- **Heat Vulnerability Scoring**: Multi-factor risk assessment

### Physics-Informed Layer
- **Land Surface Temperature (LST)**: Satellite-derived thermal analysis
- **Surface Albedo**: Reflectivity measurements and modeling
- **NDVI**: Vegetation health monitoring
- **Surface Emissivity**: Thermal emission characteristics
- **Urban Energy Balance**: Physics-based thermal modeling
- **Stefan-Boltzmann Analysis**: Radiative transfer calculations

## 🛠 Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Leaflet**: Interactive maps
- **Recharts**: Data visualization
- **Lucide React**: Icon library

### Mobile
- **Flutter**: Cross-platform mobile development
- **Riverpod**: State management
- **Dio**: HTTP client
- **Flutter Map**: Mobile mapping
- **Geolocator**: Location services

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: ORM and database toolkit
- **PostgreSQL**: Relational database
- **PostGIS**: Geospatial extensions
- **Redis**: Caching and session management

### AI/ML
- **Python**: Primary ML language
- **Scikit-Learn**: Machine learning algorithms
- **XGBoost**: Gradient boosting
- **Pandas**: Data manipulation
- **GeoPandas**: Geospatial data processing
- **Rasterio**: Raster data I/O
- **GDAL**: Geospatial data abstraction
- **SHAP**: Explainable AI

## 📁 Project Structure

```
heatshield-ai/
├── frontend/              # Next.js web application
│   ├── src/
│   │   ├── app/          # Next.js App Router pages
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities and API clients
│   │   └── styles/       # Global styles
│   ├── public/           # Static assets
│   └── package.json
├── mobile/               # Flutter mobile application
│   ├── lib/
│   │   ├── models/       # Data models
│   │   ├── services/     # API services
│   │   ├── screens/      # UI screens
│   │   └── widgets/      # Reusable widgets
│   ├── android/          # Android configuration
│   ├── ios/              # iOS configuration
│   └── pubspec.yaml
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── core/         # Configuration and security
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Pydantic schemas
│   │   ├── services/     # Business logic
│   │   └── utils/        # Utilities
│   ├── tests/            # Backend tests
│   ├── requirements.txt
│   └── Dockerfile
├── ai-services/          # AI/ML processing services
│   ├── models/           # ML models
│   ├── processing/       # Data processing
│   ├── utils/            # ML utilities
│   └── requirements.txt
├── docs/                 # Documentation
│   ├── api/              # API documentation
│   ├── architecture/     # System architecture
│   └── user-guides/      # User guides
├── datasets/             # Data storage
│   ├── raw/              # Raw satellite data
│   └── processed/        # Processed datasets
└── deployment/           # Deployment configurations
    ├── docker/           # Docker configurations
    ├── kubernetes/       # K8s manifests
    └── terraform/        # Infrastructure as code
```

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- Flutter 3.0+
- PostgreSQL 15+ with PostGIS
- Redis 7+

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/heatshield-ai.git
cd heatshield-ai
```

#### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your configuration
uvicorn app.main:app --reload
```

#### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

#### 4. Mobile App Setup

```bash
cd mobile
flutter pub get
flutter run
```

#### 5. AI Services Setup

```bash
cd ai-services
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

### Database Setup

```bash
# Create PostgreSQL database with PostGIS extension
createdb heatshield
psql -d heatshield -c "CREATE EXTENSION postgis;"

# Run migrations (if using Alembic)
cd backend
alembic upgrade head
```

## 🔧 Configuration

### Environment Variables

Backend (`.env`):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/heatshield
SECRET_KEY=your-secret-key
REDIS_URL=redis://localhost:6379/0
BHUVAN_API_KEY=your-bhuvan-api-key
```

Frontend (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## 📊 Data Sources

- **ISRO Bhuvan**: Indian satellite imagery
- **Landsat 8/9**: NASA thermal and multispectral data
- **Sentinel-2**: ESA high-resolution imagery
- **MODIS**: NASA moderate resolution data
- **IMD Weather Data**: India Meteorological Department
- **OpenStreetMap**: Open source mapping data
- **GHSL**: Global Human Settlement Layer

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test

# Mobile tests
cd mobile
flutter test
```

## 📈 API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🐳 Docker Deployment

```bash
# Build and run all services
docker-compose up -d

# Individual services
docker-compose up backend
docker-compose up frontend
docker-compose up mobile
```

## 🎨 Screenshots

### Web Dashboard
- Interactive heat map with real-time data
- Analytics dashboard with comprehensive metrics
- AI recommendations with explainable insights

### Mobile App
- Heat map view with location-based data
- Alert system with push notifications
- Cooling center finder with navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Built for **Bharatiya Antariksh Hackathon 2026**

## 🙏 Acknowledgments

- ISRO for satellite data access
- IMD for weather data
- Open source community for amazing tools

## 📞 Contact

For questions or support, please contact the team at heatshield@example.com

---

**Built with ❤️ for a cooler, smarter India**
