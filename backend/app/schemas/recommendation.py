from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class RecommendationBase(BaseModel):
    location_id: int
    title: str
    description: str
    category: str
    priority: str
    temperature_reduction: Optional[float] = None
    cost_estimate: Optional[float] = None
    implementation_time: Optional[str] = None
    benefit_cost_ratio: Optional[float] = None


class RecommendationCreate(RecommendationBase):
    pass


class Recommendation(RecommendationBase):
    id: int
    ai_confidence: Optional[float] = None
    shap_values: Optional[dict] = None
    status: str
    implementation_date: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class HeatAlertBase(BaseModel):
    location_id: int
    alert_type: str
    severity: str
    title: str
    message: str
    start_time: datetime
    end_time: datetime
    max_temperature: Optional[float] = None
    min_temperature: Optional[float] = None
    humidity: Optional[float] = None
    heat_index: Optional[float] = None
    affected_population: Optional[int] = None
    area_description: Optional[str] = None
    recommended_actions: Optional[dict] = None


class HeatAlertCreate(HeatAlertBase):
    pass


class HeatAlert(HeatAlertBase):
    id: int
    issued_at: datetime
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
