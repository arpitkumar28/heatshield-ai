# HeatShield AI Deployment Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Docker Deployment](#docker-deployment)
4. [Kubernetes Deployment](#kubernetes-deployment)
5. [Cloud Deployment](#cloud-deployment)
6. [Monitoring and Logging](#monitoring-and-logging)
7. [Security Considerations](#security-considerations)

## Prerequisites

### Software Requirements
- Docker 24.0+
- Docker Compose 2.20+
- kubectl (for Kubernetes deployment)
- Helm 3.0+ (optional)
- PostgreSQL 15+ with PostGIS
- Redis 7+

### Hardware Requirements
- Minimum 4GB RAM
- 20GB disk space
- 2 CPU cores

## Local Development Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your configuration
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Mobile App

```bash
cd mobile
flutter pub get
flutter run
```

### AI Services

```bash
cd ai-services
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

## Docker Deployment

### Using Docker Compose

1. Create `docker-compose.yml` in the project root:

```yaml
version: '3.8'

services:
  postgres:
    image: postgis/postgis:15-3.3
    environment:
      POSTGRES_DB: heatshield
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/heatshield
      REDIS_URL: redis://redis:6379/0
    depends_on:
      - postgres
      - redis
    volumes:
      - ./backend:/app

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next

volumes:
  postgres_data:
  redis_data:
```

2. Start all services:

```bash
docker-compose up -d
```

3. View logs:

```bash
docker-compose logs -f
```

4. Stop services:

```bash
docker-compose down
```

### Individual Docker Builds

#### Backend

```bash
cd backend
docker build -t heatshield-backend .
docker run -p 8000:8000 --env-file .env heatshield-backend
```

#### Frontend

```bash
cd frontend
docker build -t heatshield-frontend .
docker run -p 3000:3000 heatshield-frontend
```

## Kubernetes Deployment

### Namespace Setup

```bash
kubectl create namespace heatshield
```

### ConfigMap

Create `k8s-configmap.yaml`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: heatshield-config
  namespace: heatshield
data:
  DATABASE_URL: "postgresql://postgres:postgres@postgres-service:5432/heatshield"
  REDIS_URL: "redis://redis-service:6379/0"
```

```bash
kubectl apply -f k8s-configmap.yaml
```

### Secrets

Create `k8s-secrets.yaml`:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: heatshield-secrets
  namespace: heatshield
type: Opaque
stringData:
  SECRET_KEY: "your-secret-key"
  BHUVAN_API_KEY: "your-bhuvan-api-key"
```

```bash
kubectl apply -f k8s-secrets.yaml
```

### PostgreSQL Deployment

Create `k8s-postgres.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
  namespace: heatshield
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgis/postgis:15-3.3
        env:
        - name: POSTGRES_DB
          value: heatshield
        - name: POSTGRES_USER
          value: postgres
        - name: POSTGRES_PASSWORD
          value: postgres
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: postgres-storage
        persistentVolumeClaim:
          claimName: postgres-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: postgres-service
  namespace: heatshield
spec:
  selector:
    app: postgres
  ports:
  - port: 5432
    targetPort: 5432
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
  namespace: heatshield
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

```bash
kubectl apply -f k8s-postgres.yaml
```

### Backend Deployment

Create `k8s-backend.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: heatshield
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: heatshield-backend:latest
        ports:
        - containerPort: 8000
        envFrom:
        - configMapRef:
            name: heatshield-config
        - secretRef:
            name: heatshield-secrets
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: heatshield
spec:
  selector:
    app: backend
  ports:
  - port: 8000
    targetPort: 8000
  type: LoadBalancer
```

```bash
kubectl apply -f k8s-backend.yaml
```

### Frontend Deployment

Create `k8s-frontend.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: heatshield
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: heatshield-frontend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NEXT_PUBLIC_API_URL
          value: "http://backend-service:8000/api/v1"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
  namespace: heatshield
spec:
  selector:
    app: frontend
  ports:
  - port: 3000
    targetPort: 3000
  type: LoadBalancer
```

```bash
kubectl apply -f k8s-frontend.yaml
```

## Cloud Deployment

### AWS Deployment

#### Using ECS

1. Build and push Docker images to ECR
2. Create ECS task definitions
3. Create ECS services
4. Configure Application Load Balancer
5. Set up RDS PostgreSQL with PostGIS
6. Configure ElastiCache Redis

#### Using EKS

Follow the Kubernetes deployment guide above using EKS cluster.

### Google Cloud Platform

#### Using Cloud Run

```bash
# Backend
gcloud run deploy heatshield-backend \
  --image gcr.io/PROJECT-ID/heatshield-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Frontend
gcloud run deploy heatshield-frontend \
  --image gcr.io/PROJECT-ID/heatshield-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Using GKE

Follow the Kubernetes deployment guide using GKE cluster.

### Azure Deployment

#### Using Azure Container Instances

```bash
# Create resource group
az group create --name heatshield-rg --location eastus

# Deploy backend
az container create \
  --resource-group heatshield-rg \
  --name heatshield-backend \
  --image heatshield-backend:latest \
  --dns-name-label heatshield-backend \
  --ports 8000

# Deploy frontend
az container create \
  --resource-group heatshield-rg \
  --name heatshield-frontend \
  --image heatshield-frontend:latest \
  --dns-name-label heatshield-frontend \
  --ports 3000
```

## Monitoring and Logging

### Prometheus + Grafana

Add to your Kubernetes deployment:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: prometheus
  namespace: heatshield
spec:
  selector:
    app: prometheus
  ports:
  - port: 9090
---
apiVersion: v1
kind: Service
metadata:
  name: grafana
  namespace: heatshield
spec:
  selector:
    app: grafana
  ports:
  - port: 3000
```

### Logging

Use ELK Stack or Cloud Logging:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluentd-config
  namespace: heatshield
data:
  fluent.conf: |
    <source>
      @type tail
      path /var/log/containers/*.log
      pos_file /var/log/fluentd-containers.log.pos
      tag kubernetes.*
      read_from_head true
      <parse>
        @type json
      </parse>
    </source>
```

## Security Considerations

### SSL/TLS Configuration

Use NGINX or Traefik as reverse proxy with SSL:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
  namespace: heatshield
data:
  nginx.conf: |
    server {
      listen 443 ssl;
      server_name heatshield.example.com;
      
      ssl_certificate /etc/nginx/ssl/tls.crt;
      ssl_certificate_key /etc/nginx/ssl/tls.key;
      
      location / {
        proxy_pass http://backend-service:8000;
      }
    }
```

### Firewall Rules

Configure security groups or network policies:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: heatshield-network-policy
  namespace: heatshield
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: heatshield
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: heatshield
```

### Secrets Management

Use Kubernetes Secrets or external secret managers:
- AWS Secrets Manager
- Google Secret Manager
- Azure Key Vault
- HashiCorp Vault

## Backup and Recovery

### Database Backup

```bash
# Backup
kubectl exec -n heatshield postgres-0 -- pg_dump -U postgres heatshield > backup.sql

# Restore
kubectl exec -i -n heatshield postgres-0 -- psql -U postgres heatshield < backup.sql
```

### Automated Backups

Set up cron jobs or cloud backup services:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: postgres-backup
  namespace: heatshield
spec:
  schedule: "0 2 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: postgres:15
            command:
            - /bin/bash
            - -c
            - pg_dump -U postgres -h postgres-service heatshield > /backup/backup-$(date +%Y%m%d).sql
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check PostgreSQL service is running
   - Verify connection string
   - Check network policies

2. **High Memory Usage**
   - Increase resource limits
   - Optimize database queries
   - Implement caching

3. **Slow API Response**
   - Check Redis caching
   - Optimize database indexes
   - Scale horizontally

### Health Checks

```bash
# Backend health
curl http://localhost:8000/health

# Frontend health
curl http://localhost:3000

# Database health
kubectl exec -n heatshield postgres-0 -- pg_isready
```

## Performance Optimization

### Database Optimization

```sql
-- Create indexes
CREATE INDEX idx_heat_data_location ON heat_data(location_id);
CREATE INDEX idx_heat_data_timestamp ON heat_data(timestamp);
CREATE INDEX idx_locations_geometry ON locations USING GIST(geometry);
```

### Caching Strategy

- Use Redis for session storage
- Cache API responses
- Implement CDN for static assets

### Load Balancing

Configure multiple replicas and use load balancer:
- AWS ALB
- Google Cloud Load Balancing
- Azure Load Balancer
