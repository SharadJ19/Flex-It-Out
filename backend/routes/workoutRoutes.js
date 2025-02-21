const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Workout = require("../models/Workout");

const router = express.Router();

// Log a workout
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { type, duration } = req.body;
    const workout = await Workout.create({ userId: req.user.id, type, duration });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: "Error logging workout" });
  }
});

// Get user's workouts
router.get("/", authMiddleware, async (req, res) => {
  const workouts = await Workout.find({ userId: req.user.id });
  res.json(workouts);
});

module.exports = router;
