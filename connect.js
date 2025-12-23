const mongoose = require("mongoose");

async function connect(url) {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

module.exports = connect;
