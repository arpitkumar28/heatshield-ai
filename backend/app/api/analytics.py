from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Dict, Any
from datetime import datetime, timedelta
from app.core.database import get_db
from app.models.location import HeatData, Location
from app.models.recommendation import Recommendation

router = APIRouter()


@router.get("/heatmap")
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


@router.get("/analytics/heat-trends")
def get_heat_trends(
    location_id: int = Query(...),
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db)
):
    """Get heat trends for a location over specified days"""
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
                "timestamp": t.timestamp,
                "lst": t.land_surface_temperature,
                "heat_index": t.heat_index,
                "ndvi": t.ndvi,
                "heat_impact_score": t.heat_impact_score
            }
            for t in trends
        ]
    }


@router.get("/summary")
def get_analytics_summary(db: Session = Depends(get_db)):
    """Get overall platform analytics summary"""
    
    total_locations = db.query(Location).count()
    total_heat_data = db.query(HeatData).count()
    total_hotspots = db.query(HeatData).filter(HeatData.is_hotspot == True).count()
    total_recommendations = db.query(Recommendation).count()
    
    # Average metrics
    avg_lst = db.query(func.avg(HeatData.land_surface_temperature)).scalar() or 0
    avg_heat_index = db.query(func.avg(HeatData.heat_index)).scalar() or 0
    avg_ndvi = db.query(func.avg(HeatData.ndvi)).scalar() or 0
    
    # Calculate overall risk level based on average temperature
    if avg_lst > 42:
        risk_level = "High"
    elif avg_lst > 35:
        risk_level = "Medium"
    else:
        risk_level = "Low"
    
    return {
        "average_temperature": round(avg_lst, 2),
        "hotspot_count": total_hotspots,
        "heat_index": round(avg_heat_index, 2),
        "ndvi_score": round(avg_ndvi, 4),
        "risk_level": risk_level
    }


@router.get("/analytics/location-comparison")
def compare_locations(
    location_ids: List[int] = Query(...),
    db: Session = Depends(get_db)
):
    """Compare heat metrics across multiple locations"""
    
    comparison = []
    for loc_id in location_ids:
        location = db.query(Location).filter(Location.id == loc_id).first()
        if not location:
            continue
        
        heat_data = db.query(HeatData)\
            .filter(HeatData.location_id == loc_id)\
            .order_by(HeatData.timestamp.desc())\
            .first()
        
        comparison.append({
            "location_id": loc_id,
            "name": location.name,
            "latest_lst": heat_data.land_surface_temperature if heat_data else None,
            "latest_heat_index": heat_data.heat_index if heat_data else None,
            "latest_ndvi": heat_data.ndvi if heat_data else None,
            "heat_impact_score": heat_data.heat_impact_score if heat_data else None
        })
    
    return {"comparison": comparison}


@router.get("/analytics/vulnerability-map")
def get_vulnerability_map(db: Session = Depends(get_db)):
    """Get vulnerability scores for all locations"""
    
    locations = db.query(Location).all()
    vulnerability_data = []
    
    for location in locations:
        latest_data = db.query(HeatData)\
            .filter(HeatData.location_id == location.id)\
            .order_by(HeatData.timestamp.desc())\
            .first()
        
        if latest_data:
            vulnerability_data.append({
                "location_id": location.id,
                "name": location.name,
                "latitude": location.latitude,
                "longitude": location.longitude,
                "vulnerability_score": latest_data.vulnerability_score,
                "heat_impact_score": latest_data.heat_impact_score,
                "is_hotspot": latest_data.is_hotspot
            })
    
    return {"vulnerability_data": vulnerability_data}
