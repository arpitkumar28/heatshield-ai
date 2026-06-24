import pytest
from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_root_endpoint():
    """Test the root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "version" in data
    assert "docs" in data
    assert data["message"] == "HeatShield AI - Urban Heat Intelligence Platform"


def test_health_check():
    """Test the health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "heatshield-api"


def test_cors_headers():
    """Test that CORS headers are properly set."""
    response = client.options("/", headers={"Origin": "http://localhost:3000"})
    assert response.status_code == 200


def test_security_headers():
    """Test that security headers are present."""
    response = client.get("/")
    assert response.status_code == 200
    assert "X-Content-Type-Options" in response.headers
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert "X-Frame-Options" in response.headers
    assert response.headers["X-Frame-Options"] == "DENY"
    assert "X-XSS-Protection" in response.headers
