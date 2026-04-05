/**
 * Redis client (node-redis v4).
 * Load dotenv before requiring this module, or set REDIS_URL in the environment.
 */
const { createClient } = require("redis");

if (!process.env.REDIS_URL) {
  console.warn("[redis] REDIS_URL is not set — Redis calls will fail until it is defined.");
}

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("[redis] Client error:", err.message);
});

redisClient.on("connect", () => {
  console.log("[redis] Socket connected");
});

redisClient.on("ready", () => {
  console.log("[redis] Client ready");
});

redisClient.on("reconnecting", () => {
  console.log("[redis] Reconnecting…");
});

redisClient.on("end", () => {
  console.log("[redis] Connection ended");
});

let connecting;

/**
 * Connect once; safe to call multiple times.
 * Call from server startup: await connectRedis() before app.listen.
 */
async function connectRedis() {
  if (redisClient.isOpen) {
    return redisClient;
  }
  if (!connecting) {
    connecting = redisClient.connect().catch((err) => {
      connecting = undefined;
      throw err;
    });
  }
  await connecting;
  return redisClient;
}

module.exports = { redisClient, connectRedis };
