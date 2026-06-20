"""
Data Processing Utilities for Satellite and Weather Data
"""
import numpy as np
import pandas as pd
import rasterio
from rasterio.windows import Window
from rasterio.transform import from_bounds
import geopandas as gpd
from shapely.geometry import Point, box
from typing import Dict, List, Tuple, Optional
import requests
import os


class SatelliteDataProcessor:
    """
    Process satellite imagery data (Landsat, Sentinel-2)
    """
    
    def __init__(self):
        self.band_mapping = {
            'landsat8': {
                'blue': 2,
                'green': 3,
                'red': 4,
                'nir': 5,
                'swir1': 6,
                'swir2': 7,
                'thermal': 10,
                'thermal2': 11
            },
            'sentinel2': {
                'blue': 'B02',
                'green': 'B03',
                'red': 'B04',
                'nir': 'B08',
                'swir1': 'B11',
                'swir2': 'B12'
            }
        }
    
    def load_landsat_scene(self, scene_path: str) -> Dict[str, np.ndarray]:
        """
        Load Landsat scene bands
        
        Args:
            scene_path: Path to Landsat scene directory
        
        Returns:
            Dictionary of band arrays
        """
        bands = {}
        
        for band_name, band_num in self.band_mapping['landsat8'].items():
            band_file = os.path.join(scene_path, f'B{band_num}.tif')
            if os.path.exists(band_file):
                with rasterio.open(band_file) as src:
                    bands[band_name] = src.read(1)
        
        return bands
    
    def load_sentinel_scene(self, scene_path: str) -> Dict[str, np.ndarray]:
        """
        Load Sentinel-2 scene bands
        
        Args:
            scene_path: Path to Sentinel-2 scene directory
        
        Returns:
            Dictionary of band arrays
        """
        bands = {}
        
        for band_name, band_id in self.band_mapping['sentinel2'].items():
            band_file = os.path.join(scene_path, f'{band_id}.tif')
            if os.path.exists(band_file):
                with rasterio.open(band_file) as src:
                    bands[band_name] = src.read(1)
        
        return bands
    
    def extract_region(self, bands: Dict[str, np.ndarray], 
                      bounds: Tuple[float, float, float, float],
                      transform: rasterio.transform.Affine) -> Dict[str, np.ndarray]:
        """
        Extract data for a specific region
        
        Args:
            bands: Dictionary of band arrays
            bounds: (min_x, min_y, max_x, max_y) in projected coordinates
            transform: Affine transform from raster
        
        Returns:
            Dictionary of extracted band arrays
        """
        # Convert bounds to pixel coordinates
        window = from_bounds(*bounds, transform).window(transform)
        
        extracted = {}
        for band_name, band_data in bands.items():
            extracted[band_name] = band_data[window.row_off:window.row_off + window.height,
                                            window.col_off:window.col_off + window.width]
        
        return extracted
    
    def resample_bands(self, bands: Dict[str, np.ndarray], 
                      target_resolution: float) -> Dict[str, np.ndarray]:
        """
        Resample all bands to target resolution
        
        Args:
            bands: Dictionary of band arrays
            target_resolution: Target resolution in meters
        
        Returns:
            Dictionary of resampled band arrays
        """
        # Simplified resampling (in production, use GDAL/rasterio resampling)
        resampled = {}
        for band_name, band_data in bands.items():
            # Placeholder for actual resampling logic
            resampled[band_name] = band_data
        
        return resampled
    
    def calculate_brightness_temperature(self, thermal_band: np.ndarray, 
                                        k1: float, k2: float) -> np.ndarray:
        """
        Convert thermal band digital numbers to brightness temperature
        
        Args:
            thermal_band: Thermal band digital numbers
            k1: Calibration constant 1
            k2: Calibration constant 2
        
        Returns:
            Brightness temperature in Kelvin
        """
        # Convert to radiance
        radiance = k1 / (np.log(k2 / thermal_band + 1))
        
        # Convert to temperature
        temperature = k2 / (np.log(k1 / radiance + 1))
        
        return temperature


class WeatherDataProcessor:
    """
    Process weather data from IMD and other sources
    """
    
    def __init__(self):
        self.imd_api_url = "https://imd.gov.in/api"
    
    def fetch_imd_data(self, location: Tuple[float, float], 
                      start_date: str, end_date: str) -> pd.DataFrame:
        """
        Fetch weather data from IMD API
        
        Args:
            location: (latitude, longitude)
            start_date: Start date (YYYY-MM-DD)
            end_date: End date (YYYY-MM-DD)
        
        Returns:
            DataFrame with weather data
        """
        # Placeholder for actual API call
        # In production, implement actual API integration
        
        data = {
            'date': pd.date_range(start_date, end_date),
            'temperature': np.random.uniform(25, 40, size=30),
            'humidity': np.random.uniform(40, 90, size=30),
            'wind_speed': np.random.uniform(0, 15, size=30),
            'precipitation': np.random.uniform(0, 10, size=30)
        }
        
        return pd.DataFrame(data)
    
    def calculate_heat_index_series(self, temperature: np.ndarray, 
                                    humidity: np.ndarray) -> np.ndarray:
        """
        Calculate heat index for time series
        
        Args:
            temperature: Temperature in Fahrenheit
            humidity: Relative humidity in percentage
        
        Returns:
            Heat index values
        """
        heat_index = np.zeros_like(temperature)
        
        for i in range(len(temperature)):
            heat_index[i] = self._calculate_hi(temperature[i], humidity[i])
        
        return heat_index
    
    def _calculate_hi(self, temp_f: float, humidity: float) -> float:
        """Calculate single heat index value"""
        if temp_f < 80 or humidity < 40:
            return temp_f
        
        T = temp_f
        RH = humidity
        
        HI = (-42.379 + 2.04901523*T + 10.14333127*RH - 0.22475541*T*RH 
              - 0.00683783*T*T - 0.05481717*RH*RH + 0.00122874*T*T*RH 
              + 0.00085282*T*RH*RH - 0.00000199*T*T*RH*RH)
        
        if RH < 13 and 80 <= T <= 112:
            HI -= ((13-RH)/4) * np.sqrt((17-abs(T-95))/17)
        elif RH > 85 and 80 <= T <= 87:
            HI += ((RH-85)/10) * ((87-T)/5)
        
        return HI


class GeoDataProcessor:
    """
    Process geospatial data
    """
    
    @staticmethod
    def create_grid(bounds: Tuple[float, float, float, float],
                   resolution: float) -> gpd.GeoDataFrame:
        """
        Create a regular grid over a region
        
        Args:
            bounds: (min_x, min_y, max_x, max_y)
            resolution: Grid cell size in degrees
        
        Returns:
            GeoDataFrame with grid cells
        """
        min_x, min_y, max_x, max_y = bounds
        
        # Create grid
        x_coords = np.arange(min_x, max_x, resolution)
        y_coords = np.arange(min_y, max_y, resolution)
        
        geometries = []
        for i in range(len(x_coords) - 1):
            for j in range(len(y_coords) - 1):
                cell = box(x_coords[i], y_coords[j], 
                          x_coords[i+1], y_coords[j+1])
                geometries.append(cell)
        
        gdf = gpd.GeoDataFrame(geometry=geometries, crs='EPSG:4326')
        gdf['grid_id'] = range(len(gdf))
        
        return gdf
    
    @staticmethod
    def points_to_grid(points: gpd.GeoDataFrame, 
                      grid: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
        """
        Aggregate point data to grid cells
        
        Args:
            points: Point GeoDataFrame
            grid: Grid GeoDataFrame
        
        Returns:
            Grid with aggregated values
        """
        # Spatial join
        joined = gpd.sjoin(points, grid, how='inner', op='within')
        
        # Aggregate
        aggregated = joined.groupby('grid_id').agg({
            col: 'mean' for col in points.columns if col != 'geometry'
        })
        
        # Merge back to grid
        result = grid.merge(aggregated, left_on='grid_id', right_index=True, how='left')
        
        return result
    
    @staticmethod
    def calculate_distance_matrix(points1: np.ndarray, 
                                 points2: np.ndarray) -> np.ndarray:
        """
        Calculate distance matrix between two sets of points
        
        Args:
            points1: Array of (lat, lon) pairs
            points2: Array of (lat, lon) pairs
        
        Returns:
            Distance matrix in kilometers
        """
        from scipy.spatial.distance import cdist
        
        # Convert to radians
        points1_rad = np.radians(points1)
        points2_rad = np.radians(points2)
        
        # Haversine distance
        dist_matrix = cdist(points1_rad, points2_rad, metric='haversine')
        
        # Convert to kilometers
        dist_matrix *= 6371
        
        return dist_matrix


class DataIntegrator:
    """
    Integrate data from multiple sources
    """
    
    def __init__(self):
        self.satellite_processor = SatelliteDataProcessor()
        self.weather_processor = WeatherDataProcessor()
        self.geo_processor = GeoDataProcessor()
    
    def integrate_satellite_weather(self, satellite_data: pd.DataFrame,
                                   weather_data: pd.DataFrame,
                                   location_id: str) -> pd.DataFrame:
        """
        Integrate satellite and weather data
        
        Args:
            satellite_data: Satellite-derived features
            weather_data: Weather measurements
            location_id: Location identifier
        
        Returns:
            Integrated dataset
        """
        # Merge on date/time
        integrated = pd.merge(
            satellite_data,
            weather_data,
            on='date',
            how='outer'
        )
        
        integrated['location_id'] = location_id
        
        return integrated
    
    def create_training_dataset(self, locations: List[str],
                               start_date: str,
                               end_date: str) -> pd.DataFrame:
        """
        Create complete training dataset from all sources
        
        Args:
            locations: List of location IDs
            start_date: Start date
            end_date: End date
        
        Returns:
            Complete training dataset
        """
        all_data = []
        
        for location in locations:
            # Fetch satellite data
            satellite_data = self._fetch_satellite_data(location, start_date, end_date)
            
            # Fetch weather data
            weather_data = self.weather_processor.fetch_imd_data(
                (0, 0), start_date, end_date
            )
            
            # Integrate
            integrated = self.integrate_satellite_weather(
                satellite_data, weather_data, location
            )
            
            all_data.append(integrated)
        
        return pd.concat(all_data, ignore_index=True)
    
    def _fetch_satellite_data(self, location: str, 
                             start_date: str, end_date: str) -> pd.DataFrame:
        """Fetch satellite data (placeholder)"""
        # In production, implement actual satellite data fetching
        data = {
            'date': pd.date_range(start_date, end_date),
            'ndvi': np.random.uniform(0, 0.8, size=30),
            'ndwi': np.random.uniform(-0.5, 0.5, size=30),
            'albedo': np.random.uniform(0.1, 0.4, size=30),
            'emissivity': np.random.uniform(0.9, 0.99, size=30),
            'land_surface_temperature': np.random.uniform(25, 45, size=30)
        }
        
        return pd.DataFrame(data)
