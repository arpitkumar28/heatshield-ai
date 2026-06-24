import pytest
import pandas as pd
import numpy as np
from ai_services.models.heat_predictor import HeatPredictor
from ai_services.models.vulnerability_model import VulnerabilityModel, HeatRiskModel


def test_heat_predictor_initialization():
    """Test HeatPredictor initialization."""
    predictor = HeatPredictor(model_type='random_forest')
    assert predictor is not None
    assert predictor.model_type == 'random_forest'


def test_heat_predictor_training():
    """Test HeatPredictor training."""
    predictor = HeatPredictor(model_type='random_forest')
    
    sample_data = pd.DataFrame({
        'ndvi': np.random.uniform(0, 0.8, 100),
        'ndwi': np.random.uniform(-0.5, 0.5, 100),
        'albedo': np.random.uniform(0.1, 0.4, 100),
        'emissivity': np.random.uniform(0.9, 0.99, 100),
        'urban_density': np.random.uniform(0, 1, 100),
        'impervious_surface': np.random.uniform(0, 1, 100),
        'building_height_avg': np.random.uniform(5, 50, 100),
        'land_surface_temperature': np.random.uniform(25, 45, 100),
        'hour': np.random.randint(0, 24, 100),
        'month': np.random.randint(1, 12, 100)
    })
    
    metrics = predictor.train(sample_data)
    assert 'r2' in metrics
    assert 'rmse' in metrics
    assert metrics['r2'] >= 0
    assert metrics['rmse'] >= 0


def test_vulnerability_model_initialization():
    """Test VulnerabilityModel initialization."""
    model = VulnerabilityModel()
    assert model is not None


def test_vulnerability_score_calculation():
    """Test vulnerability score calculation."""
    model = VulnerabilityModel()
    
    vuln_data = pd.DataFrame({
        'land_surface_temperature': np.random.uniform(25, 45, 100),
        'heat_index': np.random.uniform(25, 50, 100),
        'population_density': np.random.uniform(100, 10000, 100),
        'elderly_population_ratio': np.random.uniform(0.05, 0.2, 100),
        'children_population_ratio': np.random.uniform(0.1, 0.3, 100),
        'ndvi': np.random.uniform(0, 0.8, 100),
        'cooling_center_access': np.random.uniform(0, 1, 100),
        'income_level': np.random.uniform(20000, 200000, 100),
        'impervious_surface': np.random.uniform(0, 1, 100),
        'building_density': np.random.uniform(0, 1, 100)
    })
    
    scores = model.calculate_vulnerability_score(vuln_data)
    assert len(scores) == 100
    assert scores.min() >= 0
    assert scores.max() <= 1


def test_heat_risk_model_initialization():
    """Test HeatRiskModel initialization."""
    model = HeatRiskModel()
    assert model is not None


def test_heat_risk_calculation():
    """Test heat risk calculation."""
    model = HeatRiskModel()
    
    risk_data = pd.DataFrame({
        'land_surface_temperature': np.random.uniform(25, 45, 100),
        'population': np.random.uniform(1000, 100000, 100),
        'ndvi': np.random.uniform(0, 0.8, 100),
        'impervious_surface': np.random.uniform(0, 1, 100),
        'building_density': np.random.uniform(0, 1, 100)
    })
    
    risk_results = model.calculate_heat_risk(risk_data)
    assert 'risk_score' in risk_results
    assert 'risk_class' in risk_results
    assert len(risk_results['risk_score']) == 100
