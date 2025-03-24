const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
