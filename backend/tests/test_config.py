import pytest
from app.core.config import settings


def test_settings_defaults():
    """Test that settings have proper default values."""
    assert settings.API_V1_PREFIX == "/api/v1"
    assert settings.PROJECT_NAME == "HeatShield AI"
    assert settings.VERSION == "1.0.0"
    assert settings.ALGORITHM == "HS256"
    assert settings.ACCESS_TOKEN_EXPIRE_MINUTES == 30
    assert settings.BATCH_SIZE == 32


def test_settings_database_url():
    """Test database URL setting."""
    assert settings.DATABASE_URL is not None
    assert isinstance(settings.DATABASE_URL, str)


def test_settings_redis_url():
    """Test Redis URL setting."""
    assert settings.REDIS_URL is not None
    assert isinstance(settings.REDIS_URL, str)


def test_settings_cors_origins():
    """Test CORS origins setting."""
    assert settings.BACKEND_CORS_ORIGINS is not None
    assert isinstance(settings.BACKEND_CORS_ORIGINS, list)
    assert len(settings.BACKEND_CORS_ORIGINS) > 0


def test_settings_api_urls():
    """Test API URL settings."""
    assert settings.BHUVAN_API_URL is not None
    assert settings.IMD_API_URL is not None
    assert settings.LANDSAT_API_URL is not None
    assert settings.SENTINEL_API_URL is not None
