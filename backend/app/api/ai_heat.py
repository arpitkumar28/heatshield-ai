from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import numpy as np
from app.core.database import get_db
from ai_services.models.heat_predictor import HeatPredictor, EnsembleHeatPredictor

router = APIRouter()

# Initialize models
heat_predictor = HeatPredictor(model_type="random_forest")
ensemble_predictor = EnsembleHeatPredictor()


class HeatPredictionRequest(BaseModel):
    ndvi: float
    ndwi: Optional[float] = None
    albedo: Optional[float] = None
    emissivity: Optional[float] = None
    urban_density: Optional[float] = None
    impervious_surface: Optional[float] = None
    building_height_avg: Optional[float] = None
    hour: Optional[int] = 12
    month: Optional[int] = 6


class HeatPredictionResponse(BaseModel):
    predicted_temperature: float
    confidence: float
    is_hotspot: bool
    risk_level: str


@router.post("/predict", response_model=HeatPredictionResponse)
async def predict_heat(request: HeatPredictionRequest):
    """
    Predict land surface temperature for given location features
    """
    try:
        # Create DataFrame from request
        data = pd.DataFrame([{
            'ndvi': request.ndvi,
            'ndwi': request.ndwi,
            'albedo': request.albedo,
            'emissivity': request.emissivity,
            'urban_density': request.urban_density,
            'impervious_surface': request.impervious_surface,
            'building_height_avg': request.building_height_avg,
            'hour': request.hour,
            'month': request.month
        }])
        
        # Make prediction
        prediction = heat_predictor.predict(data)[0]
        confidence = 0.85  # Default confidence for now
        
        # Determine hotspot status
        is_hotspot = prediction > 40.0
        
        # Determine risk level
        if prediction < 35:
            risk_level = "low"
        elif prediction < 40:
            risk_level = "moderate"
        elif prediction < 45:
            risk_level = "high"
        else:
            risk_level = "extreme"
        
        return HeatPredictionResponse(
            predicted_temperature=round(prediction, 2),
            confidence=round(confidence, 2),
            is_hotspot=is_hotspot,
            risk_level=risk_level
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/batch-predict")
async def batch_predict_heat(requests: List[HeatPredictionRequest]):
    """
    Batch predict temperatures for multiple locations
    """
    try:
        data = pd.DataFrame([req.dict() for req in requests])
        predictions = heat_predictor.predict(data)
        
        results = []
        for i, pred in enumerate(predictions):
            is_hotspot = pred > 40.0
            risk_level = "extreme" if pred >= 45 else "high" if pred >= 40 else "moderate" if pred >= 35 else "low"
            
            results.append({
                "index": i,
                "predicted_temperature": round(pred, 2),
                "is_hotspot": is_hotspot,
                "risk_level": risk_level
            })
        
        return {"predictions": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/feature-importance")
async def get_feature_importance():
    """
    Get feature importance from the heat prediction model
    """
    try:
        importance = heat_predictor.get_feature_importance()
        return {"feature_importance": importance}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/hotspots")
async def detect_hotspots(requests: List[HeatPredictionRequest], threshold_percentile: float = 90):
    """
    Detect heat hotspots from batch predictions
    """
    try:
        data = pd.DataFrame([req.dict() for req in requests])
        hotspots = heat_predictor.detect_hotspots(data, threshold_percentile)
        
        return {
            "total_locations": len(hotspots),
            "hotspot_count": int(hotspots['is_hotspot'].sum()),
            "hotspots": hotspots[hotspots['is_hotspot']].to_dict('records')
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
