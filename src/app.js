const express = require("express");
const { default: mongoose } = require("mongoose");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.use("/signup", async (req, res) => {
  const user = new User({
    firstName: "Mahesh",
  });
  await user.save();
  res.send("User added successfully");
});

connectDB()
  .then(() => {
    console.log("Connection established successfully...");
    app.listen(7777, () =>
      console.log("Express is successfully running in port 7777")
    );
  })
  .catch((err) => console.log(err));
