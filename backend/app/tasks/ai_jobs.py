from app.core.celery_app import celery_app
from app.services.ai_risk_service import AIRiskService
from app.core.database import SessionLocal
from app.models.location import HeatData
import logging

logger = logging.getLogger(__name__)

@celery_app.task(name="app.tasks.ai_jobs.process_ai_prediction")
def process_ai_prediction(heat_data_id: int):
    """
    Background task to process expensive AI inference (Risk + SHAP).
    Updates the HeatData record once complete.
    """
    db = SessionLocal()
    try:
        # 1. Fetch the data record
        heat_data = db.query(HeatData).filter(HeatData.id == heat_data_id).first()
        if not heat_data:
            logger.error(f"HeatData {heat_data_id} not found for AI processing")
            return
        
        # 2. Prepare data for AI
        input_data = {
            "land_surface_temperature": heat_data.land_surface_temperature,
            "ndvi": heat_data.ndvi,
            "ndwi": heat_data.ndwi,
            "albedo": heat_data.albedo,
            "emissivity": heat_data.emissivity,
            "urban_density": heat_data.urban_density,
            "impervious_surface": heat_data.impervious_surface,
            "building_height_avg": heat_data.building_height_avg
        }
        
        # 3. Call AI Service (Now decoupled)
        ai_service = AIRiskService()
        results = ai_service.get_comprehensive_prediction(input_data)
        
        # 4. Update the record
        heat_data.heat_impact_score = results["risk_score"]
        heat_data.vulnerability_score = results["vulnerability_index"]
        heat_data.is_hotspot = results["risk_category"] in ["High", "Severe"]
        heat_data.predicted_lst = results["predicted_temperature"]
        heat_data.prediction_confidence = results["confidence_score"]
        
        # Store explainability in extra_data or dedicated column
        if not heat_data.extra_data:
            heat_data.extra_data = {}
        heat_data.extra_data["ai_analysis"] = results
        
        db.commit()
        logger.info(f"Successfully completed AI analysis for HeatData {heat_data_id}")
        
    except Exception as e:
        logger.error(f"Error in process_ai_prediction: {str(e)}")
        db.rollback()
    finally:
        db.close()
