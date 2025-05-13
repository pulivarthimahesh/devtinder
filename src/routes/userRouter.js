const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");

router.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Something went wrong!!! " + err.message);
  }
});

router.get("/user", async (req, res) => {
  try {
    const users = await User.find({ emailId: req.body.emailId });
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong!!! " + err.message);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong!!! " + err.message);
  }
});

router.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong!!! " + err.message);
  }
});

router.patch("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.userId, req.body);
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong!!! " + err.message);
  }
});

module.exports = router;
