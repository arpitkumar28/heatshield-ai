from sqlalchemy.orm import Session
from app.models.recommendation import Recommendation, HeatAlert
from app.schemas.recommendation import RecommendationCreate, HeatAlertCreate
from typing import Optional, List
from datetime import datetime


class RecommendationService:
    def __init__(self, db: Session):
        self.db = db
    
    def create_recommendation(self, rec_data: RecommendationCreate) -> Recommendation:
        recommendation = Recommendation(**rec_data.model_dump())
        
        # Calculate AI confidence based on data quality
        recommendation.ai_confidence = self._calculate_confidence(rec_data)
        
        self.db.add(recommendation)
        self.db.commit()
        self.db.refresh(recommendation)
        return recommendation
    
    def get_recommendations_by_location(self, location_id: int) -> List[Recommendation]:
        return self.db.query(Recommendation)\
            .filter(Recommendation.location_id == location_id)\
            .order_by(Recommendation.priority.desc(), Recommendation.created_at.desc())\
            .all()
    
    def get_recommendations_by_category(self, category: str) -> List[Recommendation]:
        return self.db.query(Recommendation)\
            .filter(Recommendation.category == category)\
            .order_by(Recommendation.priority.desc())\
            .all()
    
    def update_recommendation_status(self, rec_id: int, status: str) -> Optional[Recommendation]:
        rec = self.db.query(Recommendation).filter(Recommendation.id == rec_id).first()
        if not rec:
            return None
        
        rec.status = status
        if status == "implemented":
            rec.implementation_date = datetime.utcnow()
        
        self.db.commit()
        self.db.refresh(rec)
        return rec
    
    def create_heat_alert(self, alert_data: HeatAlertCreate) -> HeatAlert:
        alert = HeatAlert(**alert_data.model_dump())
        self.db.add(alert)
        self.db.commit()
        self.db.refresh(alert)
        return alert
    
    def get_active_alerts(self, location_id: Optional[int] = None) -> List[HeatAlert]:
        query = self.db.query(HeatAlert).filter(HeatAlert.is_active == True)
        
        if location_id:
            query = query.filter(HeatAlert.location_id == location_id)
        
        return query.order_by(HeatAlert.issued_at.desc()).all()
    
    def deactivate_alert(self, alert_id: int) -> Optional[HeatAlert]:
        alert = self.db.query(HeatAlert).filter(HeatAlert.id == alert_id).first()
        if not alert:
            return None
        
        alert.is_active = False
        self.db.commit()
        self.db.refresh(alert)
        return alert
    
    def _calculate_confidence(self, rec_data: RecommendationCreate) -> float:
        """Calculate AI confidence based on data completeness"""
        confidence = 0.5  # Base confidence
        
        if rec_data.temperature_reduction:
            confidence += 0.2
        if rec_data.cost_estimate:
            confidence += 0.15
        if rec_data.benefit_cost_ratio:
            confidence += 0.15
        
        return min(confidence, 1.0)
