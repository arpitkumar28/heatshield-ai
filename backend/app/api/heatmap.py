from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.models.location import HeatData, Location
from app.core.redis import cache_response

router = APIRouter()


@router.get("/")
@cache_response(key_prefix="heatmap", expire=300) # Cache for 5 minutes (Production Optimization)
async def get_heatmap(city: str = Query("Jaipur"), db: Session = Depends(get_db)):
    """
    Get heatmap data for a specific city.
    Optimized to use SQL aggregations instead of Python loops.
    Caches results in Redis to reduce DB load.
    """
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
    
    # Use SQL aggregation for average temperature (Performance Optimization)
    avg_temp_query = db.query(func.avg(HeatData.land_surface_temperature))\
        .filter(HeatData.location_id == location.id).scalar()
    
    avg_temp = avg_temp_query if avg_temp_query else 0
    
    # Get latest heat data for hotspots
    heat_data_list = db.query(HeatData)\
        .filter(HeatData.location_id == location.id)\
        .order_by(HeatData.timestamp.desc())\
        .limit(100)\
        .all()
    
    # Get hotspots
    hotspots = []
    for hd in heat_data_list:
        if hd.is_hotspot:
            risk_level = "High" if hd.land_surface_temperature > 42 else "Medium" if hd.land_surface_temperature > 35 else "Low"
            hotspots.append({
                "lat": location.latitude + (hash(str(hd.id)) % 100) / 10000, 
                "lng": location.longitude + (hash(str(hd.id)) % 100) / 10000,
                "temperature": hd.land_surface_temperature,
                "risk_level": risk_level
            })
    
    return {
        "city": location.name,
        "average_temperature": round(avg_temp, 1),
        "hotspots": hotspots
    }
