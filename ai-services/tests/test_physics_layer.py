import pytest
import numpy as np
from ai_services.processing.physics_layer import PhysicsLayer


@pytest.fixture
def physics_layer():
    """Create a PhysicsLayer instance for testing."""
    return PhysicsLayer()


def test_calculate_ndvi(physics_layer):
    """Test NDVI calculation."""
    nir = np.random.uniform(0.2, 0.8, (100, 100))
    red = np.random.uniform(0.1, 0.4, (100, 100))
    
    ndvi = physics_layer.calculate_ndvi(nir, red)
    
    assert ndvi.shape == (100, 100)
    assert ndvi.min() >= -1
    assert ndvi.max() <= 1


def test_calculate_lst(physics_layer):
    """Test Land Surface Temperature calculation."""
    band_10 = np.random.uniform(290, 320, (100, 100))
    band_11 = np.random.uniform(285, 315, (100, 100))
    
    lst = physics_layer.calculate_lst(band_10, band_11)
    
    assert lst.shape == (100, 100)
    assert lst.min() > 0
    assert lst.max() < 100


def test_calculate_albedo(physics_layer):
    """Test albedo calculation."""
    blue = np.random.uniform(0.1, 0.3, (100, 100))
    green = np.random.uniform(0.1, 0.4, (100, 100))
    red = np.random.uniform(0.1, 0.4, (100, 100))
    nir = np.random.uniform(0.2, 0.8, (100, 100))
    
    albedo = physics_layer.calculate_albedo(blue, green, red, nir)
    
    assert albedo.shape == (100, 100)
    assert albedo.min() >= 0
    assert albedo.max() <= 1
