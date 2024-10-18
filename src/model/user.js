const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "Image URL",
    },
    about: {
      type: String,
      default: "This is default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJwt = async function () {
  try {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "jwt@123", {
      expiresIn: "1d",
    });
    return token;
  } catch (err) {
    throw new Error("failed to get token.." + err.message);
  }
};

userSchema.methods.validatePassword = async function (password) {
  try {
    const user = this;
    isValidPassword = await bcrypt.compare(password, user.password);
    console.log("ValidatePassword:", isValidPassword);
    return isValidPassword;
  } catch (err) {
    throw new Error("validartion error: " + err.message);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
