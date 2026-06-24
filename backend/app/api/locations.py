from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.core.deps import get_current_user
from app.schemas.location import Location as LocationSchema, LocationCreate, LocationUpdate, HeatData as HeatDataSchema, HeatDataCreate, CoolingCenter as CoolingCenterSchema, CoolingCenterCreate
from app.models.location import Location as LocationModel, HeatData as HeatDataModel, CoolingCenter as CoolingCenterModel
from app.services.heat_service import HeatService

router = APIRouter()


@router.post("/", response_model=LocationSchema)
def create_location(location: LocationCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    heat_service = HeatService(db)
    return heat_service.create_location(location.model_dump())


@router.get("/{location_id}", response_model=LocationSchema)
def get_location(location_id: int, db: Session = Depends(get_db)):
    heat_service = HeatService(db)
    location = heat_service.get_location_by_id(location_id)
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    return location


@router.get("/", response_model=List[LocationSchema])
def get_locations(location_type: Optional[str] = None, db: Session = Depends(get_db)):
    heat_service = HeatService(db)
    if location_type:
        return heat_service.get_locations_by_type(location_type)
    return heat_service.db.query(LocationModel).all()


@router.post("/heat-data", response_model=HeatDataSchema)
def create_heat_data(heat_data: HeatDataCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    heat_service = HeatService(db)
    return heat_service.create_heat_data(heat_data)


@router.get("/{location_id}/heat-data", response_model=List[HeatDataSchema])
def get_heat_data(location_id: int, limit: int = Query(100, ge=1, le=1000), db: Session = Depends(get_db)):
    heat_service = HeatService(db)
    return heat_service.get_heat_data_by_location(location_id, limit)


@router.get("/hotspots")
def get_hotspots(threshold: float = Query(0.7, ge=0, le=1), db: Session = Depends(get_db)):
    """Get all heat stress locations (hotspots)"""
    heat_service = HeatService(db)
    hotspots = heat_service.get_hotspots(threshold)
    
    # Format response to match requirements
    formatted_hotspots = []
    for hs in hotspots:
        location = db.query(LocationModel).filter(LocationModel.id == hs.location_id).first()
        if location:
            risk_level = "High" if hs.land_surface_temperature > 42 else "Medium" if hs.land_surface_temperature > 35 else "Low"
            formatted_hotspots.append({
                "id": hs.id,
                "location_id": hs.location_id,
                "city": location.name,
                "lat": location.latitude,
                "lng": location.longitude,
                "temperature": hs.land_surface_temperature,
                "heat_index": hs.heat_index,
                "ndvi": hs.ndvi,
                "risk_level": risk_level,
                "is_hotspot": hs.is_hotspot,
                "timestamp": hs.timestamp
            })
    
    return {"hotspots": formatted_hotspots}


@router.post("/cooling-centers", response_model=CoolingCenterSchema)
def create_cooling_center(center: CoolingCenterCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    heat_service = HeatService(db)
    return heat_service.create_cooling_center(center)


@router.get("/cooling-centers/nearby")
def get_nearby_cooling_centers(
    latitude: float = Query(..., ge=-90, le=90),
    longitude: float = Query(..., ge=-180, le=180),
    radius_km: float = Query(5.0, ge=0.1, le=50),
    db: Session = Depends(get_db)
):
    heat_service = HeatService(db)
    return heat_service.get_nearby_cooling_centers(latitude, longitude, radius_km)
