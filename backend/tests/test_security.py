import pytest
from app.middleware.security import SecurityHeadersMiddleware
from starlette.requests import Request
from starlette.responses import Response


@pytest.mark.asyncio
async def test_security_headers_middleware():
    """Test that security headers middleware adds proper headers."""
    middleware = SecurityHeadersMiddleware(app=None)
    
    # Create a mock request and response
    request = Request(scope={"type": "http", "method": "GET", "headers": []})
    response = Response(content=b"test")
    
    # Apply middleware
    processed_response = await middleware.dispatch(request, lambda req: response)
    
    # Check security headers
    assert processed_response.headers["X-Content-Type-Options"] == "nosniff"
    assert processed_response.headers["X-Frame-Options"] == "DENY"
    assert processed_response.headers["X-XSS-Protection"] == "1; mode=block"
    assert "Strict-Transport-Security" in processed_response.headers
    assert "Content-Security-Policy" in processed_response.headers
    assert processed_response.headers["Referrer-Policy"] == "strict-origin-when-cross-origin"
