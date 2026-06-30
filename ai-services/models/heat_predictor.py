"""
Heat Prediction Models using Random Forest and XGBoost
"""
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import joblib
from typing import Dict, Tuple, Optional, List
import os

try:
    import shap
    SHAP_AVAILABLE = True
except ImportError:
    SHAP_AVAILABLE = False


class HeatPredictor:
    """
    Machine learning model for predicting Land Surface Temperature
    and identifying heat hotspots
    """
    
    def __init__(self, model_type: str = "random_forest"):
        """
        Initialize the heat predictor
        
        Args:
            model_type: Type of model ('random_forest' or 'xgboost')
        """
        self.model_type = model_type
        self.model = None
        self.feature_names = None
        self.scaler = None
        
        if model_type == "random_forest":
            self.model = RandomForestRegressor(
                n_estimators=100,
                max_depth=15,
                min_samples_split=5,
                min_samples_leaf=2,
                random_state=42,
                n_jobs=-1
            )
        elif model_type == "xgboost":
            # Lazy import xgboost so missing OpenMP/runtime doesn't break app startup
            try:
                import xgboost as xgb  # type: ignore
                self.model = xgb.XGBRegressor(
                    n_estimators=100,
                    max_depth=8,
                    learning_rate=0.1,
                    subsample=0.8,
                    colsample_bytree=0.8,
                    random_state=42,
                    n_jobs=-1
                )
            except Exception:
                # Fallback to RandomForest when xgboost is not available on the host
                # (e.g., missing libomp). This keeps the service startable.
                self.model = RandomForestRegressor(
                    n_estimators=50,
                    max_depth=10,
                    random_state=42,
                    n_jobs=-1
                )
                self.model_type = "random_forest"
        else:
            raise ValueError(f"Unknown model type: {model_type}")
    
    def prepare_features(self, data: pd.DataFrame) -> pd.DataFrame:
        """
        Prepare features for model training/prediction
        
        Args:
            data: Raw data with satellite and urban features
        
        Returns:
            Feature matrix
        """
        features = pd.DataFrame()
        
        # Spectral indices
        if 'ndvi' in data.columns:
            features['ndvi'] = data['ndvi']
        if 'ndwi' in data.columns:
            features['ndwi'] = data['ndwi']
        
        # Surface properties
        if 'albedo' in data.columns:
            features['albedo'] = data['albedo']
        if 'emissivity' in data.columns:
            features['emissivity'] = data['emissivity']
        
        # Urban characteristics
        if 'urban_density' in data.columns:
            features['urban_density'] = data['urban_density']
        if 'impervious_surface' in data.columns:
            features['impervious_surface'] = data['impervious_surface']
        if 'building_height_avg' in data.columns:
            features['building_height_avg'] = data['building_height_avg']
        
        # Temporal features
        if 'hour' in data.columns:
            features['hour_sin'] = np.sin(2 * np.pi * data['hour'] / 24)
            features['hour_cos'] = np.cos(2 * np.pi * data['hour'] / 24)
        if 'month' in data.columns:
            features['month_sin'] = np.sin(2 * np.pi * data['month'] / 12)
            features['month_cos'] = np.cos(2 * np.pi * data['month'] / 12)
        
        # Interaction terms
        if 'ndvi' in features.columns and 'urban_density' in features.columns:
            features['ndvi_urban'] = features['ndvi'] * features['urban_density']
        if 'albedo' in features.columns and 'impervious_surface' in features.columns:
            features['albedo_impervious'] = features['albedo'] * features['impervious_surface']
        
        self.feature_names = features.columns.tolist()
        return features
    
    def train(self, data: pd.DataFrame, target_column: str = 'land_surface_temperature'):
        """
        Train the heat prediction model
        
        Args:
            data: Training data
            target_column: Name of target column
        
        Returns:
            Training metrics
        """
        # Prepare features
        X = self.prepare_features(data)
        y = data[target_column]
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Train model
        self.model.fit(X_train, y_train)
        
        # Evaluate
        y_pred = self.model.predict(X_test)
        
        raw_r2 = r2_score(y_test, y_pred)
        metrics = {
            'mse': mean_squared_error(y_test, y_pred),
            'rmse': np.sqrt(mean_squared_error(y_test, y_pred)),
            'mae': mean_absolute_error(y_test, y_pred),
            'r2': max(0.0, raw_r2),
            'raw_r2': raw_r2
        }
        
        # Cross-validation
        cv_scores = cross_val_score(self.model, X, y, cv=5, scoring='neg_mean_squared_error')
        metrics['cv_rmse'] = np.sqrt(-cv_scores.mean())
        
        return metrics
    
    def predict(self, data: pd.DataFrame) -> np.ndarray:
        """
        Predict land surface temperature
        
        Args:
            data: Input data
        
        Returns:
            Predicted LST values
        """
        X = self.prepare_features(data)
        return self.model.predict(X)
    
    def predict_with_confidence(self, data: pd.DataFrame) -> Tuple[np.ndarray, np.ndarray]:
        """
        Predict with confidence intervals (using Random Forest)
        
        Args:
            data: Input data
        
        Returns:
            Tuple of (predictions, confidence)
        """
        X = self.prepare_features(data)
        
        if self.model_type == "random_forest":
            # Use tree variance for confidence
            predictions = np.array([tree.predict(X) for tree in self.model.estimators_])
            mean_pred = predictions.mean(axis=0)
            std_pred = predictions.std(axis=0)
            confidence = 1.0 / (1.0 + std_pred)  # Higher confidence for lower variance
            return mean_pred, confidence
        else:
            # For XGBoost, use prediction variance
            pred = self.model.predict(X)
            confidence = np.ones_like(pred) * 0.8  # Default confidence
            return pred, confidence
    
    def get_feature_importance(self) -> Dict[str, float]:
        """
        Get feature importance from the model
        
        Returns:
            Dictionary of feature names and importance scores
        """
        if self.feature_names is None:
            return {}
        
        importance = self.model.feature_importances_
        return dict(zip(self.feature_names, importance))
    
    def explain_prediction(self, data: pd.DataFrame, sample_idx: int = 0) -> Dict:
        """
        Explain a single prediction using SHAP values
        
        Args:
            data: Input data
            sample_idx: Index of sample to explain
        
        Returns:
            SHAP explanation dictionary or feature importance if SHAP unavailable
        """
        if not SHAP_AVAILABLE:
            # Return feature importance as fallback
            return {
                'error': 'SHAP not available',
                'feature_importance': self.get_feature_importance(),
                'feature_values': data.iloc[sample_idx].to_dict() if sample_idx < len(data) else {}
            }
        
        X = self.prepare_features(data)
        
        # Create SHAP explainer
        if self.model_type == "random_forest":
            explainer = shap.TreeExplainer(self.model)
        else:
            explainer = shap.TreeExplainer(self.model)
        
        # Get SHAP values
        shap_values = explainer.shap_values(X.iloc[[sample_idx]])
        
        explanation = {
            'base_value': explainer.expected_value,
            'shap_values': dict(zip(self.feature_names, shap_values[0])),
            'feature_values': X.iloc[sample_idx].to_dict()
        }
        
        return explanation
    
    def save_model(self, filepath: str):
        """
        Save the trained model
        
        Args:
            filepath: Path to save the model
        """
        model_data = {
            'model': self.model,
            'model_type': self.model_type,
            'feature_names': self.feature_names
        }
        joblib.dump(model_data, filepath)
    
    def load_model(self, filepath: str):
        """
        Load a trained model
        
        Args:
            filepath: Path to the saved model
        """
        model_data = joblib.load(filepath)
        self.model = model_data['model']
        self.model_type = model_data['model_type']
        self.feature_names = model_data['feature_names']
    
    def detect_hotspots(self, data: pd.DataFrame, 
                       threshold_percentile: float = 90) -> pd.DataFrame:
        """
        Detect heat hotspots based on predicted temperatures
        
        Args:
            data: Input data
            threshold_percentile: Percentile threshold for hotspot detection
        
        Returns:
            DataFrame with hotspot flags
        """
        predictions = self.predict(data)
        
        threshold = np.percentile(predictions, threshold_percentile)
        is_hotspot = predictions >= threshold
        
        result = data.copy()
        result['predicted_lst'] = predictions
        result['is_hotspot'] = is_hotspot
        result['hotspot_intensity'] = (predictions - predictions.min()) / (predictions.max() - predictions.min())
        
        return result


class EnsembleHeatPredictor:
    """
    Ensemble model combining Random Forest and XGBoost
    """
    
    def __init__(self):
        self.rf_model = HeatPredictor('random_forest')
        self.xgb_model = HeatPredictor('xgboost')
        self.weights = {'rf': 0.5, 'xgb': 0.5}
    
    def train(self, data: pd.DataFrame, target_column: str = 'land_surface_temperature'):
        """Train both models"""
        rf_metrics = self.rf_model.train(data, target_column)
        xgb_metrics = self.xgb_model.train(data, target_column)
        
        # Adjust weights based on performance
        rf_weight = 1.0 / (rf_metrics['rmse'] + 1e-10)
        xgb_weight = 1.0 / (xgb_metrics['rmse'] + 1e-10)
        
        total = rf_weight + xgb_weight
        self.weights['rf'] = rf_weight / total
        self.weights['xgb'] = xgb_weight / total
        
        return {
            'random_forest': rf_metrics,
            'xgboost': xgb_metrics,
            'ensemble_weights': self.weights
        }
    
    def predict(self, data: pd.DataFrame) -> np.ndarray:
        """Ensemble prediction"""
        rf_pred = self.rf_model.predict(data)
        xgb_pred = self.xgb_model.predict(data)
        
        ensemble_pred = (self.weights['rf'] * rf_pred + 
                        self.weights['xgb'] * xgb_pred)
        
        return ensemble_pred
    
    def save_models(self, directory: str):
        """Save both models"""
        os.makedirs(directory, exist_ok=True)
        self.rf_model.save_model(os.path.join(directory, 'rf_model.pkl'))
        self.xgb_model.save_model(os.path.join(directory, 'xgb_model.pkl'))
        
        # Save weights
        joblib.dump(self.weights, os.path.join(directory, 'ensemble_weights.pkl'))
    
    def load_models(self, directory: str):
        """Load both models"""
        self.rf_model.load_model(os.path.join(directory, 'rf_model.pkl'))
        self.xgb_model.load_model(os.path.join(directory, 'xgb_model.pkl'))
        self.weights = joblib.load(os.path.join(directory, 'ensemble_weights.pkl'))
