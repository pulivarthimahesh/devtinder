const express = require("express");

const app = express();

app.use("/profile", (req, res) => {
  res.send("Hello from DevTinder Profile Team...");
});

app.use("/", (req, res) => {
  res.send("Hello from DevTinder Team....");
});
app.listen(7777, () =>
  console.log("Express is successfully running in port 7777")
);
