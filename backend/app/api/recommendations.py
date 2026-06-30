from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import pandas as pd
import numpy as np
from app.core.database import get_db
from app.core.security import get_current_user, get_current_admin
from app.schemas.recommendation import Recommendation as RecommendationSchema, RecommendationCreate, HeatAlert, HeatAlertCreate
from app.models.recommendation import Recommendation as RecommendationModel
from app.services.recommendation_service import RecommendationService
from app.models.user import User
from ai_services.models.vulnerability_model import HeatRiskModel

router = APIRouter()

# Initialize AI model for recommendations
heat_risk_model = HeatRiskModel()


@router.post("/ai-generate")
async def generate_ai_recommendations(
    location_data: dict,
    db: Session = Depends(get_db)
):
    """
    Generate AI-powered recommendations based on location vulnerability and risk assessment
    """
    try:
        # Create DataFrame from location data
        data = pd.DataFrame([location_data])
        
        # Calculate comprehensive risk
        risk_data = heat_risk_model.calculate_heat_risk(data)
        risk_score = risk_data['risk_score'].iloc[0]
        vulnerability_score = risk_data['vulnerability_score'].iloc[0]
        
        # Generate recommendations based on risk profile
        recommendations = []
        
        # High vulnerability recommendations
        if vulnerability_score > 0.7:
            recommendations.append({
                "title": "Emergency Cooling Centers",
                "category": "Infrastructure",
                "description": "Deploy immediate emergency cooling centers in high-risk areas",
                "priority": "critical",
                "impact_score": 0.95,
                "cost_estimate": "₹2.5 Cr",
                "timeline": "48 hours",
                "confidence": 0.92
            })
            recommendations.append({
                "title": "Heat Health Alert System",
                "category": "Public Health",
                "description": "Activate SMS-based heat health alerts for vulnerable populations",
                "priority": "critical",
                "impact_score": 0.88,
                "cost_estimate": "₹1.2 Cr",
                "timeline": "1 week",
                "confidence": 0.91
            })
        
        # High temperature recommendations
        if risk_data['hazard_score'].iloc[0] > 0.6:
            recommendations.append({
                "title": "Green Roof Initiative",
                "category": "Urban Planning",
                "description": "Implement green roof program for commercial buildings",
                "priority": "high",
                "impact_score": 0.85,
                "cost_estimate": "₹8 Cr",
                "timeline": "6 months",
                "confidence": 0.87
            })
            recommendations.append({
                "title": "Urban Tree Plantation",
                "category": "Vegetation",
                "description": "Plant native trees along major roads and public spaces",
                "priority": "high",
                "impact_score": 0.78,
                "cost_estimate": "₹80 L",
                "timeline": "12 months",
                "confidence": 0.85
            })
        
        # Adaptive capacity recommendations
        if vulnerability_score > 0.5:
            recommendations.append({
                "title": "Water Station Network",
                "category": "Infrastructure",
                "description": "Install public water stations with chilled water dispensers",
                "priority": "medium",
                "impact_score": 0.85,
                "cost_estimate": "₹45 L",
                "timeline": "4 months",
                "confidence": 0.83
            })
            recommendations.append({
                "title": "Reflective Surface Program",
                "category": "Infrastructure",
                "description": "Apply reflective coatings on rooftops and roads",
                "priority": "medium",
                "impact_score": 0.72,
                "cost_estimate": "₹1.2 Cr",
                "timeline": "8 months",
                "confidence": 0.80
            })
        
        # Default recommendations if no specific risks
        if not recommendations:
            recommendations = [
                {
                    "title": "Vegetation Enhancement",
                    "category": "Urban Planning",
                    "description": "Increase green cover through parks and gardens",
                    "priority": "low",
                    "impact_score": 0.65,
                    "cost_estimate": "₹50 L",
                    "timeline": "6 months",
                    "confidence": 0.75
                }
            ]
        
        return {
            "risk_assessment": {
                "risk_score": float(risk_score),
                "vulnerability_score": float(vulnerability_score),
                "hazard_score": float(risk_data['hazard_score'].iloc[0]),
                "risk_class": int(risk_data['risk_class'].iloc[0])
            },
            "recommendations": recommendations,
            "total_recommendations": len(recommendations)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
def get_all_recommendations(db: Session = Depends(get_db)):
    """Get all AI-generated cooling recommendations"""
    try:
        recommendations = db.query(RecommendationModel).all()
        
        # Format response to match requirements
        formatted_recommendations = []
        for rec in recommendations:
            # Convert cost from INR to Lakhs for display
            cost_in_lakhs = rec.cost_estimate / 1000000 if rec.cost_estimate else 0
            
            formatted_recommendations.append({
                "id": rec.id,
                "title": rec.title,
                "category": rec.category,
                "description": rec.description,
                "impact_score": rec.ai_confidence if hasattr(rec, 'ai_confidence') else 0.8,
                "cost_estimate": f"₹{cost_in_lakhs:.1f} Lakhs",
                "expected_temperature_reduction": f"{rec.temperature_reduction}°C" if rec.temperature_reduction else "1-2°C",
                "priority": rec.priority if hasattr(rec, 'priority') else "Medium"
            })
        
        # If no recommendations in database, return default recommendations
        if not formatted_recommendations:
            formatted_recommendations = [
                {
                    "id": 1,
                    "title": "Plant Urban Trees",
                    "category": "Vegetation",
                    "description": "Increase green cover by planting native tree species in urban areas",
                    "impact_score": 0.9,
                    "cost_estimate": "₹50.0 Lakhs",
                    "expected_temperature_reduction": "2.5°C",
                    "priority": "High"
                },
                {
                    "id": 2,
                    "title": "Cool Roof Coatings",
                    "category": "Infrastructure",
                    "description": "Apply reflective coatings to rooftops to reduce heat absorption",
                    "impact_score": 0.8,
                    "cost_estimate": "₹30.0 Lakhs",
                    "expected_temperature_reduction": "1.5°C",
                    "priority": "Medium"
                },
                {
                    "id": 3,
                    "title": "Reflective Pavements",
                    "category": "Infrastructure",
                    "description": "Install reflective pavement materials to reduce urban heat island effect",
                    "impact_score": 0.7,
                    "cost_estimate": "₹40.0 Lakhs",
                    "expected_temperature_reduction": "0.75°C",
                    "priority": "Medium"
                },
                {
                    "id": 4,
                    "title": "Water Bodies Restoration",
                    "category": "Infrastructure",
                    "description": "Restore and create urban water bodies for natural cooling",
                    "impact_score": 0.85,
                    "cost_estimate": "₹75.0 Lakhs",
                    "expected_temperature_reduction": "2.0°C",
                    "priority": "High"
                }
            ]
        
        return {"recommendations": formatted_recommendations}
    except Exception as e:
        return {"recommendations": [], "error": str(e)}


@router.post("/", response_model=RecommendationSchema)
def create_recommendation(rec: RecommendationCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    rec_service = RecommendationService(db)
    return rec_service.create_recommendation(rec)


@router.get("/locations/{location_id}/recommendations", response_model=List[RecommendationSchema])
def get_recommendations(location_id: int, db: Session = Depends(get_db)):
    rec_service = RecommendationService(db)
    return rec_service.get_recommendations_by_location(location_id)


@router.get("/category/{category}", response_model=List[RecommendationSchema])
def get_recommendations_by_category(category: str, db: Session = Depends(get_db)):
    rec_service = RecommendationService(db)
    return rec_service.get_recommendations_by_category(category)


@router.put("/{rec_id}/status")
def update_recommendation_status(rec_id: int, status: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    rec_service = RecommendationService(db)
    rec = rec_service.update_recommendation_status(rec_id, status)
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    return rec


@router.post("/heat-alerts", response_model=HeatAlert)
def create_heat_alert(alert: HeatAlertCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin)):
    rec_service = RecommendationService(db)
    return rec_service.create_heat_alert(alert)


@router.get("/heat-alerts", response_model=List[HeatAlert])
def get_active_alerts(location_id: Optional[int] = Query(None), db: Session = Depends(get_db)):
    rec_service = RecommendationService(db)
    return rec_service.get_active_alerts(location_id)


@router.put("/heat-alerts/{alert_id}/deactivate")
def deactivate_alert(alert_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin)):
    rec_service = RecommendationService(db)
    alert = rec_service.deactivate_alert(alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert
