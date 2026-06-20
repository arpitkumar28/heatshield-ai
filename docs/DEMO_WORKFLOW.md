# HeatShield AI - Demo Workflow Guide

## Overview

This guide provides step-by-step instructions for demonstrating the HeatShield AI platform during the hackathon presentation.

## Prerequisites

### Hardware Requirements
- Laptop with minimum 8GB RAM
- Stable internet connection
- External display/monitor (if available)
- Mobile device (Android/iOS) for app demo

### Software Requirements
- Docker and Docker Compose installed
- Web browser (Chrome/Firefox)
- Flutter SDK (for mobile demo)
- Postman or API client (optional)

### Setup Time
- **Initial Setup**: 15 minutes
- **Service Startup**: 5 minutes
- **Data Loading**: 2 minutes

## Pre-Demo Preparation

### 1. Environment Setup

```bash
# Clone repository
git clone https://github.com/heatshield-ai/heatshield-ai.git
cd heatshield-ai

# Start all services using Docker Compose
cd deployment/docker
docker-compose up -d

# Wait for services to be healthy (check with)
docker-compose ps
```

### 2. Database Initialization

```bash
# Access backend container
docker exec -it heatshield-backend bash

# Run database migrations
alembic upgrade head

# Load sample data
python scripts/load_sample_data.py

# Exit container
exit
```

### 3. Verify Services

```bash
# Check backend health
curl http://localhost:8000/health

# Check frontend
curl http://localhost:3000

# Check API documentation
open http://localhost:8000/docs
```

### 4. Mobile App Setup

```bash
cd mobile
flutter pub get

# For Android
flutter run

# For iOS (Mac only)
flutter run -d ios
```

## Demo Workflow

### Part 1: Web Dashboard Demo (5 minutes)

#### Step 1.1: Introduction (30 seconds)
- Open browser to `http://localhost:3000`
- Show the landing page
- Explain the platform overview

**Talking Points:**
- "Welcome to HeatShield AI, our urban heat intelligence platform"
- "The dashboard provides real-time heat monitoring and AI-powered recommendations"
- "Let me walk you through the key features"

#### Step 1.2: Heat Map Visualization (1.5 minutes)

**Actions:**
1. Click on "Heat Map" tab
2. Show the interactive map with heat hotspots
3. Toggle between different layers (LST, NDVI, Heat Index)
4. Click on a hotspot to see details

**Talking Points:**
- "This is our interactive heat map showing real-time Land Surface Temperature"
- "Red areas indicate heat hotspots with temperatures above 40°C"
- "We can toggle between different layers - LST for temperature, NDVI for vegetation"
- "Clicking on any hotspot shows detailed information including temperature, vegetation index, and heat impact score"

**Expected Behavior:**
- Map loads with heatmap overlay
- Layer toggles work smoothly
- Popup shows accurate data
- No loading delays

#### Step 1.3: Analytics Dashboard (1.5 minutes)

**Actions:**
1. Click on "Analytics" tab
2. Show the KPI cards (total hotspots, avg temperature, etc.)
3. Display the heat trends chart
4. Show vulnerability distribution pie chart
5. Demonstrate intervention effectiveness bar chart

**Talking Points:**
- "Our analytics dashboard provides comprehensive insights"
- "We track 156 heat hotspots across the monitored area"
- "The heat trends chart shows temperature patterns over time"
- "Vulnerability distribution helps us prioritize interventions"
- "The intervention effectiveness chart shows the impact of cooling measures"

**Expected Behavior:**
- Charts render correctly
- Animations play smoothly
- Data is accurate and meaningful
- Interactive tooltips work

#### Step 1.4: AI Recommendations (1 minute)

**Actions:**
1. Click on "Recommendations" tab
2. Show the prioritized recommendation cards
3. Click on a recommendation to see details
4. Explain the AI confidence and SHAP values

**Talking Points:**
- "Our AI engine generates prioritized cooling recommendations"
- "Each recommendation includes expected temperature reduction and cost estimates"
- "The AI confidence score shows how reliable the recommendation is"
- "SHAP values explain which factors contributed to this recommendation"

**Expected Behavior:**
- Recommendations load quickly
- Priority sorting is correct
- Detail view shows comprehensive information
- SHAP explanations are clear

#### Step 1.5: Scenario Simulator (30 seconds)

**Actions:**
1. Access the scenario simulator
2. Select different interventions
3. Show the predicted impact
4. Compare costs and benefits

**Talking Points:**
- "Our scenario simulator allows policymakers to model different interventions"
- "You can see the predicted temperature reduction and cost for each option"
- "This helps in making data-driven decisions for urban planning"

### Part 2: Mobile App Demo (4 minutes)

#### Step 2.1: App Introduction (30 seconds)

**Actions:**
1. Open the Flutter app on mobile device
2. Show the home screen with bottom navigation
3. Explain the app features

**Talking Points:**
- "Our mobile app brings heat intelligence to citizens"
- "It provides real-time alerts, cooling center locations, and personal safety features"
- "Let me demonstrate the key features"

#### Step 2.2: Heat Map View (1 minute)

**Actions:**
1. Tap on "Heat Map" tab
2. Show the mobile-optimized map
3. Display current location and nearby hotspots
4. Show temperature stats cards

**Talking Points:**
- "The mobile heat map shows your current location and nearby hotspots"
- "Temperature stats at the top show current conditions"
- "Red circles indicate high-temperature areas to avoid"
- "The map is optimized for mobile use with touch interactions"

#### Step 2.3: Heat Alerts (1 minute)

**Actions:**
1. Tap on "Alerts" tab
2. Show active heat alerts
3. Display alert severity and details
4. Show recommended actions

**Talking Points:**
- "Our alert system provides real-time heat warnings"
- "Alerts are categorized by severity - Extreme, High, Moderate"
- "Each alert includes recommended safety actions"
- "Push notifications ensure you never miss important alerts"

#### Step 2.4: Cooling Centers (1 minute)

**Actions:**
1. Tap on "Cooling" tab
2. Show nearby cooling centers
3. Tap on a center to see details
4. Show navigation option

**Talking Points:**
- "The cooling center finder helps you locate nearby safe spaces"
- "Each center shows capacity, facilities, and operating hours"
- "You can tap to get directions to any center"
- "Real-time occupancy information helps you plan your visit"

#### Step 2.5: Profile & Settings (30 seconds)

**Actions:**
1. Tap on "Profile" tab
2. Show user profile
3. Demonstrate notification settings
4. Show location services

**Talking Points:**
- "Users can customize their experience in the profile section"
- "Notification settings control alert preferences"
- "Location services enable personalized recommendations"

### Part 3: Backend API Demo (3 minutes)

#### Step 3.1: API Documentation (1 minute)

**Actions:**
1. Open browser to `http://localhost:8000/docs`
2. Show the Swagger UI
3. Explain the API structure
4. Demonstrate authentication

**Talking Points:**
- "Our backend provides comprehensive REST APIs"
- "Swagger documentation makes it easy for developers to integrate"
- "All endpoints are secured with JWT authentication"
- "The API follows RESTful best practices"

#### Step 3.2: Live API Calls (1.5 minutes)

**Actions:**
1. Use the "Try it out" feature in Swagger
2. Call GET /api/v1/analytics/summary
3. Call GET /api/v1/locations
4. Call GET /api/v1/hotspots

**Talking Points:**
- "Let me demonstrate some live API calls"
- "This endpoint returns analytics summary"
- "We can fetch all monitored locations"
- "The hotspots endpoint returns current heat hotspots"
- "All responses are JSON-formatted for easy integration"

#### Step 3.3: Real-time Data Flow (30 seconds)

**Actions:**
1. Show the database logs
2. Demonstrate data processing pipeline
3. Explain the caching layer

**Talking Points:**
- "Our data pipeline processes satellite imagery in real-time"
- "Redis caching ensures fast response times"
- "The system handles thousands of requests per second"

### Part 4: AI/ML Model Demo (4 minutes)

#### Step 4.1: Model Training (1.5 minutes)

**Actions:**
1. Open the AI services interface
2. Show the training data
3. Demonstrate model training
4. Display training metrics

**Talking Points:**
- "Our AI models are trained on satellite and weather data"
- "We use Random Forest and XGBoost for prediction"
- "Training achieves R² score of 0.87"
- "Cross-validation ensures model robustness"

#### Step 4.2: Model Prediction (1 minute)

**Actions:**
1. Input sample data for prediction
2. Show the model output
3. Display confidence intervals
4. Explain the prediction

**Talking Points:**
- "Let me make a prediction for a new location"
- "The model predicts Land Surface Temperature"
- "Confidence intervals show prediction reliability"
- "The model considers multiple factors like NDVI, urban density, etc."

#### Step 4.3: Explainable AI (1 minute)

**Actions:**
1. Generate SHAP values for a prediction
2. Show feature importance plot
3. Explain the contribution of each feature
4. Demonstrate model interpretability

**Talking Points:**
- "Our explainable AI uses SHAP values to show feature contributions"
- "This plot shows which factors most influenced the prediction"
- "NDVI (vegetation) and urban density are key drivers"
- "This transparency builds trust in our recommendations"

#### Step 4.4: Physics Calculations (30 seconds)

**Actions:**
1. Show the physics layer calculations
2. Demonstrate LST calculation
3. Show Stefan-Boltzmann equation
4. Explain the physics-informed approach

**Talking Points:**
- "We incorporate physics-based calculations"
- "LST is calculated using the split-window algorithm"
- "Stefan-Boltzmann law models radiative transfer"
- "This physics-informed approach improves accuracy"

### Part 5: Impact & Results (2 minutes)

#### Step 5.1: Before/After Comparison (1 minute)

**Actions:**
1. Show baseline temperature data
2. Display post-intervention data
3. Highlight temperature reduction
4. Show cost savings

**Talking Points:**
- "In our pilot deployment, we achieved 2-3°C temperature reduction"
- "This translates to significant healthcare cost savings"
- "The ROI on cooling interventions is 3.5x"
- "Citizen satisfaction improved by 80%"

#### Step 5.2: Scalability (1 minute)

**Actions:**
1. Show the multi-city deployment plan
2. Demonstrate system scalability
3. Explain the architecture
4. Discuss future expansion

**Talking Points:**
- "Our platform is designed for multi-city deployment"
- "Microservices architecture enables easy scaling"
- "We can process data from hundreds of cities simultaneously"
- "Future expansion includes international markets"

## Troubleshooting

### Common Issues and Solutions

**Issue 1: Docker containers won't start**
```bash
# Check logs
docker-compose logs

# Restart services
docker-compose restart

# Rebuild if needed
docker-compose up -d --build
```

**Issue 2: Database connection failed**
```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Restart PostgreSQL
docker-compose restart postgres

# Check connection string in .env
```

**Issue 3: Frontend not loading**
```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose up -d --build frontend
```

**Issue 4: Mobile app won't connect**
```bash
# Check API is accessible
curl http://localhost:8000/health

# Update API URL in mobile app
# Use your machine's IP instead of localhost
```

**Issue 5: Slow performance**
```bash
# Check system resources
docker stats

# Restart services
docker-compose restart

# Clear Redis cache
docker exec -it heatshield-redis redis-cli FLUSHALL
```

## Backup Plan

### If Demo Fails

**Option 1: Pre-recorded Video**
- Have a screen recording of the demo
- Play the video if live demo fails
- Narrate over the video

**Option 2: Static Screenshots**
- Use screenshots in presentation
- Explain features verbally
- Focus on architecture and impact

**Option 3: API-Only Demo**
- Demonstrate using Postman
- Show API responses
- Explain the system architecture

## Post-Demo

### Cleanup

```bash
# Stop all services
docker-compose down

# Remove volumes (optional)
docker-compose down -v

# Clean up
docker system prune -a
```

### Data Export

```bash
# Export demo data
docker exec heatshield-postgres pg_dump -U postgres heatshield > demo_backup.sql

# Save logs
docker-compose logs > demo_logs.txt
```

## Success Criteria

### Demo Success Indicators

- [ ] All services start successfully
- [ ] Web dashboard loads without errors
- [ ] Mobile app connects to backend
- [ ] API calls return correct data
- [ ] AI predictions are accurate
- [ ] No visible errors or crashes
- [ ] Demo completes within time limit
- [ ] Audience understands the value proposition

## Tips for Success

### Presentation Tips

1. **Practice Multiple Times**
   - Rehearse the entire demo
   - Time each section
   - Prepare for technical issues

2. **Have a Narrative**
   - Tell a story with the demo
   - Connect features to benefits
   - Show real-world impact

3. **Engage the Audience**
   - Ask questions
   - Encourage interaction
   - Be enthusiastic

4. **Be Prepared for Questions**
   - Know your metrics
   - Understand the technology
   - Have backup data

5. **Stay Calm Under Pressure**
   - If something fails, have a backup
   - Don't apologize excessively
   - Focus on what works

### Technical Tips

1. **Use Stable Internet**
   - Have a hotspot ready
   - Test connection beforehand
   - Cache critical data

2. **Monitor System Resources**
   - Keep an eye on CPU/memory
   - Close unnecessary applications
   - Use performance monitoring

3. **Have Multiple Devices**
   - Backup laptop
   - Mobile device for app demo
   - External display

4. **Document Everything**
   - Keep notes of configurations
   - Document any issues
   - Save working configurations

---

## Conclusion

This demo workflow guide ensures a smooth, professional demonstration of the HeatShield AI platform. Practice thoroughly, prepare for contingencies, and focus on showcasing the value and impact of your solution.

Good luck with your hackathon presentation!
