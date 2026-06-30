from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Dict, Any
from datetime import datetime, timedelta
from app.core.database import get_db
from app.models.location import HeatData, Location
from app.models.recommendation import Recommendation
from app.core.redis import get_cache, set_cache
import json

router = APIRouter()


@router.get("/heatmap")
def get_heatmap(city: str = Query("Jaipur"), db: Session = Depends(get_db)):
    """Get heatmap data for a specific city with Redis caching"""
    cache_key = f"heatmap:{city.lower()}"
    cached_data = get_cache(cache_key)
    if cached_data:
        return cached_data

    location = db.query(Location).filter(Location.name == city).first()
    
    if not location:
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
        .limit(100)\
        .all()
    
    avg_temp = 0
    if heat_data_list:
        avg_temp = sum(hd.land_surface_temperature for hd in heat_data_list) / len(heat_data_list)
    
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
    
    response_data = {
        "city": location.name,
        "average_temperature": round(avg_temp, 1),
        "hotspots": hotspots
    }
    
    # Cache for 5 minutes as heat data is dynamic but doesn't change every second
    set_cache(cache_key, response_data, expire=300)
    
    return response_data


@router.get("/summary")
def get_analytics_summary(db: Session = Depends(get_db)):
    """Get overall platform analytics summary with caching"""
    cache_key = "analytics:summary"
    cached_data = get_cache(cache_key)
    if cached_data:
        return cached_data

    total_locations = db.query(Location).count()
    total_hotspots = db.query(HeatData).filter(HeatData.is_hotspot == True).count()
    
    avg_lst = db.query(func.avg(HeatData.land_surface_temperature)).scalar() or 0
    avg_heat_index = db.query(func.avg(HeatData.heat_index)).scalar() or 0
    avg_ndvi = db.query(func.avg(HeatData.ndvi)).scalar() or 0
    
    if avg_lst > 42:
        risk_level = "High"
    elif avg_lst > 35:
        risk_level = "Medium"
    else:
        risk_level = "Low"
    
    response_data = {
        "average_temperature": round(avg_lst, 2),
        "hotspot_count": total_hotspots,
        "heat_index": round(avg_heat_index, 2),
        "ndvi_score": round(avg_ndvi, 4),
        "risk_level": risk_level,
        "total_monitored_locations": total_locations
    }
    
    set_cache(cache_key, response_data, expire=600)
    return response_data


@router.get("/heat-trends")
def get_heat_trends(
    location_id: int = Query(...),
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db)
):
    start_date = datetime.utcnow() - timedelta(days=days)
    
    trends = db.query(HeatData)\
        .filter(HeatData.location_id == location_id)\
        .filter(HeatData.timestamp >= start_date)\
        .order_by(HeatData.timestamp)\
        .all()
    
    return {
        "location_id": location_id,
        "period_days": days,
        "data_points": len(trends),
        "trends": [
            {
                "timestamp": t.timestamp.isoformat(),
                "lst": t.land_surface_temperature,
                "heat_index": t.heat_index,
                "ndvi": t.ndvi,
                "heat_impact_score": t.heat_impact_score
            }
            for t in trends
        ]
    }


@router.get("/location-comparison")
def compare_locations(location_ids: str = Query(...), db: Session = Depends(get_db)):
    """Compare multiple locations by id (simple aggregate)."""
    ids = [int(i) for i in location_ids.split(",") if i.strip().isdigit()]
    results = []
    for lid in ids:
        latest = db.query(HeatData).filter(HeatData.location_id == lid).order_by(HeatData.timestamp.desc()).limit(1).first()
        loc = db.query(Location).filter(Location.id == lid).first()
        if latest and loc:
            results.append({
                "location_id": lid,
                "name": loc.name,
                "latest_lst": latest.land_surface_temperature,
                "latest_heat_index": latest.heat_index,
            })

    return {"comparison": results}


@router.get("/vulnerability-map")
def get_vulnerability_map(db: Session = Depends(get_db)):
    """Return vulnerability scores for monitored locations."""
    results = []
    locations = db.query(Location).all()
    for loc in locations:
        latest = db.query(HeatData).filter(HeatData.location_id == loc.id).order_by(HeatData.timestamp.desc()).limit(1).first()
        if latest:
            results.append({
                "location_id": loc.id,
                "name": loc.name,
                "vulnerability_score": latest.vulnerability_score,
            })

    return {"vulnerability_data": results}
