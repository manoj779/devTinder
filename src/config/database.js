const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://manoj:welcome123@cluster0.pix7hf6.mongodb.net/devTinder"
  );
};

module.exports = { connectDb };
