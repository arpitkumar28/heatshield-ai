"""
Production AI Risk Intelligence Service
Refactored to use a decoupled AI API instead of local imports (Production-grade Microservice architecture).
"""
import httpx
import logging
from typing import Dict, Any, List, Optional
from app.core.config import settings

logger = logging.getLogger(__name__)

class AIRiskService:
    """Enterprise AI service for urban heat intelligence"""
    
    def __init__(self):
        # In production, this would be an internal K8s service URL like http://ai-service:8001
        self.ai_api_url = "http://localhost:8001" 
        
    def get_comprehensive_prediction(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generates a production-grade prediction by calling the decoupled AI Microservice.
        """
        try:
            with httpx.Client(timeout=10.0) as client:
                response = client.post(f"{self.ai_api_url}/predict", json={"data": data})
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"AI Service Error: {str(e)}")
            # Fallback logic for high-availability
            return {
                "predicted_temperature": data.get("land_surface_temperature", 0.0),
                "confidence_score": 0.0,
                "risk_score": 0.0,
                "risk_category": "Service Unavailable",
                "hazard_index": 0.0,
                "vulnerability_index": 0.0,
                "exposure_index": 0.0,
                "explainability": {"top_features": {}, "base_value": 0.0}
            }

    @staticmethod
    def generate_evidence_based_recommendations(data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Generate recommendations derived directly from feature gaps.
        """
        recommendations = []
        ndvi = data.get('ndvi', 0.5)
        albedo = data.get('albedo', 0.2)
        urban_density = data.get('urban_density', 0.5)
        
        if ndvi < 0.3:
            recommendations.append({
                "category": "Nature-Based Solutions",
                "title": "Strategic Urban Forestation",
                "reasoning": f"Area NDVI ({ndvi}) is below ecological resilience threshold.",
                "priority": "Critical" if ndvi < 0.15 else "High",
                "impact_estimate": "High",
                "sdg_alignment": ["SDG 11", "SDG 13"]
            })
            
        if albedo < 0.15 and urban_density > 0.6:
            recommendations.append({
                "category": "Infrastructure",
                "title": "Cool Roof & Pavement Program",
                "reasoning": f"Low surface albedo ({albedo}) in high-density zone.",
                "priority": "High",
                "impact_estimate": "Moderate-High"
            })
            
        return recommendations
