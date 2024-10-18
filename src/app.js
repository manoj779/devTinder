const express = require("express");
const app = express();
const { connectDb } = require("./config/database");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const reqRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", reqRouter);

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
