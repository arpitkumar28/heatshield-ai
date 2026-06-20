"""
AI Services Main Entry Point
"""
from ai_services.models.heat_predictor import HeatPredictor, EnsembleHeatPredictor
from ai_services.models.vulnerability_model import VulnerabilityModel, HeatRiskModel
from ai_services.processing.physics_layer import PhysicsLayer
from ai_services.utils.data_processor import DataIntegrator
import pandas as pd
import numpy as np


def main():
    """Main function to run AI services"""
    print("HeatShield AI Services")
    print("=" * 50)
    
    # Example usage
    print("\n1. Physics Layer Calculations")
    physics = PhysicsLayer()
    
    # Example NDVI calculation
    nir = np.random.uniform(0.2, 0.8, (100, 100))
    red = np.random.uniform(0.1, 0.4, (100, 100))
    ndvi = physics.calculate_ndvi(nir, red)
    print(f"NDVI range: {ndvi.min():.3f} to {ndvi.max():.3f}")
    
    # Example LST calculation
    band_10 = np.random.uniform(290, 320, (100, 100))
    band_11 = np.random.uniform(285, 315, (100, 100))
    lst = physics.calculate_lst(band_10, band_11)
    print(f"LST range: {lst.min():.1f}°C to {lst.max():.1f}°C")
    
    print("\n2. Heat Prediction Model")
    predictor = HeatPredictor(model_type='random_forest')
    
    # Create sample data
    sample_data = pd.DataFrame({
        'ndvi': np.random.uniform(0, 0.8, 1000),
        'ndwi': np.random.uniform(-0.5, 0.5, 1000),
        'albedo': np.random.uniform(0.1, 0.4, 1000),
        'emissivity': np.random.uniform(0.9, 0.99, 1000),
        'urban_density': np.random.uniform(0, 1, 1000),
        'impervious_surface': np.random.uniform(0, 1, 1000),
        'building_height_avg': np.random.uniform(5, 50, 1000),
        'land_surface_temperature': np.random.uniform(25, 45, 1000),
        'hour': np.random.randint(0, 24, 1000),
        'month': np.random.randint(1, 12, 1000)
    })
    
    metrics = predictor.train(sample_data)
    print(f"Training R²: {metrics['r2']:.3f}")
    print(f"Training RMSE: {metrics['rmse']:.3f}°C")
    
    print("\n3. Vulnerability Assessment")
    vulnerability_model = VulnerabilityModel()
    
    vuln_data = pd.DataFrame({
        'land_surface_temperature': np.random.uniform(25, 45, 1000),
        'heat_index': np.random.uniform(25, 50, 1000),
        'population_density': np.random.uniform(100, 10000, 1000),
        'elderly_population_ratio': np.random.uniform(0.05, 0.2, 1000),
        'children_population_ratio': np.random.uniform(0.1, 0.3, 1000),
        'ndvi': np.random.uniform(0, 0.8, 1000),
        'cooling_center_access': np.random.uniform(0, 1, 1000),
        'income_level': np.random.uniform(20000, 200000, 1000),
        'impervious_surface': np.random.uniform(0, 1, 1000),
        'building_density': np.random.uniform(0, 1, 1000)
    })
    
    scores = vulnerability_model.calculate_vulnerability_score(vuln_data)
    print(f"Vulnerability score range: {scores.min():.3f} to {scores.max():.3f}")
    
    print("\n4. Heat Risk Assessment")
    risk_model = HeatRiskModel()
    
    risk_data = pd.DataFrame({
        'land_surface_temperature': np.random.uniform(25, 45, 1000),
        'population': np.random.uniform(1000, 100000, 1000),
        'ndvi': np.random.uniform(0, 0.8, 1000),
        'impervious_surface': np.random.uniform(0, 1, 1000),
        'building_density': np.random.uniform(0, 1, 1000)
    })
    
    risk_results = risk_model.calculate_heat_risk(risk_data)
    print(f"Risk score range: {risk_results['risk_score'].min():.3f} to {risk_results['risk_score'].max():.3f}")
    print(f"High risk areas: {(risk_results['risk_class'] >= 3).sum()}")
    
    print("\nAI Services initialized successfully!")


if __name__ == "__main__":
    main()
