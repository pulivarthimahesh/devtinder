// getting-started.js
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pulivarthi_mahesh:tn1Uzkdn1uWTlB4L@cluster0.yflcz.mongodb.net/devTinder"
  );

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};

module.exports = { connectDB };
