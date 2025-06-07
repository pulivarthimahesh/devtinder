const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { signupDataValidation } = require("../utils/validation");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // var token = jwt.sign({ userId: user._id }, "Maahi@1234", {
      //   expiresIn: "1h",
      // });
      var token = user.getJWT();
      res.cookie("token", token);
      res.send("User logged in successfully!!!");
    } else throw new Error("Invalid credentials");
  } catch (err) {
    res.status(400).send("Something went wrong!!! " + err.message);
  }
});

router.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    signupDataValidation(req);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Something went wrong !!! " + err.message);
  }
});

router.post("/logout", (req, res) => {
  res
    .cookie("token", null, { expiresIn: new Date(Date.now()) })
    .send("Log out successfull!!!");
});

module.exports = router;
