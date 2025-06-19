const express = require("express");
const { default: mongoose } = require("mongoose");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const requestRouter = require("./routes/requestRouter");
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("Connection established successfully...");
    app.listen(7777, () =>
      console.log("Express is successfully running in port 7777")
    );
  })
  .catch((err) => console.log(err));
