from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.core.deps import get_current_user
from app.schemas.recommendation import Recommendation, RecommendationCreate, HeatAlert, HeatAlertCreate
from app.services.recommendation_service import RecommendationService

router = APIRouter()


@router.post("/recommendations", response_model=Recommendation)
def create_recommendation(rec: RecommendationCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    rec_service = RecommendationService(db)
    return rec_service.create_recommendation(rec)


@router.get("/locations/{location_id}/recommendations", response_model=List[Recommendation])
def get_recommendations(location_id: int, db: Session = Depends(get_db)):
    rec_service = RecommendationService(db)
    return rec_service.get_recommendations_by_location(location_id)


@router.get("/recommendations/category/{category}", response_model=List[Recommendation])
def get_recommendations_by_category(category: str, db: Session = Depends(get_db)):
    rec_service = RecommendationService(db)
    return rec_service.get_recommendations_by_category(category)


@router.put("/recommendations/{rec_id}/status")
def update_recommendation_status(rec_id: int, status: str, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    rec_service = RecommendationService(db)
    rec = rec_service.update_recommendation_status(rec_id, status)
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    return rec


@router.post("/heat-alerts", response_model=HeatAlert)
def create_heat_alert(alert: HeatAlertCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_admin)):
    rec_service = RecommendationService(db)
    return rec_service.create_heat_alert(alert)


@router.get("/heat-alerts", response_model=List[HeatAlert])
def get_active_alerts(location_id: Optional[int] = Query(None), db: Session = Depends(get_db)):
    rec_service = RecommendationService(db)
    return rec_service.get_active_alerts(location_id)


@router.put("/heat-alerts/{alert_id}/deactivate")
def deactivate_alert(alert_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_admin)):
    rec_service = RecommendationService(db)
    alert = rec_service.deactivate_alert(alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert
