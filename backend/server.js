const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/leaderboard", require("./routes/leaderboardRoutes"));

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
