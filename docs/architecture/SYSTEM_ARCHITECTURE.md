# HeatShield AI - System Architecture

## Overview

HeatShield AI is a comprehensive urban heat intelligence platform designed to detect, analyze, and mitigate urban heat islands. The system follows a microservices architecture with clear separation of concerns across multiple services.

## Architecture Diagram

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Frontend   │    │   Mobile    │    │ AI Services │
│  (Next.js)  │    │  (Flutter)  │    │  (Python)   │
└──────┬──────┘    └──────┬──────┘    └──────┬──────┘
       │                  │                  │
       └──────────────────┼──────────────────┘
                          │
                  ┌───────▼───────┐
                  │   Backend    │
                  │   (FastAPI)  │
                  └───────┬───────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
         ┌────▼────┐ ┌───▼───┐ ┌────▼────┐
         │PostgreSQL│ │ Redis │ │RabbitMQ │
         │ + PostGIS│ │       │ │ (Celery)│
         └─────────┘ └───────┘ └─────────┘
```

## Component Overview

### Frontend (Next.js 15)
- **Purpose**: Web-based user interface for heat map visualization and analytics
- **Technology**: Next.js 15, React 18, TypeScript, Tailwind CSS, Leaflet
- **Responsibilities**:
  - Interactive heat map visualization
  - Dashboard and analytics display
  - User authentication interface
  - Recommendation display

### Backend (FastAPI)
- **Purpose**: RESTful API server handling business logic and data management
- **Technology**: FastAPI, Python 3.11, SQLAlchemy, PostgreSQL, Redis
- **Responsibilities**:
  - API endpoint management
  - Authentication and authorization
  - Data validation and processing
  - Caching layer management
  - Task orchestration via Celery

### AI Services (Python)
- **Purpose**: Machine learning models for heat prediction and vulnerability assessment
- **Technology**: TensorFlow, PyTorch, XGBoost, scikit-learn, SHAP
- **Responsibilities**:
  - Heat prediction models
  - Vulnerability assessment
  - Risk calculation
  - Model explainability (SHAP)
  - Physics-based calculations

### Mobile (Flutter)
- **Purpose**: Mobile application for on-the-go heat monitoring
- **Technology**: Flutter SDK, Riverpod, Dio
- **Responsibilities**:
  - Mobile heat map display
  - Location-based alerts
  - Offline data caching
  - Push notifications

### Data Storage

#### PostgreSQL + PostGIS
- **Purpose**: Primary relational database with geospatial extensions
- **Usage**:
  - User data and authentication
  - Location data with geospatial coordinates
  - Historical heat data
  - Recommendations and analytics results

#### Redis
- **Purpose**: In-memory caching and session management
- **Usage**:
  - API response caching
  - Session storage
  - Rate limiting
  - Real-time data caching

#### RabbitMQ + Celery
- **Purpose**: Message queue for asynchronous task processing
- **Usage**:
  - Background job processing
  - ML model inference tasks
  - Data processing pipelines
  - Scheduled tasks

## Data Flow

### 1. Heat Data Collection
```
Satellite APIs → AI Services → Processing → PostgreSQL → Backend API → Frontend
```

### 2. User Request Flow
```
Frontend → Backend API → Redis (cache) → PostgreSQL → Backend API → Frontend
```

### 3. ML Inference Flow
```
Frontend → Backend API → Celery Task → AI Services → Model Inference → Results → Backend API → Frontend
```

## Security Architecture

### Authentication
- JWT-based authentication
- OAuth2 password flow
- Token refresh mechanism
- Role-based access control

### Security Layers
1. **Application Layer**: Rate limiting, input validation
2. **API Layer**: CORS restrictions, security headers
3. **Data Layer**: Encrypted secrets, SQL injection protection
4. **Infrastructure Layer**: Network policies, TLS encryption

## Deployment Architecture

### Container Strategy
- Each service containerized with Docker
- Multi-stage builds for optimization
- Image versioning and tagging
- Security scanning in CI/CD

### Orchestration
- Kubernetes for container orchestration
- Horizontal Pod Autoscaling
- ConfigMaps for configuration
- Secrets for sensitive data
- Ingress for external access

### Monitoring & Observability
- Prometheus metrics collection
- Grafana dashboards
- Structured logging (JSON format)
- Distributed tracing (optional)

## Scalability Considerations

### Horizontal Scaling
- Stateless application design
- Load balancer support
- Database read replicas (future)
- CDN for static assets

### Vertical Scaling
- Resource limits configured
- HPA based on CPU/memory
- GPU support for ML models (future)

## Technology Rationale

### Frontend Stack
- **Next.js 15**: Latest App Router, server components, optimized performance
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS for rapid development
- **Leaflet**: Lightweight mapping library

### Backend Stack
- **FastAPI**: High performance, automatic API documentation
- **SQLAlchemy**: Mature ORM with PostGIS support
- **Redis**: Fast in-memory caching
- **Celery**: Robust task queue

### AI/ML Stack
- **TensorFlow/PyTorch**: Industry-standard ML frameworks
- **XGBoost**: Gradient boosting for tabular data
- **SHAP**: Model explainability
- **GeoPandas**: Geospatial data processing

## Future Enhancements

### Planned Features
- Real-time WebSocket connections
- GraphQL API support
- Advanced caching strategies
- Model serving with TensorFlow Serving
- Event-driven architecture with Kafka

### Performance Optimizations
- Database query optimization
- Connection pooling (PgBouncer)
- CDN implementation
- Image optimization
- Lazy loading strategies

## Documentation References

- [API Documentation](../api/API_DOCUMENTATION.md)
- [Deployment Guide](../DEPLOYMENT_GUIDE.md)
- [Demo Workflow](../DEMO_WORKFLOW.md)
