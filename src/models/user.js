const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 4,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 4,
      required: true,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Entered email is not valid " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Entered password is not strong " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = function () {
  var user = this;
  return jwt.sign({ userId: user._id }, "Maahi@1234", {
    expiresIn: "1h",
  });
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
