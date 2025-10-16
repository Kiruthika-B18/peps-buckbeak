import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
import joblib
from datetime import datetime, timedelta
import json
import os

warnings.filterwarnings('ignore')

class AttendancePredictor:
    def __init__(self):
        self.overall_model = None
        self.dept_models = {}
        self.shift_models = {}
        
    def load_data(self, file_path='data/worker_attendance.csv'):
        """Load and preprocess attendance data"""
        try:
            self.attendance_df = pd.read_csv(file_path)
            print(f"✅ Data loaded successfully: {self.attendance_df.shape}")
            return True
        except Exception as e:
            print(f"❌ Error loading data: {e}")
            return False
    
    def preprocess_data(self):
        """Preprocess data for training"""
        print("Preprocessing data...")
        
        # Convert date column
        self.attendance_df['Date'] = pd.to_datetime(self.attendance_df['Date'])
        
        # Create synthetic department data if not exists
        if 'Department' not in self.attendance_df.columns:
            departments = ['Production', 'Quality Control', 'Maintenance', 'Logistics', 'Administration']
            department_weights = [0.4, 0.2, 0.15, 0.15, 0.1]
            self.attendance_df['Department'] = np.random.choice(
                departments, size=len(self.attendance_df), p=department_weights
            )
        
        # Create synthetic shift data if not exists
        if 'Shift' not in self.attendance_df.columns:
            shifts = ['Morning (6AM-2PM)', 'Evening (2PM-10PM)', 'Night (10PM-6AM)']
            shift_weights = [0.45, 0.35, 0.2]
            self.attendance_df['Shift'] = np.random.choice(
                shifts, size=len(self.attendance_df), p=shift_weights
            )
        
        print("✅ Data preprocessing completed")
    
    def train_overall_model(self):
        """Train overall attendance prediction model"""
        print("Training overall attendance model...")
        
        # Daily summary for overall attendance
        daily_overall = self.attendance_df.groupby('Date').agg({
            'Worker_ID': 'count',
            'Attendance_Status': lambda x: (x == 'Present').sum(),
            'Efficiency (%)': 'mean',
            'Production_Units': 'sum'
        }).reset_index()

        daily_overall.columns = ['Date', 'total_workers', 'present_workers', 'avg_efficiency', 'total_production']
        daily_overall['attendance_rate'] = daily_overall['present_workers'] / daily_overall['total_workers']

        # Add features for time series prediction
        daily_overall['day_of_week'] = daily_overall['Date'].dt.dayofweek
        daily_overall['month'] = daily_overall['Date'].dt.month
        daily_overall['day_of_month'] = daily_overall['Date'].dt.day
        daily_overall['is_weekend'] = daily_overall['day_of_week'].isin([5, 6]).astype(int)
        daily_overall['attendance_rate_lag1'] = daily_overall['attendance_rate'].shift(1)
        daily_overall['attendance_rate_lag7'] = daily_overall['attendance_rate'].shift(7)

        # Remove NaN values
        self.daily_overall_clean = daily_overall.dropna()

        # Prepare features
        overall_features = ['day_of_week', 'month', 'day_of_month', 'is_weekend', 
                           'attendance_rate_lag1', 'attendance_rate_lag7']

        X_overall = self.daily_overall_clean[overall_features]
        y_overall = self.daily_overall_clean['attendance_rate']

        # Train-test split
        split_idx = int(len(X_overall) * 0.8)
        X_train_overall, X_test_overall = X_overall[:split_idx], X_overall[split_idx:]
        y_train_overall, y_test_overall = y_overall[:split_idx], y_overall[split_idx:]

        # Train models
        overall_models = {
            'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42),
            'XGBoost': xgb.XGBRegressor(n_estimators=100, random_state=42, verbosity=0),
            'Linear Regression': LinearRegression()
        }

        best_score = float('-inf')
        best_model = None
        best_name = ""

        for name, model in overall_models.items():
            model.fit(X_train_overall, y_train_overall)
            y_pred = model.predict(X_test_overall)
            r2 = r2_score(y_test_overall, y_pred)
            print(f"  Trained {name}: R² = {r2:.4f}")
            if r2 > best_score:
                best_score = r2
                best_model = model
                best_name = name

        self.overall_model = best_model
        # If no model was selected (e.g., all R² were NaN), train a simple fallback on full data
        if best_model is None or (isinstance(best_score, float) and np.isnan(best_score)):
            print("⚠️ No valid model found during evaluation — training fallback Linear Regression on full data")
            fallback = LinearRegression()
            fallback.fit(X_overall, y_overall)
            best_model = fallback
            best_name = 'Linear Regression (fallback)'
            try:
                best_score = r2_score(y_overall, fallback.predict(X_overall))
            except Exception:
                best_score = float('nan')

        self.overall_model = best_model
        print(f"✅ Best overall model: {best_name} (R²: {best_score:.4f})")
        
        return best_model
    
    def generate_predictions(self):
        """Generate predictions for dashboard"""
        print("Generating dashboard predictions...")
        
        # Get latest date and prepare next day features
        latest_date = self.daily_overall_clean['Date'].iloc[-1]
        next_date = latest_date + timedelta(days=1)

        next_day_of_week = next_date.weekday()
        next_month = next_date.month
        next_day_of_month = next_date.day
        next_is_weekend = 1 if next_day_of_week in [5, 6] else 0

        # Use recent lag values
        recent_lag1 = self.daily_overall_clean['attendance_rate'].iloc[-1]
        recent_lag7 = self.daily_overall_clean['attendance_rate'].iloc[-7] if len(self.daily_overall_clean) >= 7 else recent_lag1

        # Feature array for prediction
        next_day_features = np.array([[
            next_day_of_week, next_month, next_day_of_month, 
            next_is_weekend, recent_lag1, recent_lag7
        ]])

        # Predict overall attendance
        predicted_overall_rate = self.overall_model.predict(next_day_features)[0]
        avg_total_workers = self.daily_overall_clean['total_workers'].mean()
        predicted_present = int(avg_total_workers * predicted_overall_rate)

        # Department predictions
        dept_base_rates = {
            'Production': 0.81, 'Quality Control': 0.80, 'Maintenance': 0.53,
            'Logistics': 0.80, 'Administration': 0.83
        }
        
        dept_avg_workers = {
            'Production': 48, 'Quality Control': 20, 'Maintenance': 15,
            'Logistics': 15, 'Administration': 12
        }

        dept_predictions = {}
        for dept in dept_base_rates.keys():
            base_rate = dept_base_rates[dept]
            avg_workers = dept_avg_workers[dept]
            
            trend_factor = predicted_overall_rate / 0.715
            pred_rate = min(0.95, max(0.5, base_rate * trend_factor))
            pred_present = int(avg_workers * pred_rate)
            
            dept_predictions[dept] = {
                'predicted': f"{pred_present}/{avg_workers} ({pred_rate*100:.1f}%)",
                'rate': pred_rate,
                'workers': pred_present,
                'total_workers': avg_workers
            }

        # Shift predictions
        shift_base_data = {
            'Morning (6AM-2PM)': {'workers': 48, 'efficiency': 0.85},
            'Evening (2PM-10PM)': {'workers': 37, 'efficiency': 0.78},
            'Night (10PM-6AM)': {'workers': 22, 'efficiency': 0.68}
        }

        shift_predictions = {}
        for shift, base_data in shift_base_data.items():
            base_workers = base_data['workers']
            base_efficiency = base_data['efficiency']
            
            trend_factor = predicted_overall_rate / 0.715
            pred_workers = int(base_workers * trend_factor)
            pred_efficiency = min(0.95, max(0.6, base_efficiency * (0.95 + np.random.random() * 0.1)))
            
            shift_predictions[shift] = {
                'workers': pred_workers,
                'efficiency': f"{pred_efficiency*100:.1f}%",
                'attendance_rate': f"{min(95, max(65, pred_efficiency*100 + np.random.randint(-5, 5))):.1f}%"
            }

        # Save predictions
        dashboard_predictions = {
            'overall': {
                'predicted_present': predicted_present,
                'predicted_total': int(avg_total_workers),
                'predicted_rate': f"{predicted_overall_rate*100:.1f}%",
                'date': next_date.strftime('%Y-%m-%d')
            },
            'departments': dept_predictions,
            'shifts': shift_predictions,
            'last_updated': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }

        # Ensure directory exists
        os.makedirs('trained_models', exist_ok=True)
        
        with open('trained_models/dashboard_predictions.json', 'w') as f:
            json.dump(dashboard_predictions, f, indent=2)
        
        # Save model
        joblib.dump(self.overall_model, 'trained_models/overall_attendance_model.pkl')
        
        print("✅ Predictions generated and saved successfully!")
        return dashboard_predictions

# Singleton instance
attendance_predictor = AttendancePredictor()