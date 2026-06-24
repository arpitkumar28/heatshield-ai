from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # API Settings
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "HeatShield AI"
    VERSION: str = "1.0.0"
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Environment
    ENVIRONMENT: str = "development"
    
    # Database
    DATABASE_URL: str = "sqlite:///./heatshield.db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # CORS
    BACKEND_CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:8080"]
    
    # ISRO Bhuvan API
    BHUVAN_API_KEY: Optional[str] = None
    BHUVAN_API_URL: str = "https://bhuvan.nrsc.gov.in/api"
    
    # Weather Data
    IMD_API_URL: str = "https://imd.gov.in/api"
    
    # AI/ML Settings
    MODEL_PATH: str = "./models"
    BATCH_SIZE: int = 32
    
    # Satellite Data
    LANDSAT_API_URL: str = "https://earthexplorer.usgs.gov/api"
    SENTINEL_API_URL: str = "https://scihub.copernicus.eu/apihub"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
