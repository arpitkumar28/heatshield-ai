from sqlalchemy.orm import Session
from app.models.location import Location, HeatData, CoolingCenter
from app.schemas.location import HeatDataCreate, CoolingCenterCreate
from typing import Optional, List
from datetime import datetime
import numpy as np


class HeatService:
    def __init__(self, db: Session):
        self.db = db
    
    def create_location(self, location_data: dict) -> Location:
        location = Location(**location_data)
        self.db.add(location)
        self.db.commit()
        self.db.refresh(location)
        return location
    
    def get_location_by_id(self, location_id: int) -> Optional[Location]:
        return self.db.query(Location).filter(Location.id == location_id).first()
    
    def get_locations_by_type(self, location_type: str) -> List[Location]:
        return self.db.query(Location).filter(Location.location_type == location_type).all()
    
    def create_heat_data(self, heat_data: HeatDataCreate) -> HeatData:
        data = HeatData(**heat_data.model_dump())
        
        # Calculate heat impact score
        data.heat_impact_score = self._calculate_heat_impact_score(data)
        data.vulnerability_score = self._calculate_vulnerability_score(data)
        data.is_hotspot = data.heat_impact_score > 0.7
        
        self.db.add(data)
        self.db.commit()
        self.db.refresh(data)
        return data
    
    def get_heat_data_by_location(self, location_id: int, limit: int = 100) -> List[HeatData]:
        return self.db.query(HeatData)\
            .filter(HeatData.location_id == location_id)\
            .order_by(HeatData.timestamp.desc())\
            .limit(limit)\
            .all()
    
    def get_hotspots(self, threshold: float = 0.7) -> List[HeatData]:
        return self.db.query(HeatData)\
            .filter(HeatData.is_hotspot == True)\
            .filter(HeatData.heat_impact_score >= threshold)\
            .order_by(HeatData.timestamp.desc())\
            .all()
    
    def create_cooling_center(self, center_data: CoolingCenterCreate) -> CoolingCenter:
        center = CoolingCenter(**center_data.model_dump())
        self.db.add(center)
        self.db.commit()
        self.db.refresh(center)
        return center
    
    def get_nearby_cooling_centers(self, latitude: float, longitude: float, radius_km: float = 5.0) -> List[CoolingCenter]:
        # Simple distance calculation (in production, use PostGIS spatial queries)
        centers = self.db.query(CoolingCenter).filter(CoolingCenter.is_active == True).all()
        
        nearby_centers = []
        for center in centers:
            distance = self._haversine_distance(latitude, longitude, center.latitude, center.longitude)
            if distance <= radius_km:
                nearby_centers.append(center)
        
        return nearby_centers
    
    def _calculate_heat_impact_score(self, heat_data: HeatData) -> float:
        """Calculate heat impact score based on multiple factors"""
        score = 0.0
        
        # LST contribution (40%)
        if heat_data.land_surface_temperature:
            lst_score = min((heat_data.land_surface_temperature - 25) / 20, 1.0)
            score += lst_score * 0.4
        
        # Urban density contribution (20%)
        if heat_data.urban_density:
            score += heat_data.urban_density * 0.2
        
        # Impervious surface contribution (15%)
        if heat_data.impervious_surface:
            score += heat_data.impervious_surface * 0.15
        
        # NDVI inverse contribution (15% - less vegetation = higher impact)
        if heat_data.ndvi:
            ndvi_score = 1.0 - heat_data.ndvi
            score += ndvi_score * 0.15
        
        # Albedo inverse contribution (10% - lower albedo = higher impact)
        if heat_data.albedo:
            albedo_score = 1.0 - heat_data.albedo
            score += albedo_score * 0.1
        
        return min(score, 1.0)
    
    def _calculate_vulnerability_score(self, heat_data: HeatData) -> float:
        """Calculate vulnerability score considering population and infrastructure"""
        score = 0.5  # Base vulnerability
        
        if heat_data.urban_density:
            score += heat_data.urban_density * 0.3
        
        if heat_data.impervious_surface:
            score += heat_data.impervious_surface * 0.2
        
        return min(score, 1.0)
    
    def _haversine_distance(self, lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Calculate distance between two points in kilometers"""
        from math import radians, sin, cos, sqrt, asin
        
        R = 6371  # Earth's radius in kilometers
        
        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
        
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
        c = 2 * asin(sqrt(a))
        
        return R * c
