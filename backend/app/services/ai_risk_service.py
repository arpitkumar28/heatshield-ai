"""
Simple AI Risk Scoring Service for HeatShield AI MVP
Implements basic heat risk classification logic
"""
from typing import Dict, Any


class AIRiskService:
    """Simple AI service for heat risk assessment"""
    
    @staticmethod
    def calculate_risk_level(temperature: float) -> str:
        """
        Calculate risk level based on temperature
        
        Args:
            temperature: Temperature in Celsius
            
        Returns:
            Risk level: "High", "Medium", or "Low"
        """
        if temperature > 42:
            return "High"
        elif temperature > 35:
            return "Medium"
        else:
            return "Low"
    
    @staticmethod
    def classify_hotspot(temperature: float, ndvi: float, urban_density: float = 0.5) -> bool:
        """
        Classify if a location is a hotspot
        
        Args:
            temperature: Temperature in Celsius
            ndvi: Normalized Difference Vegetation Index (0-1)
            urban_density: Urban density (0-1)
            
        Returns:
            True if hotspot, False otherwise
        """
        # Simple MVP logic: hotspot if temp > 40 and low vegetation
        temp_threshold = 40
        ndvi_threshold = 0.3
        
        if temperature > temp_threshold and ndvi < ndvi_threshold:
            return True
        
        # Also consider urban density
        if temperature > temp_threshold and urban_density > 0.7:
            return True
            
        return False
    
    @staticmethod
    def calculate_heat_impact_score(temperature: float, ndvi: float, 
                                   urban_density: float = 0.5) -> float:
        """
        Calculate heat impact score (0-1)
        
        Args:
            temperature: Temperature in Celsius
            ndvi: Normalized Difference Vegetation Index (0-1)
            urban_density: Urban density (0-1)
            
        Returns:
            Heat impact score between 0 and 1
        """
        # Normalize temperature (assuming range 25-50)
        temp_normalized = min(max((temperature - 25) / 25, 0), 1)
        
        # Vegetation factor (lower NDVI = higher impact)
        vegetation_factor = 1 - ndvi
        
        # Urban density factor
        urban_factor = urban_density
        
        # Combined score
        impact_score = (temp_normalized * 0.6 + 
                       vegetation_factor * 0.25 + 
                       urban_factor * 0.15)
        
        return round(impact_score, 3)
    
    @staticmethod
    def calculate_vulnerability_score(temperature: float, population_density: float,
                                     ndvi: float, cooling_center_access: float = 0.5) -> float:
        """
        Calculate vulnerability score (0-1)
        
        Args:
            temperature: Temperature in Celsius
            population_density: Population density (people per sq km)
            ndvi: Normalized Difference Vegetation Index (0-1)
            cooling_center_access: Access to cooling centers (0-1)
            
        Returns:
            Vulnerability score between 0 and 1
        """
        # Temperature exposure
        temp_exposure = min(max((temperature - 30) / 20, 0), 1)
        
        # Population density (normalize assuming range 100-10000)
        pop_normalized = min(max((population_density - 100) / 9900, 0), 1)
        
        # Vegetation (lower = higher vulnerability)
        vegetation_factor = 1 - ndvi
        
        # Cooling access (lower = higher vulnerability)
        cooling_factor = 1 - cooling_center_access
        
        # Combined vulnerability score
        vulnerability_score = (temp_exposure * 0.4 + 
                              pop_normalized * 0.3 + 
                              vegetation_factor * 0.2 + 
                              cooling_factor * 0.1)
        
        return round(vulnerability_score, 3)
    
    @staticmethod
    def generate_recommendation(temperature: float, ndvi: float, 
                              urban_density: float = 0.5) -> Dict[str, Any]:
        """
        Generate AI recommendation based on conditions
        
        Args:
            temperature: Temperature in Celsius
            ndvi: Normalized Difference Vegetation Index (0-1)
            urban_density: Urban density (0-1)
            
        Returns:
            Dictionary with recommendation details
        """
        risk_level = AIRiskService.calculate_risk_level(temperature)
        
        # Base recommendations based on conditions
        if ndvi < 0.3:
            return {
                "category": "Vegetation",
                "title": "Plant Urban Trees",
                "description": "Increase green cover by planting native tree species",
                "impact_score": 0.9,
                "expected_temperature_reduction": "2-3°C",
                "priority": "High"
            }
        elif urban_density > 0.7:
            return {
                "category": "Infrastructure",
                "title": "Cool Roof Coatings",
                "description": "Apply reflective coatings to rooftops to reduce heat absorption",
                "impact_score": 0.8,
                "expected_temperature_reduction": "1-2°C",
                "priority": "Medium"
            }
        elif temperature > 40:
            return {
                "category": "Infrastructure",
                "title": "Water Bodies Restoration",
                "description": "Restore and create urban water bodies for natural cooling",
                "impact_score": 0.85,
                "expected_temperature_reduction": "1.5-2.5°C",
                "priority": "High"
            }
        else:
            return {
                "category": "Infrastructure",
                "title": "Reflective Pavements",
                "description": "Install reflective pavement materials to reduce urban heat island effect",
                "impact_score": 0.7,
                "expected_temperature_reduction": "0.5-1°C",
                "priority": "Medium"
            }
