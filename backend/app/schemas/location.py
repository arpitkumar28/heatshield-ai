from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class LocationBase(BaseModel):
    name: str
    latitude: float
    longitude: float
    location_type: str
    population: Optional[int] = None
    area_sqkm: Optional[float] = None
    metadata: Optional[dict] = None


class LocationCreate(LocationBase):
    pass


class LocationUpdate(BaseModel):
    name: Optional[str] = None
    population: Optional[int] = None
    area_sqkm: Optional[float] = None
    metadata: Optional[dict] = None


class Location(LocationBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class HeatDataBase(BaseModel):
    location_id: int
    timestamp: datetime
    land_surface_temperature: Optional[float] = None
    air_temperature: Optional[float] = None
    heat_index: Optional[float] = None
    ndvi: Optional[float] = None
    ndwi: Optional[float] = None
    albedo: Optional[float] = None
    emissivity: Optional[float] = None
    urban_density: Optional[float] = None
    impervious_surface: Optional[float] = None
    building_height_avg: Optional[float] = None


class HeatDataCreate(HeatDataBase):
    pass


class HeatData(HeatDataBase):
    id: int
    heat_impact_score: Optional[float] = None
    vulnerability_score: Optional[float] = None
    is_hotspot: bool
    predicted_lst: Optional[float] = None
    prediction_confidence: Optional[float] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class CoolingCenterBase(BaseModel):
    name: str
    latitude: float
    longitude: float
    address: Optional[str] = None
    capacity: Optional[int] = None
    current_occupancy: Optional[int] = None
    facilities: Optional[dict] = None
    operating_hours: Optional[str] = None
    contact_phone: Optional[str] = None


class CoolingCenterCreate(CoolingCenterBase):
    pass


class CoolingCenter(CoolingCenterBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
