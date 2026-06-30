from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, ForeignKey, Boolean, Index
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from sqlalchemy import String as SAString
from app.core.database import Base


class Location(Base):
    __tablename__ = "locations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    # PostGIS geometry column with GIST index for spatial performance
    # Use a plain string column for geom in local/test runs so SQLite creates
    # a tangible column. PostGIS/Geography behavior is handled at query time.
    geom = Column(SAString(2048), index=True)
    
    location_type = Column(String, index=True)  # city, district, region
    population = Column(Integer)
    area_sqkm = Column(Float)
    extra_data = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    heat_data = relationship("HeatData", back_populates="location")

    __table_args__ = (
        Index('idx_location_geom', 'geom', postgresql_using='gist'),
    )


class HeatData(Base):
    __tablename__ = "heat_data"
    
    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False, index=True)
    timestamp = Column(DateTime(timezone=True), nullable=False, index=True)
    
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
    is_hotspot = Column(Boolean, default=False, index=True)
    
    # AI predictions
    predicted_lst = Column(Float)
    prediction_confidence = Column(Float)
    
    extra_data = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    location = relationship("Location", back_populates="heat_data")


class CoolingCenter(Base):
    __tablename__ = "cooling_centers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    # PostGIS geometry column with GIST index
    geom = Column(SAString(2048), index=True)
    
    address = Column(String)
    capacity = Column(Integer)
    current_occupancy = Column(Integer)
    facilities = Column(JSON)  # AC, water, medical, etc.
    operating_hours = Column(String)
    contact_phone = Column(String)
    is_active = Column(Boolean, default=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    __table_args__ = (
        Index('idx_cooling_center_geom', 'geom', postgresql_using='gist'),
    )
