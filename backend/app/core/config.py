from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import PostgresDsn, RedisDsn, field_validator
from typing import List, Union, Any


class Settings(BaseSettings):
    # API Settings
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "HeatShield AI"
    VERSION: str = "1.0.0"
    
    # Security - Mandatory in production
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Environment
    ENVIRONMENT: str = "development"
    
    # Database - Using Pydantic for DSN validation
    DATABASE_URL: Union[str, PostgresDsn]
    
    # Redis
    REDIS_URL: Union[str, RedisDsn] = "redis://localhost:6379/0"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
    
    # ISRO Bhuvan API
    BHUVAN_API_KEY: str = ""
    BHUVAN_API_URL: str = "https://bhuvan.nrsc.gov.in/api"
    
    # Weather Data
    IMD_API_URL: str = "https://imd.gov.in/api"
    
    # AI/ML Settings
    MODEL_PATH: str = "./models"
    BATCH_SIZE: int = 32
    
    # Satellite Data
    LANDSAT_API_URL: str = "https://earthexplorer.usgs.gov/api"
    SENTINEL_API_URL: str = "https://scihub.copernicus.eu/apihub"
    
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()
