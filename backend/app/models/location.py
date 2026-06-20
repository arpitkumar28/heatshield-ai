from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from app.core.database import Base


class Location(Base):
    __tablename__ = "locations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    geometry = Column(Geometry('POINT', srid=4326))
    location_type = Column(String)  # city, district, region
    population = Column(Integer)
    area_sqkm = Column(Float)
    metadata = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    heat_data = relationship("HeatData", back_populates="location")


class HeatData(Base):
    __tablename__ = "heat_data"
    
    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    timestamp = Column(DateTime(timezone=True), nullable=False)
    
    # Temperature metrics
    land_surface_temperature = Column(Float)  # LST in Celsius
    air_temperature = Column(Float)  # Air temperature in Celsius
    heat_index = Column(Float)  # Heat index
    
    # Vegetation and surface metrics
    ndvi = Column(Float)  # Normalized Difference Vegetation Index
    ndwi = Column(Float)  # Normalized Difference Water Index
    albedo = Column(Float)  # Surface albedo
    emissivity = Column(Float)  # Surface emissivity
    
    # Urban metrics
    urban_density = Column(Float)
    impervious_surface = Column(Float)
    building_height_avg = Column(Float)
    
    # Heat impact metrics
    heat_impact_score = Column(Float)
    vulnerability_score = Column(Float)
    is_hotspot = Column(Boolean, default=False)
    
    # AI predictions
    predicted_lst = Column(Float)
    prediction_confidence = Column(Float)
    
    metadata = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    location = relationship("Location", back_populates="heat_data")


class CoolingCenter(Base):
    __tablename__ = "cooling_centers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    geometry = Column(Geometry('POINT', srid=4326))
    address = Column(String)
    capacity = Column(Integer)
    current_occupancy = Column(Integer)
    facilities = Column(JSON)  # AC, water, medical, etc.
    operating_hours = Column(String)
    contact_phone = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
