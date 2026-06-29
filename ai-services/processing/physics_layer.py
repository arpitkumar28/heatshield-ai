"""
Physics-Informed Layer for Urban Heat Analysis
Implements Stefan-Boltzmann thermal analysis and urban energy balance concepts
"""
import numpy as np
from typing import Dict, Tuple, Optional


class PhysicsLayer:
    """
    Physics-informed calculations for urban heat island analysis
    Based on Stefan-Boltzmann law and urban energy balance
    """
    
    STEFAN_BOLTZMANN_CONSTANT = 5.67e-8  # W/(m²·K⁴)
    
    @staticmethod
    def calculate_lst(band_10: np.ndarray, band_11: np.ndarray, 
                     emissivity: float = 0.95) -> np.ndarray:
        """
        Calculate Land Surface Temperature (LST) from thermal bands
        Using Landsat 8/9 TIRS bands (Band 10 and 11)
        
        Args:
            band_10: Thermal Infrared Band 10 (brightness temperature in Kelvin)
            band_11: Thermal Infrared Band 11 (brightness temperature in Kelvin)
            emissivity: Surface emissivity (default 0.95 for urban areas)
        
        Returns:
            LST in Celsius
        """
        # Apply atmospheric correction using split-window algorithm
        lst_kelvin = PhysicsLayer._split_window_algorithm(band_10, band_11, emissivity)
        lst_celsius = lst_kelvin - 273.15
        return lst_celsius
    
    @staticmethod
    def _split_window_algorithm(band_10: np.ndarray, band_11: np.ndarray, 
                               emissivity: float) -> np.ndarray:
        """
        Split-window algorithm for atmospheric correction
        Simplified version for Landsat TIRS data
        """
        # Coefficients for Landsat 8/9 (simplified)
        a0 = -2.5
        a1 = 1.0
        a2 = 0.5
        
        lst = a0 + a1 * band_10 + a2 * (band_10 - band_11)
        return lst
    
    @staticmethod
    def calculate_ndvi(nir: np.ndarray, red: np.ndarray) -> np.ndarray:
        """
        Calculate Normalized Difference Vegetation Index
        
        Args:
            nir: Near-infrared band
            red: Red band
        
        Returns:
            NDVI values (-1 to 1)
        """
        ndvi = (nir - red) / (nir + red + 1e-10)
        return ndvi
    
    @staticmethod
    def calculate_ndwi(green: np.ndarray, nir: np.ndarray) -> np.ndarray:
        """
        Calculate Normalized Difference Water Index
        
        Args:
            green: Green band
            nir: Near-infrared band
        
        Returns:
            NDWI values (-1 to 1)
        """
        ndwi = (green - nir) / (green + nir + 1e-10)
        return ndwi
    
    @staticmethod
    def calculate_albedo(*args, **kwargs) -> np.ndarray:
        """
        Calculate surface albedo from multiple bands
        Using Landsat 8/9 reflectance bands
        
        Args:
            bands: Dictionary of band arrays (blue, green, red, nir, swir1, swir2)
            or positional arrays: blue, green, red, nir
        
        Returns:
            Surface albedo (0 to 1)
        """
        if len(args) == 1 and isinstance(args[0], dict):
            bands = args[0]
        elif len(args) == 4:
            blue, green, red, nir = args
            bands = {
                'blue': blue,
                'green': green,
                'red': red,
                'nir': nir,
                'swir1': nir,
                'swir2': nir,
            }
        elif 'bands' in kwargs:
            bands = kwargs['bands']
        else:
            raise TypeError("calculate_albedo expects a bands dict or blue, green, red, nir arrays")

        # Weighted sum for broadband albedo (simplified)
        weights = {
            'blue': 0.1,
            'green': 0.2,
            'red': 0.2,
            'nir': 0.3,
            'swir1': 0.1,
            'swir2': 0.1
        }
        
        albedo = np.zeros_like(bands['blue'])
        for band_name, weight in weights.items():
            albedo += bands[band_name] * weight
        
        return np.clip(albedo, 0, 1)
    
    @staticmethod
    def calculate_emissivity(ndvi: np.ndarray) -> np.ndarray:
        """
        Calculate surface emissivity from NDVI
        Using NDVI-based emissivity estimation
        
        Args:
            ndvi: Normalized Difference Vegetation Index
        
        Returns:
            Surface emissivity (0 to 1)
        """
        # Emissivity estimation based on NDVI
        emissivity = np.where(
            ndvi < 0,
            0.97,  # Water/snow
            np.where(
                ndvi < 0.2,
                0.92,  # Bare soil
                np.where(
                    ndvi < 0.5,
                    0.95 + 0.1 * ndvi,  # Mixed vegetation
                    0.99  # Dense vegetation
                )
            )
        )
        return emissivity
    
    @staticmethod
    def calculate_net_radiation(lst: np.ndarray, albedo: np.ndarray,
                              emissivity: np.ndarray, 
                              solar_radiation: float = 800) -> np.ndarray:
        """
        Calculate net radiation using Stefan-Boltzmann law
        Rn = (1 - α) * Rs + ε * σ * (T^4 - Ta^4)
        
        Args:
            lst: Land Surface Temperature in Kelvin
            albedo: Surface albedo
            emissivity: Surface emissivity
            solar_radiation: Incoming solar radiation (W/m²)
        
        Returns:
            Net radiation (W/m²)
        """
        # Incoming shortwave radiation
        sw_in = solar_radiation
        
        # Reflected shortwave radiation
        sw_out = albedo * sw_in
        
        # Emitted longwave radiation (Stefan-Boltzmann)
        lw_out = emissivity * PhysicsLayer.STEFAN_BOLTZMANN_CONSTANT * (lst ** 4)
        
        # Incoming longwave radiation (simplified)
        ta = lst - 10  # Assume air temperature is 10K lower than LST
        lw_in = emissivity * PhysicsLayer.STEFAN_BOLTZMANN_CONSTANT * (ta ** 4)
        
        # Net radiation
        rn = (sw_in - sw_out) + (lw_in - lw_out)
        
        return rn
    
    @staticmethod
    def calculate_sensible_heat_flux(rn: np.ndarray, 
                                   lst: np.ndarray,
                                   air_temp: np.ndarray,
                                   roughness_length: float = 0.1) -> np.ndarray:
        """
        Calculate sensible heat flux
        H = ρ * cp * (T_surface - T_air) / ra
        
        Args:
            rn: Net radiation (W/m²)
            lst: Land Surface Temperature in Kelvin
            air_temp: Air temperature in Kelvin
            roughness_length: Aerodynamic roughness length (m)
        
        Returns:
            Sensible heat flux (W/m²)
        """
        rho = 1.225  # Air density (kg/m³)
        cp = 1005    # Specific heat capacity (J/kg·K)
        
        # Aerodynamic resistance (simplified)
        ra = 1.0 / (0.4 ** 2) * np.log(10 / roughness_length) ** 2
        
        # Sensible heat flux
        h = rho * cp * (lst - air_temp) / ra
        
        return h
    
    @staticmethod
    def calculate_latent_heat_flux(rn: np.ndarray, 
                                  h: np.ndarray,
                                  g: np.ndarray = None) -> np.ndarray:
        """
        Calculate latent heat flux (evapotranspiration)
        LE = Rn - H - G
        
        Args:
            rn: Net radiation (W/m²)
            h: Sensible heat flux (W/m²)
            g: Ground heat flux (W/m²), default 0.1 * Rn
        
        Returns:
            Latent heat flux (W/m²)
        """
        if g is None:
            g = 0.1 * rn
        
        le = rn - h - g
        return le
    
    @staticmethod
    def calculate_heat_index(temperature: float, humidity: float) -> float:
        """
        Calculate heat index (apparent temperature)
        Using Rothfusz regression equation
        
        Args:
            temperature: Air temperature in Fahrenheit
            humidity: Relative humidity in percentage
        
        Returns:
            Heat index in Fahrenheit
        """
        if temperature < 80 or humidity < 40:
            return temperature
        
        T = temperature
        RH = humidity
        
        # Rothfusz equation
        HI = (-42.379 + 2.04901523*T + 10.14333127*RH - 0.22475541*T*RH 
              - 0.00683783*T*T - 0.05481717*RH*RH + 0.00122874*T*T*RH 
              + 0.00085282*T*RH*RH - 0.00000199*T*T*RH*RH)
        
        # Adjustments
        if RH < 13 and 80 <= T <= 112:
            HI -= ((13-RH)/4) * np.sqrt((17-abs(T-95))/17)
        elif RH > 85 and 80 <= T <= 87:
            HI += ((RH-85)/10) * ((87-T)/5)
        
        return HI
    
    @staticmethod
    def calculate_urban_canyon_effect(building_height: float, 
                                     street_width: float,
                                     lst: np.ndarray) -> np.ndarray:
        """
        Calculate urban canyon effect on temperature
        Based on sky view factor and building geometry
        
        Args:
            building_height: Average building height (m)
            street_width: Average street width (m)
            lst: Land Surface Temperature
        
        Returns:
            Temperature adjustment due to urban canyon
        """
        # Sky view factor (simplified)
        aspect_ratio = building_height / street_width
        svf = 1 / (1 + aspect_ratio)
        
        # Temperature adjustment
        temp_adjustment = (1 - svf) * 2.0  # Up to 2°C increase
        
        return lst + temp_adjustment
    
    @staticmethod
    def calculate_cooling_potential(ndvi: np.ndarray, 
                                   albedo: np.ndarray,
                                   water_access: float = 0.5) -> np.ndarray:
        """
        Calculate cooling potential of an area
        Based on vegetation, albedo, and water access
        
        Args:
            ndvi: Normalized Difference Vegetation Index
            albedo: Surface albedo
            water_access: Water access factor (0 to 1)
        
        Returns:
            Cooling potential index (0 to 1)
        """
        # Vegetation cooling
        veg_cooling = np.clip(ndvi, 0, 1)
        
        # Albedo cooling (higher albedo = more reflection)
        albedo_cooling = albedo
        
        # Combined cooling potential
        cooling_potential = 0.5 * veg_cooling + 0.3 * albedo_cooling + 0.2 * water_access
        
        return np.clip(cooling_potential, 0, 1)
