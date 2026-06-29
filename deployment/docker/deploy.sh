#!/bin/bash

# HeatShield AI Deployment Script
# Enterprise-grade deployment automation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-staging}
COMPOSE_FILE="docker-compose.${ENVIRONMENT}.yml"

echo -e "${GREEN}=== HeatShield AI Deployment Script ===${NC}"
echo -e "${YELLOW}Environment: ${ENVIRONMENT}${NC}"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}Error: .env file not found${NC}"
    echo "Please create .env file from .env.example"
    exit 1
fi

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

# Function to check Docker
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}Error: Docker is not installed${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Docker is installed${NC}"
}

# Function to check Docker Compose
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}Error: Docker Compose is not installed${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Docker Compose is installed${NC}"
}

# Function to create necessary directories
create_directories() {
    echo -e "${YELLOW}Creating necessary directories...${NC}"
    mkdir -p backups logs ssl models datasets
    echo -e "${GREEN}✓ Directories created${NC}"
}

# Function to pull latest images
pull_images() {
    echo -e "${YELLOW}Pulling latest images...${NC}"
    docker-compose -f $COMPOSE_FILE pull
    echo -e "${GREEN}✓ Images pulled${NC}"
}

# Function to build images
build_images() {
    echo -e "${YELLOW}Building Docker images...${NC}"
    docker-compose -f $COMPOSE_FILE build --no-cache
    echo -e "${GREEN}✓ Images built${NC}"
}

# Function to start services
start_services() {
    echo -e "${YELLOW}Starting services...${NC}"
    docker-compose -f $COMPOSE_FILE up -d
    echo -e "${GREEN}✓ Services started${NC}"
}

# Function to run database migrations
run_migrations() {
    echo -e "${YELLOW}Running database migrations...${NC}"
    docker-compose -f $COMPOSE_FILE exec backend alembic upgrade head
    echo -e "${GREEN}✓ Migrations completed${NC}"
}

# Function to check service health
check_health() {
    echo -e "${YELLOW}Checking service health...${NC}"
    sleep 10
    
    services=("postgres" "redis" "backend" "frontend")
    for service in "${services[@]}"; do
        if docker-compose -f $COMPOSE_FILE ps $service | grep -q "Up"; then
            echo -e "${GREEN}✓ $service is running${NC}"
        else
            echo -e "${RED}✗ $service is not running${NC}"
        fi
    done
}

# Function to backup database
backup_database() {
    echo -e "${YELLOW}Creating database backup...${NC}"
    timestamp=$(date +%Y%m%d_%H%M%S)
    docker-compose -f $COMPOSE_FILE exec postgres pg_dump -U postgres heatshield > backups/backup_${timestamp}.sql
    echo -e "${GREEN}✓ Database backup created${NC}"
}

# Main deployment flow
main() {
    check_docker
    check_docker_compose
    create_directories
    
    if [ "$ENVIRONMENT" = "production" ]; then
        backup_database
    fi
    
    pull_images
    build_images
    start_services
    
    if [ "$ENVIRONMENT" != "production" ]; then
        run_migrations
    fi
    
    check_health
    
    echo ""
    echo -e "${GREEN}=== Deployment completed successfully ===${NC}"
    echo -e "${YELLOW}Access the application at:${NC}"
    echo -e "  Frontend: http://localhost:3000"
    echo -e "  Backend: http://localhost:8000"
    echo -e "  Grafana: http://localhost:3001"
    echo -e "  Prometheus: http://localhost:9090"
}

# Run main function
main
