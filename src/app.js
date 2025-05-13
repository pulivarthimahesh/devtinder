const express = require("express");
const { default: mongoose } = require("mongoose");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
app.use("/", authRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Connection established successfully...");
    app.listen(7777, () =>
      console.log("Express is successfully running in port 7777")
    );
  })
  .catch((err) => console.log(err));
