# HeatShield AI API Documentation

## Base URL

```
http://localhost:8000/api/v1
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepassword",
  "full_name": "John Doe",
  "role": "public"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/x-www-form-urlencoded

username=user@example.com&password=securepassword
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

### Locations

#### Create Location
```http
POST /locations
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "location_type": "city",
  "population": 20000000,
  "area_sqkm": 1484.0
}
```

#### Get Location
```http
GET /locations/{location_id}
```

#### Get All Locations
```http
GET /locations?location_type=city
```

### Heat Data

#### Create Heat Data
```http
POST /heat-data
Authorization: Bearer <token>
Content-Type: application/json

{
  "location_id": 1,
  "timestamp": "2024-01-15T12:00:00Z",
  "land_surface_temperature": 38.5,
  "air_temperature": 35.0,
  "heat_index": 42.0,
  "ndvi": 0.45,
  "ndwi": 0.2,
  "albedo": 0.25,
  "emissivity": 0.95,
  "urban_density": 0.7,
  "impervious_surface": 0.6
}
```

#### Get Heat Data for Location
```http
GET /locations/{location_id}/heat-data?limit=100
```

#### Get Hotspots
```http
GET /hotspots?threshold=0.7
```

### Cooling Centers

#### Create Cooling Center
```http
POST /cooling-centers
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Community Center A",
  "latitude": 28.6140,
  "longitude": 77.2100,
  "address": "123 Main Street",
  "capacity": 500,
  "current_occupancy": 200,
  "facilities": ["AC", "Water", "Medical"],
  "operating_hours": "9:00 AM - 9:00 PM",
  "contact_phone": "+91-11-12345678"
}
```

#### Get Nearby Cooling Centers
```http
GET /cooling-centers/nearby?latitude=28.6139&longitude=77.2090&radius_km=5.0
```

### Recommendations

#### Create Recommendation
```http
POST /recommendations
Authorization: Bearer <token>
Content-Type: application/json

{
  "location_id": 1,
  "title": "Increase Green Cover",
  "description": "Plant trees and increase vegetation cover to reduce urban heat",
  "category": "vegetation",
  "priority": "high",
  "temperature_reduction": 2.5,
  "cost_estimate": 5000000,
  "implementation_time": "6 months",
  "benefit_cost_ratio": 3.5
}
```

#### Get Recommendations for Location
```http
GET /locations/{location_id}/recommendations
```

#### Get Recommendations by Category
```http
GET /recommendations/category/{category}
```

#### Update Recommendation Status
```http
PUT /recommendations/{rec_id}/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "implemented"
}
```

### Heat Alerts

#### Create Heat Alert
```http
POST /heat-alerts
Authorization: Bearer <token> (Admin only)
Content-Type: application/json

{
  "location_id": 1,
  "alert_type": "heatwave",
  "severity": "extreme",
  "title": "Extreme Heatwave Warning",
  "message": "Temperatures expected to reach 45°C. Stay indoors and stay hydrated.",
  "start_time": "2024-06-15T10:00:00Z",
  "end_time": "2024-06-17T18:00:00Z",
  "max_temperature": 45.0,
  "min_temperature": 30.0,
  "humidity": 60.0,
  "heat_index": 48.0,
  "affected_population": 5000000,
  "area_description": "Central and North Delhi"
}
```

#### Get Active Alerts
```http
GET /heat-alerts?location_id=1
```

#### Deactivate Alert
```http
PUT /heat-alerts/{alert_id}/deactivate
Authorization: Bearer <token> (Admin only)
```

### Analytics

#### Get Heat Trends
```http
GET /analytics/heat-trends?location_id=1&days=30
```

**Response:**
```json
{
  "location_id": 1,
  "period_days": 30,
  "data_points": 720,
  "trends": [
    {
      "timestamp": "2024-06-01T00:00:00Z",
      "lst": 35.2,
      "heat_index": 38.5,
      "ndvi": 0.48,
      "heat_impact_score": 0.65
    }
  ]
}
```

#### Get Analytics Summary
```http
GET /analytics/summary
```

**Response:**
```json
{
  "total_locations": 50,
  "total_heat_data_points": 15000,
  "total_hotspots": 156,
  "total_recommendations": 89,
  "average_lst_celsius": 38.5,
  "average_heat_index": 42.1,
  "average_ndvi": 0.45
}
```

#### Compare Locations
```http
GET /analytics/location-comparison?location_ids=1,2,3
```

#### Get Vulnerability Map
```http
GET /analytics/vulnerability-map
```

## Error Responses

All endpoints may return error responses:

```json
{
  "detail": "Error message description"
}
```

### HTTP Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required or invalid
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `422 Unprocessable Entity`: Validation error
- `500 Internal Server Error`: Server error

## Rate Limiting

API requests are rate limited to 100 requests per minute per user.

## Pagination

List endpoints support pagination:

```
GET /locations?page=1&limit=20
```

## Filtering

Most list endpoints support filtering:

```
GET /heat-data?location_id=1&start_date=2024-01-01&end_date=2024-12-31
```

## Interactive Documentation

Interactive API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
