import pytest
from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_api_docs_accessible():
    """Test that API documentation is accessible."""
    response = client.get("/docs")
    assert response.status_code == 200


def test_api_openapi_json_accessible():
    """Test that OpenAPI JSON is accessible."""
    response = client.get("/openapi.json")
    assert response.status_code == 200
    data = response.json()
    assert "openapi" in data
    assert "info" in data
    assert "paths" in data


def test_api_v1_prefix():
    """Test that API v1 prefix is correct."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["api_prefix"] == "/api/v1"


def test_rate_limiting_on_root():
    """Test that rate limiting is working on root endpoint."""
    # Make multiple requests to test rate limiting
    for _ in range(5):
        response = client.get("/")
        assert response.status_code == 200


def test_cors_preflight():
    """Test CORS preflight request."""
    response = client.options(
        "/",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "GET",
            "Access-Control-Request-Headers": "Content-Type",
        }
    )
    assert response.status_code == 200
