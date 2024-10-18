const express = require("express");
const validate = require("../utils/validation");
const { User } = require("../model/user");
const validator = require("validator");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  //const user = new User(req.body);
  try {
    validate.validateSignUp(req);
    const { firstName, lastName, emailId, password } = req.body;
    const encryptPassword = await bcrypt.hash(password, 10);
    //console.log(encryptPassword);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: encryptPassword,
    });
    await user.save();
    res.status(200).send("User signup successful..!!");
  } catch (err) {
    res.status(400).send("Error occured saving data " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid email format: " + emailId);
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials..");
    }

    const validatePassword = await user.validatePassword(password);
    if (!validatePassword) {
      throw new Error("Invalid credentials..!");
    }
    const token = await user.getJwt();
    res.cookie("token", token, { expires: new Date(Date.now() + 1 * 3600000) });
    res.send("Login Successful...!");
  } catch (err) {
    res.status(400).send("Login Failed.." + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    const { token } = req.cookies;
    console.log("TokenString:" + token);
    res.clearCookie("token");
    res.send("User Logout successfully..");
    // OR
    // res.cookie("token", null, {
    //   expires: new Date(Date.now),
    // }).send("Logout Successful..!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = authRouter;
