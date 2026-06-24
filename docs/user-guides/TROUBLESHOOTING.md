# HeatShield AI - Troubleshooting Guide

## Overview

This guide helps you diagnose and resolve common issues encountered while working with HeatShield AI.

## Installation Issues

### Python Dependencies

**Problem**: `pip install` fails with dependency conflicts

**Solution**:
```bash
# Create fresh virtual environment
python -m venv .venv
source .venv/bin/activate

# Upgrade pip first
pip install --upgrade pip

# Install with specific versions
pip install -r requirements.txt --no-cache-dir
```

**Problem**: GDAL installation fails

**Solution**:
```bash
# On Ubuntu/Debian
sudo apt-get install gdal-bin libgdal-dev

# On macOS
brew install gdal

# Then install
pip install GDAL==$(gdal-config --version)
```

### Node.js Dependencies

**Problem**: `npm install` fails with peer dependency errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Use legacy peer deps if needed
npm install --legacy-peer-deps
```

**Problem**: TypeScript compilation errors

**Solution**:
```bash
# Check TypeScript version
npm list typescript

# Reinstall TypeScript
npm install --save-dev typescript@latest

# Clear Next.js cache
rm -rf .next
npm run build
```

## Database Issues

### PostgreSQL Connection

**Problem**: "Connection refused" error

**Solution**:
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Start PostgreSQL
docker start heatshield-postgres

# Check logs
docker logs heatshield-postgres
```

**Problem**: PostGIS extension not found

**Solution**:
```bash
# Connect to PostgreSQL
docker exec -it heatshield-postgres psql -U postgres -d heatshield

# Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

# Verify
SELECT PostGIS_Version();
```

**Problem**: Migration fails

**Solution**:
```bash
# Reset database
docker exec -it heatshield-postgres psql -U postgres -d heatshield -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# Re-run migrations
cd backend
alembic upgrade head
```

### Redis Connection

**Problem**: Redis connection timeout

**Solution**:
```bash
# Check Redis status
docker ps | grep redis

# Start Redis
docker start heatshield-redis

# Test connection
docker exec -it heatshield-redis redis-cli ping
# Should return: PONG
```

## Backend Issues

### FastAPI Startup

**Problem**: "Address already in use" error

**Solution**:
```bash
# Find process using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>

# Or use different port
uvicorn app.main:app --port 8001
```

**Problem**: Import errors for modules

**Solution**:
```bash
# Ensure you're in the backend directory
cd backend

# Activate virtual environment
source .venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt

# Check PYTHONPATH
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
```

### API Errors

**Problem**: 401 Unauthorized errors

**Solution**:
```bash
# Verify token is valid
# Check token expiration
# Re-login to get new token

# Check SECRET_KEY in .env
# Ensure it matches between services
```

**Problem**: 429 Too Many Requests

**Solution**:
```bash
# Wait for rate limit to reset
# Check rate limit headers
# Implement exponential backoff in client

# For development, increase limits in code
# (Not recommended for production)
```

## Frontend Issues

### Build Errors

**Problem**: Next.js build fails

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Build again
npm run build
```

**Problem**: "Module not found" errors

**Solution**:
```bash
# Check file paths are correct
# Ensure case sensitivity matches

# For Windows, check line endings
git config core.autocrlf false
git rm --cached -r .
git reset --hard
```

### Runtime Errors

**Problem**: API calls fail in browser

**Solution**:
```bash
# Check CORS configuration in backend
# Verify NEXT_PUBLIC_API_URL in frontend

# Check browser console for errors
# Network tab for failed requests

# Test API directly with curl
curl http://localhost:8000/health
```

**Problem**: Map doesn't render

**Solution**:
```bash
# Check Leaflet CSS is imported
# Verify map container has height
# Check browser console for errors

# Ensure coordinates are valid
# Check network tab for tile loading
```

## AI Services Issues

### Model Loading

**Problem**: Model file not found

**Solution**:
```bash
# Check MODEL_PATH in .env
# Ensure model files exist in directory
ls -la ./models/

# Download pre-trained models if needed
# Or train models using provided scripts
```

**Problem**: Out of memory during inference

**Solution**:
```bash
# Reduce batch size in config
# Use smaller model variants
# Increase system memory
# Use GPU if available
```

### Performance Issues

**Problem**: Slow inference times

**Solution**:
```bash
# Use model quantization
# Implement caching
# Use batch processing
# Consider model optimization tools
```

## Docker Issues

### Container Startup

**Problem**: Container exits immediately

**Solution**:
```bash
# Check container logs
docker logs <container_name>

# Run in interactive mode to debug
docker run -it <image_name> /bin/bash

# Check health status
docker inspect <container_name>
```

**Problem**: Volume mount issues

**Solution**:
```bash
# Check volume permissions
# Verify mount paths in docker-compose.yml

# On Linux, check SELinux
# On Windows, check WSL2 settings
```

### Network Issues

**Problem**: Containers can't communicate

**Solution**:
```bash
# Check Docker network
docker network ls
docker network inspect <network_name>

# Ensure services are on same network
# Check service names in docker-compose.yml

# Test connectivity
docker exec <container1> ping <container2>
```

## Kubernetes Issues

### Pod Startup

**Problem**: Pod stuck in Pending state

**Solution**:
```bash
# Check pod status
kubectl describe pod <pod_name>

# Check resource requests
# Verify node has sufficient resources

# Check events
kubectl get events --sort-by=.metadata.creationTimestamp
```

**Problem**: Pod keeps restarting

**Solution**:
```bash
# Check pod logs
kubectl logs <pod_name>

# Check previous logs
kubectl logs <pod_name> --previous

# Describe pod for events
kubectl describe pod <pod_name>
```

### Service Issues

**Problem**: Service not accessible

**Solution**:
```bash
# Check service endpoints
kubectl get endpoints <service_name>

# Check service configuration
kubectl describe service <service_name>

# Test from within cluster
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- curl http://<service_name>
```

## Performance Issues

### Slow API Response

**Problem**: API responses are slow

**Solution**:
```bash
# Check database query performance
# Add indexes to slow queries
# Enable query logging

# Check Redis cache hit rate
# Implement caching for frequent queries

# Profile application
# Use Python profiler
# Check for N+1 queries
```

### High Memory Usage

**Problem**: Application consuming too much memory

**Solution**:
```bash
# Check memory usage
docker stats
# or
kubectl top pods

# Profile memory usage
# Check for memory leaks
# Implement connection pooling

# Adjust resource limits
# Optimize data structures
```

## Security Issues

### SSL/TLS Errors

**Problem**: Certificate errors in production

**Solution**:
```bash
# Verify certificate is valid
openssl x509 -in cert.pem -text -noout

# Check certificate chain
# Ensure proper domain names

# Use Let's Encrypt for free certificates
# Configure proper TLS settings
```

### Authentication Issues

**Problem**: JWT token validation fails

**Solution**:
```bash
# Verify SECRET_KEY matches
# Check token expiration
# Validate token structure

# Use jwt.io to debug tokens
# Check algorithm matches (HS256)
```

## Logging and Debugging

### Enable Debug Logging

**Backend**:
```python
# Set environment variable
export LOG_LEVEL=DEBUG

# Or in .env
LOG_LEVEL=DEBUG
```

**Frontend**:
```javascript
// Enable Next.js debug
NEXT_PUBLIC_DEBUG=true
```

### View Logs

**Docker**:
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

**Kubernetes**:
```bash
kubectl logs -f deployment/heatshield-backend
kubectl logs -f deployment/heatshield-frontend
```

### Structured Logs

Logs are in JSON format for easy parsing:
```bash
# Pretty print logs
kubectl logs <pod> | jq
```

## Getting Help

### Collect Diagnostic Information

```bash
# System information
uname -a
docker --version
kubectl version --client

# Application versions
python --version
node --version

# Resource usage
free -h
df -h
docker stats
```

### Create Bug Report

Include:
- Operating system and version
- Docker/Kubernetes versions
- Python/Node versions
- Error messages and stack traces
- Steps to reproduce
- Configuration files (with secrets removed)
- Logs

### Resources

- [GitHub Issues](https://github.com/your-org/heatshield-ai/issues)
- [Documentation](../README.md)
- [API Documentation](../api/API_DOCUMENTATION.md)
- [Architecture Docs](../architecture/SYSTEM_ARCHITECTURE.md)
