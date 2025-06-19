const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectRequest");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const connectionRequest = new ConnectionRequest({
        fromUserId: req.user._id,
        toUserId: req.params.toUserId,
        status: req.params.status,
      });
      const data = await connectionRequest.save();
      res.json({
        messsage: "Request sent successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("something went wrong!!! " + err.message);
    }
  }
);

module.exports = requestRouter;
