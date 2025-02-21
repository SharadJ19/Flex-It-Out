require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// **Connect to MongoDB**
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// **Signup Route**
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();
    
    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// **Login Route**
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  res.cookie("auth", "true", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.json({ success: true, message: "Login successful" });
});

// **Check Auth (Frontend will use this)**
app.get("/auth-status", (req, res) => {
  const isAuthenticated = req.cookies.auth === "true";
  res.json({ isAuthenticated });
});

// **Leaderboard Route - Get Top Players**
app.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find()
      .select("name crunchesscore pushupsscore squatsscore")
      .lean();

    const sortedUsers = users
      .map((user) => ({
        name: user.name,
        totalScore: user.crunchesscore + user.pushupsscore + user.squatsscore,
      }))
      .sort((a, b) => b.totalScore - a.totalScore) // Sort in descending order
      .slice(0, 10); // Top 10 players

    res.json(sortedUsers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
});


// **Logout Route**
app.post("/logout", (req, res) => {
  res.clearCookie("auth");
  res.json({ success: true, message: "Logged out" });
});

// **Start Server**
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
