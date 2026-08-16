const { createClient } = require("redis");

const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});

redisClient.on("error", (error) => {
  console.log("❌ Redis Error:", error);
});

redisClient.on("connect", () => {
  console.log("🔄 Connecting to Redis...");
});

redisClient.on("ready", () => {
  console.log("✅ Redis is ready");
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log("❌ Redis Connection Failed:", error.message);
  }
};

module.exports = {
  redisClient,
  connectRedis,
};