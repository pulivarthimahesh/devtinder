const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Invalid token");
    const decoded = jwt.verify(token, "Maahi@1234");
    const { userId } = decoded;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found!!!");
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
