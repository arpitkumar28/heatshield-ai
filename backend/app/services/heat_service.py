from sqlalchemy.orm import Session
from sqlalchemy import func, cast
from app.models.location import Location, HeatData, CoolingCenter
from app.schemas.location import HeatDataCreate, CoolingCenterCreate
from typing import Optional, List, Dict, Any
from geoalchemy2.functions import ST_DWithin, ST_SetSRID, ST_Point
from geoalchemy2 import Geography, WKTElement
import math
from app.tasks.ai_jobs import process_ai_prediction

class HeatService:
    def __init__(self, db: Session):
        self.db = db
    
    def create_location(self, location_data: dict) -> Location:
        lat = location_data.get("latitude")
        lng = location_data.get("longitude")
        location_data["geom"] = WKTElement(f"POINT({lng} {lat})", srid=4326)
        
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
        """
        Creates heat data record and triggers ASYNCHRONOUS AI inference.
        Fixes the Critical Bottleneck: Synchronous SHAP/AI inference.
        """
        data_dict = heat_data.model_dump()
        data = HeatData(**data_dict)
        
        self.db.add(data)
        self.db.commit()
        self.db.refresh(data)
        
        # Trigger Background AI Analysis (Production-grade async pattern)
        process_ai_prediction.delay(data.id)
        
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
        data = center_data.model_dump()
        lat = data.get("latitude")
        lng = data.get("longitude")
        data["geom"] = WKTElement(f"POINT({lng} {lat})", srid=4326)
        
        center = CoolingCenter(**data)
        self.db.add(center)
        self.db.commit()
        self.db.refresh(center)
        return center
    
    def get_nearby_cooling_centers(self, latitude: float, longitude: float, radius_km: float = 5.0) -> List[CoolingCenter]:
        # If running against SQLite (tests/local dev), avoid PostGIS-only functions
        # and fall back to a simple bounding-box filter.
        engine = getattr(self.db.bind, 'dialect', None)
        if engine is not None and engine.name == 'sqlite':
            # Approximate degrees per km: latitude ~111 km per degree
            lat_delta = radius_km / 111.0
            # Longitude degrees depend on latitude
            lon_delta = radius_km / (111.320 * max(0.0001, math.cos(math.radians(latitude))))
            min_lat, max_lat = latitude - lat_delta, latitude + lat_delta
            min_lon, max_lon = longitude - lon_delta, longitude + lon_delta
            return self.db.query(CoolingCenter)\
                .filter(CoolingCenter.is_active == True)\
                .filter(CoolingCenter.latitude.between(min_lat, max_lat))\
                .filter(CoolingCenter.longitude.between(min_lon, max_lon))\
                .all()

        point = ST_SetSRID(ST_Point(longitude, latitude), 4326)
        radius_meters = radius_km * 1000

        return self.db.query(CoolingCenter)\
            .filter(CoolingCenter.is_active == True)\
            .filter(func.ST_DWithin(
                cast(CoolingCenter.geom, Geography),
                cast(point, Geography),
                radius_meters
            ))\
            .all()
