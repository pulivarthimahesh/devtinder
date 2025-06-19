const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      let fromUserId = req.user._id;
      let toUserId = req.params.toUserId;
      let status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      let isAllowedStatus = allowedStatus.includes(req.params.status);
      if (!isAllowedStatus) {
        throw new Error("Bad Reqquest!!!");
      }
      const toUser = await User.findOne({
        _id: req.params.toUserId,
      });
      if (!toUser) {
        throw new Error("Invalid user");
      }
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      console.log("existingConnectionRequest: " + existingConnectionRequest);
      if (existingConnectionRequest) {
        throw new Error("Already connection exists!!!");
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
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
