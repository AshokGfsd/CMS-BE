const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  membership: {
    type: String,
    enum: ["free", "silver", "gold"],
    default: "free",
  },
  otp: {
    type: Number,
    default: "",
  },
});

module.exports = mongoose.model("Users", userSchema, "users");
