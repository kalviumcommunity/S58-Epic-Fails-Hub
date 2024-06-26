// Module 15
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
const userModel = mongoose.model("userdatas", userSchema);

module.exports = { userModel };
