from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.core.logging import configure_logging, get_logger
from app.api import auth, locations, recommendations, analytics, heatmap
from app.middleware.security import SecurityHeadersMiddleware, setup_rate_limiting, limiter
from app.middleware.prometheus import setup_prometheus

# Configure structured logging
configure_logging()
logger = get_logger(__name__)

# Create database tables
Base.metadata.create_all(bind=engine, checkfirst=True)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-Powered Urban Heat Intelligence Platform for Bharatiya Antariksh Hackathon 2026"
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


@app.get("/")
@limiter.limit("100/minute")
def root(request: Request):
    return {
        "message": "HeatShield AI - Urban Heat Intelligence Platform",
        "version": settings.VERSION,
        "docs": "/docs",
        "api_prefix": settings.API_V1_PREFIX
    }


@app.get("/health")
@limiter.limit("200/minute")
def health_check(request: Request):
    return {"status": "healthy", "service": "heatshield-api"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
