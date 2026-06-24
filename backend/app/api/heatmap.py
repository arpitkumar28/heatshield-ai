from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.location import HeatData, Location

router = APIRouter()


@router.get("/")
def get_heatmap(city: str = Query("Jaipur"), db: Session = Depends(get_db)):
    """Get heatmap data for a specific city"""
    location = db.query(Location).filter(Location.name == city).first()
    
    if not location:
        # Return default Jaipur data if city not found
        location = db.query(Location).filter(Location.name == "Jaipur").first()
    
    if not location:
        return {
            "city": city,
            "average_temperature": 0,
            "hotspots": []
        }
    
    # Get latest heat data for this location
    heat_data_list = db.query(HeatData)\
        .filter(HeatData.location_id == location.id)\
        .order_by(HeatData.timestamp.desc())\
        .limit(50)\
        .all()
    
    # Calculate average temperature
    avg_temp = 0
    if heat_data_list:
        avg_temp = sum(hd.land_surface_temperature for hd in heat_data_list) / len(heat_data_list)
    
    # Get hotspots
    hotspots = []
    for hd in heat_data_list:
        if hd.is_hotspot:
            risk_level = "High" if hd.land_surface_temperature > 42 else "Medium" if hd.land_surface_temperature > 35 else "Low"
            hotspots.append({
                "lat": location.latitude + (hash(str(hd.id)) % 100) / 10000,  # Add slight variation
                "lng": location.longitude + (hash(str(hd.id)) % 100) / 10000,
                "temperature": hd.land_surface_temperature,
                "risk_level": risk_level
            })
    
    return {
        "city": location.name,
        "average_temperature": round(avg_temp, 1),
        "hotspots": hotspots
    }
