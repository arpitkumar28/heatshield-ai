from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, ForeignKey, Text, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Recommendation(Base):
    __tablename__ = "recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    
    # Recommendation details
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String)  # vegetation, infrastructure, policy, emergency
    priority = Column(String)  # high, medium, low
    
    # Impact metrics
    temperature_reduction = Column(Float)  # Expected reduction in Celsius
    cost_estimate = Column(Float)  # In INR
    implementation_time = Column(String)  # e.g., "6 months"
    benefit_cost_ratio = Column(Float)
    
    # AI confidence
    ai_confidence = Column(Float)
    shap_values = Column(JSON)  # Explainable AI values
    
    # Status
    status = Column(String, default="proposed")  # proposed, approved, implemented, completed
    implementation_date = Column(DateTime(timezone=True))
    
    extra_data = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class HeatAlert(Base):
    __tablename__ = "heat_alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    
    # Alert details
    alert_type = Column(String)  # heatwave, extreme_heat, advisory
    severity = Column(String)  # extreme, severe, moderate
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    
    # Time
    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=False)
    issued_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Conditions
    max_temperature = Column(Float)
    min_temperature = Column(Float)
    humidity = Column(Float)
    heat_index = Column(Float)
    
    # Affected area
    affected_population = Column(Integer)
    area_description = Column(String)
    
    # Actions
    recommended_actions = Column(JSON)
    is_active = Column(Boolean, default=True)
    
    extra_data = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
