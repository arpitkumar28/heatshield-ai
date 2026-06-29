from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
from models.heat_predictor import HeatPredictor, EnsembleHeatPredictor
from models.vulnerability_model import HeatRiskModel
import pandas as pd
import uvicorn

app = FastAPI(title="HeatShield AI Services API")

# Initialize models
predictor = HeatPredictor(model_type="random_forest")
risk_model = HeatRiskModel()

class PredictionRequest(BaseModel):
    data: Dict[str, Any]

@app.post("/predict")
async def predict(request: PredictionRequest):
    try:
        df = pd.DataFrame([request.data])
        
        # Predict Temperature with Confidence
        pred_temp, confidence = predictor.predict_with_confidence(df)
        
        # Calculate Risk
        risk_results = risk_model.calculate_heat_risk(df)
        
        # Explainability (SHAP)
        explanation = predictor.explain_prediction(df)
        
        risk_score = float(risk_results['risk_score'].iloc[0])
        risk_class = int(risk_results['risk_class'].iloc[0])
        risk_labels = ["Very Low", "Low", "Moderate", "High", "Severe"]
        
        return {
            "predicted_temperature": round(float(pred_temp[0]), 2),
            "confidence_score": round(float(confidence[0]), 3),
            "risk_score": round(risk_score, 3),
            "risk_category": risk_labels[risk_class],
            "hazard_index": round(float(risk_results['hazard_score'].iloc[0]), 3),
            "vulnerability_index": round(float(risk_results['vulnerability_score'].iloc[0]), 3),
            "exposure_index": round(float(risk_results['exposure_score'].iloc[0]), 3),
            "explainability": {
                "top_features": explanation.get('shap_values', {}),
                "base_value": float(explanation.get('base_value', 0))
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"status": "healthy", "service": "ai-predictor"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
