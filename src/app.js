const express = require("express");
const { default: mongoose } = require("mongoose");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { signupDataValidation } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) res.send("Valid credentials");
    else throw new Error("Invalid credentials");
  } catch (err) {
    res.status(400).send("Something went wrong!!! " + err.message);
  }
});

app.post("/signup", async (req, res) => {
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

app.get("/user", async (req, res) => {
  try {
    const users = await User.find({ emailId: req.body.emailId });
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong!!! " + err.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong!!! " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong!!! " + err.message);
  }
});

app.patch("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.userId, req.body);
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong!!! " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Connection established successfully...");
    app.listen(7777, () =>
      console.log("Express is successfully running in port 7777")
    );
  })
  .catch((err) => console.log(err));
