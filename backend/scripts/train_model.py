import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from models.attendance_model import attendance_predictor

def main():
    print("🚀 Starting Attendance Prediction Model Training...")
    
    # Load data
    if not attendance_predictor.load_data('data/worker_attendance.csv'):
        print("❌ Failed to load data. Please check if worker_attendance.csv exists in data/ folder")
        return
    
    # Preprocess data
    attendance_predictor.preprocess_data()
    
    # Train model
    attendance_predictor.train_overall_model()
    
    # Generate predictions
    predictions = attendance_predictor.generate_predictions()
    
    print("\n🎯 Training completed successfully!")
    print(f"📊 Next day prediction: {predictions['overall']['predicted_rate']}")

if __name__ == "__main__":
    main()