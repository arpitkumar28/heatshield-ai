# HeatShield AI - API Usage Guide

## Overview

This guide provides detailed information on how to use the HeatShield AI REST API for integrating with external applications and services.

## Base URL

- **Development**: `http://localhost:8000`
- **Production**: `https://api.heatshield.example.com`

## Authentication

All API endpoints (except `/health` and `/`) require authentication via JWT tokens.

### Login

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=your_username&password=your_password"
```

**Response**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Using the Token

Include the token in the Authorization header:

```bash
curl -X GET http://localhost:8000/api/v1/locations \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## API Endpoints

### Health Check

```bash
GET /health
```

**Response**
```json
{
  "status": "healthy",
  "service": "heatshield-api"
}
```

### Locations

#### Get All Locations

```bash
GET /api/v1/locations
```

**Response**
```json
[
  {
    "id": "uuid",
    "name": "Central Park",
    "latitude": 40.7829,
    "longitude": -73.9654,
    "region": "Manhattan",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

#### Get Location by ID

```bash
GET /api/v1/locations/{location_id}
```

#### Create Location

```bash
POST /api/v1/locations
Content-Type: application/json

{
  "name": "New Location",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "region": "New York"
}
```

### Heat Maps

#### Get Heat Map Data

```bash
GET /api/v1/locations/{location_id}/heatmap
```

**Query Parameters**
- `date`: Optional date filter (YYYY-MM-DD)
- `resolution`: Resolution level (low, medium, high)

**Response**
```json
{
  "location_id": "uuid",
  "data": [
    {
      "latitude": 40.7829,
      "longitude": -73.9654,
      "temperature": 32.5,
      "heat_index": 35.2,
      "risk_level": "high"
    }
  ],
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Recommendations

#### Get Recommendations

```bash
GET /api/v1/locations/{location_id}/recommendations
```

**Response**
```json
[
  {
    "id": "uuid",
    "type": "vegetation",
    "description": "Increase green cover by 20%",
    "priority": 1,
    "expected_impact": 0.15,
    "implementation_cost": 50000
  }
]
```

### Analytics

#### Get Analytics Data

```bash
GET /api/v1/analytics
```

**Query Parameters**
- `start_date`: Start date (YYYY-MM-DD)
- `end_date`: End date (YYYY-MM-DD)
- `location_id`: Filter by location
- `metric`: Specific metric (temperature, risk, vulnerability)

**Response**
```json
{
  "summary": {
    "avg_temperature": 30.5,
    "max_temperature": 38.2,
    "high_risk_areas": 15,
    "total_locations": 100
  },
  "trends": [
    {
      "date": "2024-01-01",
      "value": 30.5
    }
  ]
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Unauthenticated**: 30 requests/minute
- **Authenticated**: 60 requests/minute
- **Health endpoint**: 200 requests/minute

**Rate Limit Headers**
```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1640995200
```

## Error Handling

### Error Response Format

```json
{
  "detail": "Error message description"
}
```

### Common HTTP Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

### Example Error Response

```json
{
  "detail": "Location not found"
}
```

## SDK Examples

### Python

```python
import requests

# Login
response = requests.post(
    "http://localhost:8000/api/v1/auth/login",
    data={"username": "user", "password": "pass"}
)
token = response.json()["access_token"]

# Get locations
headers = {"Authorization": f"Bearer {token}"}
response = requests.get(
    "http://localhost:8000/api/v1/locations",
    headers=headers
)
locations = response.json()
```

### JavaScript

```javascript
// Login
const response = await fetch('http://localhost:8000/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'username=user&password=pass'
});
const { access_token } = await response.json();

// Get locations
const locations = await fetch('http://localhost:8000/api/v1/locations', {
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
});
const data = await locations.json();
```

### cURL

```bash
# Login
TOKEN=$(curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=user&password=pass" \
  | jq -r '.access_token')

# Get locations
curl -X GET http://localhost:8000/api/v1/locations \
  -H "Authorization: Bearer $TOKEN"
```

## WebSocket Integration (Future)

The API will support WebSocket connections for real-time updates:

```javascript
const ws = new WebSocket('ws://localhost:8000/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Real-time update:', data);
};
```

## Best Practices

1. **Always use HTTPS** in production
2. **Store tokens securely** (httpOnly cookies, secure storage)
3. **Handle rate limits** gracefully with exponential backoff
4. **Cache responses** where appropriate
5. **Validate input data** before sending
6. **Monitor API usage** and set up alerts
7. **Use pagination** for large datasets
8. **Implement retry logic** for transient failures

## Pagination

Large result sets support pagination:

```bash
GET /api/v1/locations?page=1&page_size=20
```

**Response**
```json
{
  "items": [...],
  "total": 100,
  "page": 1,
  "page_size": 20,
  "total_pages": 5
}
```

## Filtering and Sorting

```bash
GET /api/v1/locations?region=Manhattan&sort=name&order=asc
```

## Webhooks (Future)

Configure webhooks to receive notifications:

```bash
POST /api/v1/webhooks
{
  "url": "https://your-app.com/webhook",
  "events": ["heat_alert", "risk_update"]
}
```

## Testing the API

### Using Interactive Documentation

Visit: `http://localhost:8000/docs`

This provides an interactive Swagger UI for testing all endpoints.

### Using Postman

Import the API collection (available in the repository) to Postman for testing.

## Support

- API Documentation: http://localhost:8000/docs
- OpenAPI Spec: http://localhost:8000/openapi.json
- GitHub Issues: Report bugs and feature requests
- Email: support@heatshield.example.com
