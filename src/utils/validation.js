const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid..");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email : " + emailId);
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong..");
  }
};

module.exports = { validateSignUp };
