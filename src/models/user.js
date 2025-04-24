const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  emailId: String,
  password: String,
  age: Number,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
