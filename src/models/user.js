const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 4,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 4,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
