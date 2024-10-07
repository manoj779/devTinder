const userAuth = (req, res, next) => {
  const jwt = "xyz";
  const IsAuthenticated = jwt == "xyz1";
  if (IsAuthenticated) {
    console.log("Authorized");
    next();
  } else {
    res.status(401).send("Unauthorized user,,!");
  }
};

module.exports = { userAuth };
