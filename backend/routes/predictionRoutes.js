const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get current predictions
router.get('/predictions', (req, res) => {
    try {
        const predictionsPath = path.join(__dirname, '../trained_models/dashboard_predictions.json');
        
        if (fs.existsSync(predictionsPath)) {
            const predictions = JSON.parse(fs.readFileSync(predictionsPath, 'utf8'));
            res.json({
                success: true,
                data: predictions
            });
        } else {
            res.json({
                success: false,
                message: 'Predictions not available. Please train the model first.'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error loading predictions',
            error: error.message
        });
    }
});

// Train model endpoint
router.post('/train', (req, res) => {
    try {
        const pythonProcess = spawn('python', ['scripts/train_model.py']);

        let output = '';
        let error = '';

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
            console.log(`Python Output: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
            console.error(`Python Error: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                res.json({
                    success: true,
                    message: 'Model trained successfully',
                    output: output
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Model training failed',
                    error: error
                });
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error starting training process',
            error: error.message
        });
    }
});

// Get model status
router.get('/status', (req, res) => {
    try {
        const modelPath = path.join(__dirname, '../trained_models/overall_attendance_model.pkl');
        const predictionsPath = path.join(__dirname, '../trained_models/dashboard_predictions.json');
        
        const modelExists = fs.existsSync(modelPath);
        const predictionsExist = fs.existsSync(predictionsPath);
        
        let lastUpdated = null;
        if (predictionsExist) {
            const predictions = JSON.parse(fs.readFileSync(predictionsPath, 'utf8'));
            lastUpdated = predictions.last_updated;
        }
        
        res.json({
            success: true,
            data: {
                model_trained: modelExists,
                predictions_available: predictionsExist,
                last_updated: lastUpdated
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking model status',
            error: error.message
        });
    }
});

module.exports = router;