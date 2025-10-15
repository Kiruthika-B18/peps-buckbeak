// ...existing code...

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

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

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API is running...");
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

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
