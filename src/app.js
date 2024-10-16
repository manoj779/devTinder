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

app.get("/users", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const userData = await User.findOne({ emailId: userEmail });
    res.send(userData);
  } catch (err) {
    res.status(400).send("Error while fetch users.." + err.message);
  }
});

app.delete("/users", async (req, res) => {
  const userId = req.body._id;
  try {
    await User.findByIdAndDelete(userId);
    res.send("user: " + userId + "Deleted..!");
  } catch (err) {
    res.status(400).send("Deletion failed..!");
  }
});

app.patch("/users/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "password",
      "gender",
      "skills",
      "age",
      "about",
    ];

    const isAllowed = Object.keys(data).every((k) => {
      const isValid = ALLOWED_UPDATES.includes(k);
      console.log(`Key: ${k}, Is Valid: ${isValid}`);
      return isValid;
    });
    if (!isAllowed) {
      throw new Error("update is not allowed..");
    }
    if (data.skills.length > 3) {
      throw new Error("Skills should not more than 3");
    }
    const result = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidator: true,
    });
    console.log(result);
    res.send("User updated successfully..");
  } catch (err) {
    res.status(400).send("update failed: " + err.message);
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
