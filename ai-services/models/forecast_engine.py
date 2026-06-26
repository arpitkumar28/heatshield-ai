"""
Enterprise Forecast Engine for Urban Heat Intelligence
Implements time-series forecasting for heatwave prediction.
"""
import pandas as pd
import numpy as np
from typing import Dict, List, Optional, Tuple
from datetime import datetime, timedelta
import joblib
from statsmodels.tsa.holtwinters import ExponentialSmoothing
from sklearn.metrics import mean_squared_error

class HeatForecastEngine:
    """
    Predicts future heat trends using statistical and ML time-series models.
    Supports 24h, 7d, and 30d windows.
    """
    
    def __init__(self):
        self.models = {}
        self.history_required = 30  # Minimum days of history for a reliable 7d forecast

    def train_site_model(self, location_id: str, historical_data: pd.DataFrame):
        """
        Trains a location-specific forecasting model.
        historical_data: DataFrame with ['timestamp', 'land_surface_temperature']
        """
        if len(historical_data) < self.history_required:
            raise ValueError(f"Insufficient history for location {location_id}. Need {self.history_required} points.")
            
        historical_data = historical_data.sort_values('timestamp')
        series = historical_data.set_index('timestamp')['land_surface_temperature']
        
        # Fit Holt-Winters Exponential Smoothing (Good for seasonal temperature data)
        model = ExponentialSmoothing(
            series, 
            seasonal_periods=24,  # Assuming hourly data
            trend='add', 
            seasonal='add',
            use_boxcox=True
        ).fit()
        
        self.models[location_id] = model
        return model

    def generate_forecast(self, location_id: str, steps: int = 168) -> pd.DataFrame:
        """
        Generates forecast for N steps ahead.
        Default 168 steps = 7 days (hourly).
        """
        if location_id not in self.models:
            # Fallback or online training would go here
            return pd.DataFrame()
            
        model = self.models[location_id]
        forecast_values = model.forecast(steps)
        
        # Generate confidence intervals (simplified)
        last_val = forecast_values.iloc[-1]
        std_error = np.sqrt(model.sse / len(model.fittedvalues))
        
        forecast_df = pd.DataFrame({
            'timestamp': [datetime.now() + timedelta(hours=i) for i in range(1, steps + 1)],
            'predicted_temp': forecast_values.values,
            'lower_bound': forecast_values.values - (1.96 * std_error),
            'upper_bound': forecast_values.values + (1.96 * std_error),
            'confidence': np.clip(1.0 - (std_error / 10.0), 0.5, 0.98)
        })
        
        return forecast_df

    def detect_upcoming_heatwave(self, location_id: str, threshold: float = 40.0) -> Dict:
        """
        Analyzes forecast for heatwave conditions (e.g., > threshold for 3+ days).
        """
        forecast = self.generate_forecast(location_id, steps=72) # 3 day check
        if forecast.empty:
            return {"heatwave_risk": "unknown"}
            
        consecutive_hours = 0
        max_consecutive = 0
        for temp in forecast['predicted_temp']:
            if temp >= threshold:
                consecutive_hours += 1
                max_consecutive = max(max_consecutive, consecutive_hours)
            else:
                consecutive_hours = 0
                
        is_risk = max_consecutive >= 48 # 2 days of continuous extreme heat
        
        return {
            "heatwave_risk": "high" if is_risk else "low",
            "max_predicted": float(forecast['predicted_temp'].max()),
            "start_time": forecast[forecast['predicted_temp'] >= threshold]['timestamp'].iloc[0] if is_risk else None
        }
