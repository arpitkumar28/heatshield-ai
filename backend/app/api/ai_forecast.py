from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
from app.core.database import get_db
from ai_services.models.forecast_engine import HeatForecastEngine

router = APIRouter()

# Initialize forecast engine
forecast_engine = HeatForecastEngine()


class ForecastRequest(BaseModel):
    location_id: str
    historical_data: List[dict]
    forecast_hours: Optional[int] = 168


class ForecastResponse(BaseModel):
    location_id: str
    forecast: List[dict]
    heatwave_risk: dict


@router.post("/generate", response_model=ForecastResponse)
async def generate_forecast(request: ForecastRequest):
    """
    Generate heat forecast for a location
    """
    try:
        # Convert historical data to DataFrame
        historical_df = pd.DataFrame(request.historical_data)
        
        # Train model for this location
        forecast_engine.train_site_model(request.location_id, historical_df)
        
        # Generate forecast
        forecast_df = forecast_engine.generate_forecast(
            request.location_id, 
            steps=request.forecast_hours
        )
        
        # Detect heatwave risk
        heatwave_risk = forecast_engine.detect_upcoming_heatwave(request.location_id)
        
        # Convert forecast to list of dicts
        forecast_list = forecast_df.to_dict('records')
        
        return ForecastResponse(
            location_id=request.location_id,
            forecast=forecast_list,
            heatwave_risk=heatwave_risk
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/heatwave-alert")
async def check_heatwave_risk(location_id: str, threshold: float = 40.0):
    """
    Check for upcoming heatwave conditions
    """
    try:
        if location_id not in forecast_engine.models:
            raise HTTPException(
                status_code=404, 
                detail=f"No model trained for location {location_id}"
            )
        
        heatwave_risk = forecast_engine.detect_upcoming_heatwave(location_id, threshold)
        
        return heatwave_risk
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/locations")
async def list_trained_locations():
    """
    List all locations with trained forecast models
    """
    try:
        locations = list(forecast_engine.models.keys())
        return {"trained_locations": locations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class BatchForecastRequest(BaseModel):
    forecasts: List[ForecastRequest]


@router.post("/batch-forecast")
async def batch_forecast(request: BatchForecastRequest):
    """
    Generate forecasts for multiple locations
    """
    try:
        results = []
        
        for forecast_req in request.forecasts:
            try:
                # Convert historical data to DataFrame
                historical_df = pd.DataFrame(forecast_req.historical_data)
                
                # Train model for this location
                forecast_engine.train_site_model(forecast_req.location_id, historical_df)
                
                # Generate forecast
                forecast_df = forecast_engine.generate_forecast(
                    forecast_req.location_id, 
                    steps=forecast_req.forecast_hours
                )
                
                # Detect heatwave risk
                heatwave_risk = forecast_engine.detect_upcoming_heatwave(forecast_req.location_id)
                
                results.append({
                    "location_id": forecast_req.location_id,
                    "status": "success",
                    "forecast_hours": forecast_req.forecast_hours,
                    "heatwave_risk": heatwave_risk,
                    "max_predicted_temp": float(forecast_df['predicted_temp'].max()),
                    "min_predicted_temp": float(forecast_df['predicted_temp'].min())
                })
            except Exception as e:
                results.append({
                    "location_id": forecast_req.location_id,
                    "status": "error",
                    "error": str(e)
                })
        
        return {"forecasts": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
