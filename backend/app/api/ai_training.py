from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import numpy as np
import joblib
import os
from datetime import datetime
from app.core.database import get_db
from ai_services.models.heat_predictor import HeatPredictor, EnsembleHeatPredictor
from ai_services.models.vulnerability_model import VulnerabilityModel

router = APIRouter()

# Model storage directory
MODEL_STORAGE_DIR = "/tmp/heatshield_models"
os.makedirs(MODEL_STORAGE_DIR, exist_ok=True)


class TrainingRequest(BaseModel):
    model_type: str = "random_forest"  # "random_forest" or "xgboost" or "ensemble"
    target_column: str = "land_surface_temperature"


class TrainingResponse(BaseModel):
    model_id: str
    model_type: str
    training_metrics: dict
    timestamp: str
    status: str


@router.post("/train-heat-model", response_model=TrainingResponse)
async def train_heat_model(
    request: TrainingRequest,
    training_data: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Train a heat prediction model with provided training data
    """
    try:
        # Read training data from uploaded file
        contents = await training_data.read()
        
        # Parse CSV data
        try:
            df = pd.read_csv(pd.io.common.BytesIO(contents))
        except:
            # Try JSON format
            import json
            df = pd.DataFrame(json.loads(contents.decode()))
        
        # Initialize predictor
        if request.model_type == "ensemble":
            predictor = EnsembleHeatPredictor()
            metrics = predictor.train(df, request.target_column)
            model_type = "ensemble"
        else:
            predictor = HeatPredictor(model_type=request.model_type)
            metrics = predictor.train(df, request.target_column)
            model_type = request.model_type
        
        # Save model
        model_id = f"heat_model_{model_type}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        model_path = os.path.join(MODEL_STORAGE_DIR, f"{model_id}.pkl")
        
        if request.model_type == "ensemble":
            predictor.save_models(MODEL_STORAGE_DIR)
            model_path = MODEL_STORAGE_DIR
        else:
            predictor.save_model(model_path)
        
        return TrainingResponse(
            model_id=model_id,
            model_type=model_type,
            training_metrics=metrics,
            timestamp=datetime.now().isoformat(),
            status="completed"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/train-vulnerability-model")
async def train_vulnerability_model(
    training_data: UploadFile = File(...),
    target_column: str = "vulnerability_class",
    db: Session = Depends(get_db)
):
    """
    Train a vulnerability assessment model
    """
    try:
        # Read training data
        contents = await training_data.read()
        
        try:
            df = pd.read_csv(pd.io.common.BytesIO(contents))
        except:
            import json
            df = pd.DataFrame(json.loads(contents.decode()))
        
        # Initialize and train model
        model = VulnerabilityModel()
        metrics = model.train(df, target_column)
        
        # Save model
        model_id = f"vulnerability_model_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        model_path = os.path.join(MODEL_STORAGE_DIR, f"{model_id}.pkl")
        model.save_model(model_path)
        
        return {
            "model_id": model_id,
            "training_metrics": metrics,
            "timestamp": datetime.now().isoformat(),
            "status": "completed"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/models")
async def list_trained_models():
    """
    List all trained models
    """
    try:
        models = []
        for filename in os.listdir(MODEL_STORAGE_DIR):
            if filename.endswith('.pkl'):
                model_path = os.path.join(MODEL_STORAGE_DIR, filename)
                stat = os.stat(model_path)
                models.append({
                    "model_id": filename.replace('.pkl', ''),
                    "file_size": stat.st_size,
                    "created": datetime.fromtimestamp(stat.st_ctime).isoformat(),
                    "modified": datetime.fromtimestamp(stat.st_mtime).isoformat()
                })
        
        return {"models": models}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/evaluate")
async def evaluate_model(
    model_id: str,
    evaluation_data: UploadFile = File(...),
    target_column: str = "land_surface_temperature"
):
    """
    Evaluate a trained model with test data
    """
    try:
        # Load model
        model_path = os.path.join(MODEL_STORAGE_DIR, f"{model_id}.pkl")
        
        if not os.path.exists(model_path):
            raise HTTPException(status_code=404, detail="Model not found")
        
        # Read evaluation data
        contents = await evaluation_data.read()
        
        try:
            df = pd.read_csv(pd.io.common.BytesIO(contents))
        except:
            import json
            df = pd.DataFrame(json.loads(contents.decode()))
        
        # Load predictor
        predictor = HeatPredictor()
        predictor.load_model(model_path)
        
        # Make predictions
        X = predictor.prepare_features(df)
        y_true = df[target_column]
        y_pred = predictor.model.predict(X)
        
        # Calculate metrics
        from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
        
        metrics = {
            "mse": float(mean_squared_error(y_true, y_pred)),
            "rmse": float(np.sqrt(mean_squared_error(y_true, y_pred))),
            "mae": float(mean_absolute_error(y_true, y_pred)),
            "r2": float(r2_score(y_true, y_pred)),
            "samples": len(df)
        }
        
        return {
            "model_id": model_id,
            "evaluation_metrics": metrics,
            "timestamp": datetime.now().isoformat()
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/models/{model_id}")
async def delete_model(model_id: str):
    """
    Delete a trained model
    """
    try:
        model_path = os.path.join(MODEL_STORAGE_DIR, f"{model_id}.pkl")
        
        if not os.path.exists(model_path):
            raise HTTPException(status_code=404, detail="Model not found")
        
        os.remove(model_path)
        
        return {
            "message": f"Model {model_id} deleted successfully",
            "timestamp": datetime.now().isoformat()
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/feature-importance/{model_id}")
async def get_model_feature_importance(model_id: str):
    """
    Get feature importance from a trained model
    """
    try:
        model_path = os.path.join(MODEL_STORAGE_DIR, f"{model_id}.pkl")
        
        if not os.path.exists(model_path):
            raise HTTPException(status_code=404, detail="Model not found")
        
        # Load predictor
        predictor = HeatPredictor()
        predictor.load_model(model_path)
        
        importance = predictor.get_feature_importance()
        
        return {
            "model_id": model_id,
            "feature_importance": importance
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
