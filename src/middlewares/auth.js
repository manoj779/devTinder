const { User } = require("../model/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token or token expired..!");
    }
    console.log("Token: " + token);
    const userDecode = await jwt.verify(token, "jwt@123");
    console.log("userDecode: ", userDecode);
    const { _id } = userDecode;
    const userData = await User.findById(_id);
    console.log(userData);
    if (!userData) {
      throw new Error("user does not exist...");
    }
    req.user = userData;
    next();
  } catch (err) {
    res.status(400).send("Unauthorized User...!");
  }
};

module.exports = { userAuth };
