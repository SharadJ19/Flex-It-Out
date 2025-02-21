const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  crunchesscore: { type: Number, default: 0 },
  pushupsscore: { type: Number, default: 0 },
  squatsscore: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);
