# HeatShield AI - Data Flow Architecture

## Overview

This document describes the data flow patterns and data lifecycle within the HeatShield AI system.

## Data Sources

### External APIs
1. **ISRO Bhuvan API**: Satellite imagery and geospatial data
2. **IMD API**: Weather data and meteorological information
3. **Landsat API**: Landsat satellite imagery
4. **Sentinel API**: Sentinel satellite imagery

### User Input
- Location coordinates
- User preferences
- Historical data queries
- Feedback and ratings

## Data Flow Diagrams

### 1. Heat Map Generation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     Heat Map Generation Flow                     │
└─────────────────────────────────────────────────────────────────┘

User Request (Frontend)
    ↓
Backend API (FastAPI)
    ↓
Check Redis Cache
    ↓ (cache miss)
Fetch Satellite Data (Bhuvan/Landsat/Sentinel APIs)
    ↓
AI Services (Processing Layer)
    ↓
Physics Calculations (NDVI, LST, Albedo)
    ↓
ML Model Inference (Heat Prediction)
    ↓
Vulnerability Assessment
    ↓
Risk Calculation
    ↓
Store Results (PostgreSQL)
    ↓
Update Redis Cache
    ↓
Return to Frontend
```

### 2. Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      Authentication Flow                         │
└─────────────────────────────────────────────────────────────────┘

User (Frontend)
    ↓
Login/Register Request
    ↓
Backend API (FastAPI)
    ↓
Validate Input (Pydantic)
    ↓
Check Database (PostgreSQL)
    ↓
Hash Password (bcrypt)
    ↓
Generate JWT Token
    ↓
Store Session (Redis)
    ↓
Return Token to Frontend
    ↓
Frontend Stores Token (localStorage/cookie)
    ↓
Subsequent Requests Include Token
    ↓
Backend Validates Token
    ↓
Grant/Deny Access
```

### 3. Real-time Data Processing Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                 Real-time Data Processing Flow                    │
└─────────────────────────────────────────────────────────────────┘

Scheduled Task (Celery Beat)
    ↓
Fetch Latest Weather Data (IMD API)
    ↓
Fetch Latest Satellite Data
    ↓
AI Services Processing
    ↓
Update Heat Maps
    ↓
Calculate New Risk Levels
    ↓
Update PostgreSQL
    ↓
Invalidate Redis Cache
    ↓
Send Notifications (if needed)
```

### 4. Analytics and Reporting Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                  Analytics and Reporting Flow                    │
└─────────────────────────────────────────────────────────────────┘

User Request Analytics
    ↓
Backend API (FastAPI)
    ↓
Query Historical Data (PostgreSQL)
    ↓
Aggregate and Transform
    ↓
Generate Visualizations (Recharts)
    ↓
Apply Filters and Grouping
    ↓
Export Data (CSV/PDF if requested)
    ↓
Return to Frontend
```

## Data Models

### Location Data
```python
{
    "id": UUID,
    "latitude": float,
    "longitude": float,
    "name": string,
    "region": string,
    "created_at": timestamp,
    "updated_at": timestamp
}
```

### Heat Data
```python
{
    "id": UUID,
    "location_id": UUID,
    "land_surface_temperature": float,
    "heat_index": float,
    "ndvi": float,
    "ndwi": float,
    "albedo": float,
    "timestamp": timestamp,
    "source": string
}
```

### Vulnerability Data
```python
{
    "id": UUID,
    "location_id": UUID,
    "vulnerability_score": float,
    "risk_level": enum,
    "factors": dict,
    "timestamp": timestamp
}
```

### Recommendation Data
```python
{
    "id": UUID,
    "location_id": UUID,
    "recommendation_type": enum,
    "description": string,
    "priority": int,
    "implementation_cost": float,
    "expected_impact": float,
    "timestamp": timestamp
}
```

## Caching Strategy

### Redis Cache Keys
- `location:{id}`: Location data (TTL: 1 hour)
- `heatmap:{lat}:{lon}`: Heat map data (TTL: 30 minutes)
- `weather:{region}`: Weather data (TTL: 15 minutes)
- `user:{id}`: User session data (TTL: 24 hours)
- `analytics:{date}`: Aggregated analytics (TTL: 6 hours)

### Cache Invalidation
- Manual invalidation on data updates
- Time-based expiration (TTL)
- Cache warming on scheduled tasks
- Selective invalidation by pattern

## Data Processing Pipeline

### 1. Raw Data Ingestion
```
External APIs → Data Validation → Normalization → Storage
```

### 2. Feature Engineering
```
Raw Data → Physics Calculations → Feature Extraction → Feature Selection
```

### 3. Model Inference
```
Features → Model Loading → Inference → Post-processing → Results
```

### 4. Result Aggregation
```
Individual Results → Aggregation → Risk Assessment → Recommendations
```

## Error Handling

### Data Validation Errors
- Log error with context
- Return meaningful error message
- Use default values where appropriate
- Alert monitoring system

### API Failure Handling
- Retry with exponential backoff
- Circuit breaker pattern
- Fallback to cached data
- Alert operations team

### Database Errors
- Connection pooling
- Retry logic
- Transaction rollback
- Data consistency checks

## Data Security

### Encryption
- Data at rest: PostgreSQL encryption
- Data in transit: TLS 1.3
- Secrets: Kubernetes secrets
- PII: Masking and anonymization

### Access Control
- Role-based access control (RBAC)
- API key authentication
- IP whitelisting (optional)
- Audit logging

## Data Retention

### Retention Policy
- Raw satellite data: 90 days
- Processed heat data: 1 year
- User data: Until account deletion
- Analytics data: 2 years
- Logs: 30 days

### Data Archival
- Cold storage for historical data
- Compressed archives
- Indexed retrieval
- Backup verification

## Monitoring

### Data Quality Metrics
- Data freshness
- Data completeness
- Data accuracy
- Processing latency

### Performance Metrics
- API response times
- Cache hit rates
- Database query performance
- ML inference latency

## Future Enhancements

### Planned Improvements
- Real-time streaming with Kafka
- Advanced caching with CDN
- Data versioning with DVC
- Automated data quality checks
- Anomaly detection in data pipelines
