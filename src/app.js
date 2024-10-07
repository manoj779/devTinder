const express = require("express");

const app = express();
const { userAuth } = require("./middlewares/auth");
const { connectDb } = require("./config/database");
const { User } = require("./model/user");

app.use(express.json());

//app.use("/user", userAuth);

// app.use(
//   "/user/page",
//   userAuth,
//   (req, res) => {
//     console.log("user route handler called..!");
//     res.status(200).send("User/page requested from user route..!");
//   },
//   (req, res) => {
//     console.log("Second route handler..!");
//   }
// );

// app.use("/user", (req, res) => {
//   console.log("user route handler called..!");
//   res.status(200).send("User requested from user route..!");
// });

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(200).send("User signup successful..!!");
  } catch (err) {
    res.status(400).send("Error occured saving data " + err.message);
  }
});

connectDb()
  .then(() => {
    console.log("MongoDb connection is successful..!");
    app.listen("3333", () => {
      console.log("Server is now live..!");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected..!");
  });
