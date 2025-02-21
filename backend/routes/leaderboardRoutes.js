const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Get leaderboard
router.get("/", async (req, res) => {
  const topUsers = await User.find().sort({ score: -1 }).limit(10);
  res.json(topUsers);
});

module.exports = router;
