const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const userData = req.user;
    res.send(userData);
  } catch (err) {
    res.status(400).send("profile not exist..");
  }
});

module.exports = profileRouter;
