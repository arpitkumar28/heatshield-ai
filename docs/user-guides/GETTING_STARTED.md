# HeatShield AI - Getting Started Guide

## Overview

This guide will help you get started with HeatShield AI, from installation to running your first heat map analysis.

## Prerequisites

### Required Software

- **Python**: 3.11 or higher
- **Node.js**: 18.x or higher
- **Docker**: 20.10 or higher
- **Docker Compose**: 2.0 or higher
- **PostgreSQL**: 15+ with PostGIS extension
- **Redis**: 7.x or higher
- **Git**: For cloning the repository

### Optional Software

- **kubectl**: For Kubernetes deployment
- **Helm**: For Helm chart deployment
- **Flutter SDK**: For mobile app development

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/heatshield-ai.git
cd heatshield-ai
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# Generate a secure secret key:
# openssl rand -hex 32
```

**Environment Variables**
```env
SECRET_KEY=your-generated-secret-key
DATABASE_URL=postgresql://user:password@localhost:5432/heatshield
REDIS_URL=redis://localhost:6379/0
BACKEND_CORS_ORIGINS=["http://localhost:3000"]
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local with your configuration
```

**Environment Variables**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. AI Services Setup

```bash
cd ai-services

# Create virtual environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 5. Database Setup

```bash
# Start PostgreSQL with PostGIS
docker run -d \
  --name heatshield-postgres \
  -e POSTGRES_DB=heatshield \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgis/postgis:15-3.3

# Run migrations
cd backend
alembic upgrade head
```

### 6. Redis Setup

```bash
# Start Redis
docker run -d \
  --name heatshield-redis \
  -p 6379:6379 \
  redis:7-alpine
```

## Running the Application

### Development Mode

#### Start Backend

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: http://localhost:8000
API documentation: http://localhost:8000/docs

#### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will be available at: http://localhost:3000

#### Start AI Services (Optional)

```bash
cd ai-services
source .venv/bin/activate
python main.py
```

### Using Docker Compose

```bash
# Start all services
docker-compose -f deployment/docker/docker-compose.yml up -d

# View logs
docker-compose -f deployment/docker/docker-compose.yml logs -f

# Stop services
docker-compose -f deployment/docker/docker-compose.yml down
```

## First Steps

### 1. Create a User Account

```bash
# Using the API
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "testuser",
    "password": "securepassword123"
  }'
```

### 2. Login and Get Token

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=securepassword123"
```

### 3. Access the Dashboard

Open your browser and navigate to: http://localhost:3000

### 4. View Heat Map

1. Navigate to the Heat Map page
2. Enter a location or click on the map
3. View the heat island analysis

### 5. Check Recommendations

1. Navigate to the Recommendations page
2. Select a location
3. View personalized recommendations

## Testing

### Run Backend Tests

```bash
cd backend
pytest --cov=app --cov-report=html
```

### Run Frontend Tests

```bash
cd frontend
npm test
```

### Run AI Services Tests

```bash
cd ai-services
pytest --cov=ai_services --cov-report=html
```

## Troubleshooting

### Common Issues

**Issue: Database connection failed**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env file
- Verify PostGIS extension is installed

**Issue: Redis connection failed**
- Ensure Redis is running
- Check REDIS_URL in .env file
- Verify Redis port (default: 6379)

**Issue: Frontend build fails**
- Clear node_modules: `rm -rf node_modules`
- Reinstall dependencies: `npm install`
- Check Node.js version (should be 18+)

**Issue: Backend import errors**
- Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`
- Check Python version (should be 3.11+)

### Getting Help

- Check the [Documentation](../README.md)
- Review [API Documentation](../api/API_DOCUMENTATION.md)
- Open an issue on GitHub
- Contact the development team

## Next Steps

- Read the [Deployment Guide](../DEPLOYMENT_GUIDE.md)
- Explore the [Demo Workflow](../DEMO_WORKFLOW.md)
- Review the [Architecture Documentation](../architecture/SYSTEM_ARCHITECTURE.md)
- Set up monitoring and logging
- Configure production environment

## Security Notes

- Never commit `.env` files to version control
- Use strong, unique passwords
- Enable HTTPS in production
- Regularly update dependencies
- Review security headers configuration
- Implement rate limiting in production

## Performance Tips

- Use Redis caching for frequently accessed data
- Optimize database queries with indexes
- Enable CDN for static assets
- Use connection pooling for database
- Monitor resource usage and scale accordingly

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostGIS Documentation](https://postgis.net/documentation/)
- [Redis Documentation](https://redis.io/docs/)
