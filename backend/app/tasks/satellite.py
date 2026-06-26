from app.core.celery_app import celery_app
from app.core.database import SessionLocal
from app.services.heat_service import HeatService
from app.schemas.location import HeatDataCreate
import logging
from datetime import datetime
import random

logger = logging.getLogger(__name__)

@celery_app.task(name="tasks.process_satellite_imagery")
def process_satellite_imagery(location_id: int):
    """
    Task to ingest and process satellite imagery (LANDSAT/Sentinel)
    for a given location to extract LST, NDVI, etc.
    """
    db = SessionLocal()
    try:
        heat_service = HeatService(db)
        location = heat_service.get_location_by_id(location_id)
        if not location:
            logger.error(f"Location {location_id} not found")
            return
        
        # In production, this would call external APIs (Bhuvan/USGS)
        # and process the raw TIFF files using rasterio/geopandas.
        # For now, we simulate the extraction of high-fidelity data.
        
        # Simulate processing delay
        import time
        time.sleep(2)
        
        # Extracted features (Simulated)
        processed_data = HeatDataCreate(
            location_id=location_id,
            timestamp=datetime.utcnow(),
            land_surface_temperature=32.5 + (random.random() * 10),
            air_temperature=30.0 + (random.random() * 5),
            heat_index=34.0 + (random.random() * 8),
            ndvi=0.2 + (random.random() * 0.5),
            albedo=0.1 + (random.random() * 0.2),
            urban_density=0.6 + (random.random() * 0.3),
            impervious_surface=0.7 + (random.random() * 0.2)
        )
        
        # This will trigger AI inference via HeatService.create_heat_data
        heat_data = heat_service.create_heat_data(processed_data)
        
        logger.info(f"Successfully processed satellite data for {location.name}. Hotspot: {heat_data.is_hotspot}")
        return {"status": "success", "location": location.name, "is_hotspot": heat_data.is_hotspot}
        
    except Exception as e:
        logger.error(f"Error processing satellite imagery: {str(e)}")
        return {"status": "error", "message": str(e)}
    finally:
        db.close()

@celery_app.task(name="tasks.daily_ingestion_sync")
def daily_ingestion_sync():
    """Scheduled task to trigger ingestion for all monitored cities"""
    db = SessionLocal()
    try:
        from app.models.location import Location
        locations = db.query(Location).filter(Location.location_type == "city").all()
        for loc in locations:
            process_satellite_imagery.delay(loc.id)
        return len(locations)
    finally:
        db.close()
