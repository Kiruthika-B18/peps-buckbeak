import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import fs from "fs";
import User from "./modeles/User.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Simple Schema & Model (optional, for testing)
const TestSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const Test = mongoose.model("Test", TestSchema);

// =============================================
// ATTENDANCE PREDICTION ROUTES
// =============================================

// Get current predictions
app.get("/api/predictions", (req, res) => {
  try {
    const predictionsPath = path.join(__dirname, 'trained_models', 'dashboard_predictions.json');
    
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
app.post("/api/predictions/train", (req, res) => {
  try {
    const pythonProcess = spawn('python', ['scripts/train_model.py'], {
      cwd: __dirname
    });

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
app.get("/api/predictions/status", (req, res) => {
  try {
    const modelPath = path.join(__dirname, 'trained_models', 'overall_attendance_model.pkl');
    const predictionsPath = path.join(__dirname, 'trained_models', 'dashboard_predictions.json');
    
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

// Manual prediction generation (alternative endpoint)
app.post("/api/predictions/generate", (req, res) => {
  try {
    const pythonProcess = spawn('python', ['scripts/generate_predictions.py'], {
      cwd: __dirname
    });

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
        // Read the updated predictions
        const predictionsPath = path.join(__dirname, 'trained_models', 'dashboard_predictions.json');
        if (fs.existsSync(predictionsPath)) {
          const predictions = JSON.parse(fs.readFileSync(predictionsPath, 'utf8'));
          res.json({
            success: true,
            message: 'Predictions generated successfully',
            data: predictions
          });
        } else {
          res.status(500).json({
            success: false,
            message: 'Predictions file not found after generation'
          });
        }
      } else {
        res.status(500).json({
          success: false,
          message: 'Prediction generation failed',
          error: error
        });
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error starting prediction generation',
      error: error.message
    });
  }
});

// =============================================
// EXISTING ROUTES
// =============================================

// Route to create three sample users
app.post("/init-users", async (req, res) => {
  const sampleUsers = [
    { email: "user1@example.com", password: "password1" },
    { email: "user2@example.com", password: "password2" },
    { email: "user3@example.com", password: "password3" },
  ];
  try {
    // Remove all existing users first (optional, for idempotency)
    await User.deleteMany({});
    const created = await User.insertMany(sampleUsers);
    res.status(201).json({ message: "Sample users created", users: created });
  } catch (error) {
    res.status(500).json({ message: "Error creating users", error });
  }
});

// ✅ Routes
app.get("/", (req, res) => {
  res.json({ 
    message: "PEPS-BUCKBEAK API is running...",
    endpoints: {
      predictions: {
        get: "/api/predictions",
        train: "/api/predictions/train (POST)",
        status: "/api/predictions/status",
        generate: "/api/predictions/generate (POST)"
      },
      users: {
        init: "/init-users (POST)"
      },
      data: {
        add: "/add (POST)",
        get: "/data (GET)"
      }
    }
  });
});

// Example POST route to insert data
app.post("/add", async (req, res) => {
  try {
    const newDoc = new Test(req.body);
    await newDoc.save();
    res.status(201).json({ message: "Data added successfully", data: newDoc });
  } catch (error) {
    res.status(500).json({ message: "Error adding data", error });
  }
});

// Example GET route to fetch data
app.get("/data", async (req, res) => {
  try {
    const data = await Test.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

// =============================================
// ERROR HANDLING MIDDLEWARE
// =============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ 
    message: "Internal server error",
    error: process.env.NODE_ENV === 'production' ? {} : err.message 
  });
});

// =============================================
// START THE SERVER
// =============================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Prediction API available at http://localhost:${PORT}/api/predictions`);
  console.log(`❤️  Health check at http://localhost:${PORT}/health`);
});