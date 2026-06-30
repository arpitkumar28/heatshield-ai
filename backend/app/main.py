import sys
from pathlib import Path

# Ensure the sibling `ai-services` package is importable when running from the
# backend folder or from tests/containers that don't set PYTHONPATH.
ROOT = Path(__file__).resolve().parents[2]
AI_SERVICES_PATH = ROOT / "ai-services"
if AI_SERVICES_PATH.exists():
    sys.path.insert(0, str(AI_SERVICES_PATH))

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import configure_logging, get_logger
from app.api import auth, locations, recommendations, analytics, heatmap, ai_heat, ai_vulnerability, ai_forecast, ai_training, websocket, sse
from app.middleware.security import SecurityHeadersMiddleware, setup_rate_limiting, limiter
from app.middleware.prometheus import setup_prometheus

# Configure structured logging
configure_logging()
logger = get_logger(__name__)

# NOTE: Base.metadata.create_all(bind=engine) removed for production readiness.
# Use Alembic for database migrations.

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Enterprise AI-Powered Urban Heat Intelligence Platform"
)

# Security headers middleware
app.add_middleware(SecurityHeadersMiddleware)

# CORS middleware - restricted to specific methods and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
)

# Setup rate limiting
setup_rate_limiting(app)

# Setup Prometheus metrics
setup_prometheus(app)

# Include routers
app.include_router(auth.router, prefix=f"{settings.API_V1_PREFIX}/auth", tags=["Authentication"])
app.include_router(locations.router, prefix=f"{settings.API_V1_PREFIX}/locations", tags=["Locations"])
app.include_router(recommendations.router, prefix=f"{settings.API_V1_PREFIX}/recommendations", tags=["Recommendations"])
app.include_router(analytics.router, prefix=f"{settings.API_V1_PREFIX}/analytics", tags=["Analytics"])
app.include_router(heatmap.router, prefix=f"{settings.API_V1_PREFIX}/heatmap", tags=["Heatmap"])
app.include_router(ai_heat.router, prefix=f"{settings.API_V1_PREFIX}/ai/heat", tags=["AI Heat Prediction"])
app.include_router(ai_vulnerability.router, prefix=f"{settings.API_V1_PREFIX}/ai/vulnerability", tags=["AI Vulnerability"])
app.include_router(ai_forecast.router, prefix=f"{settings.API_V1_PREFIX}/ai/forecast", tags=["AI Forecast"])
app.include_router(ai_training.router, prefix=f"{settings.API_V1_PREFIX}/ai/training", tags=["AI Training"])
app.include_router(websocket.router, prefix=f"{settings.API_V1_PREFIX}/realtime", tags=["Realtime"])
app.include_router(sse.router, prefix=f"{settings.API_V1_PREFIX}/realtime/sse", tags=["Server-Sent Events"])


@app.get("/")
@limiter.limit("100/minute")
def root(request: Request):
    return {
        "message": "HeatShield AI - Urban Heat Intelligence Platform",
        "version": settings.VERSION,
        "docs": "/docs",
        "api_prefix": settings.API_V1_PREFIX
    }


@app.options("/")
def root_options():
    return {}


@app.get("/health")
@limiter.limit("200/minute")
def health_check(request: Request):
    return {"status": "healthy", "service": "heatshield-api"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
