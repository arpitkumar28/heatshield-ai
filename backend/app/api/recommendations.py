from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.core.security import get_current_user, get_current_admin
from app.schemas.recommendation import Recommendation as RecommendationSchema, RecommendationCreate, HeatAlert, HeatAlertCreate
from app.models.recommendation import Recommendation as RecommendationModel
from app.services.recommendation_service import RecommendationService
from app.models.user import User

router = APIRouter()


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


@router.post("/recommendations", response_model=RecommendationSchema)
def create_recommendation(rec: RecommendationCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    rec_service = RecommendationService(db)
    return rec_service.create_recommendation(rec)


@router.get("/locations/{location_id}/recommendations", response_model=List[RecommendationSchema])
def get_recommendations(location_id: int, db: Session = Depends(get_db)):
    rec_service = RecommendationService(db)
    return rec_service.get_recommendations_by_location(location_id)


@router.get("/recommendations/category/{category}", response_model=List[RecommendationSchema])
def get_recommendations_by_category(category: str, db: Session = Depends(get_db)):
    rec_service = RecommendationService(db)
    return rec_service.get_recommendations_by_category(category)


@router.put("/recommendations/{rec_id}/status")
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
