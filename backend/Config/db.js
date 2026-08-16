const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

// Set public DNS servers to prevent querySrv ECONNREFUSED errors on local ISP/router DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
};

module.exports = connectToDb;