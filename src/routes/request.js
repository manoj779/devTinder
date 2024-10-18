const express = require("express");

const reqRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

reqRouter.get("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    if (!req.user) {
      throw new Error("Cannot connect server,please login and try again..");
    }
    res.send("Connection successful..!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = reqRouter;
