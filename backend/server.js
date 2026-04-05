/**
 * Minimal entry — loads .env, connects Redis, mounts sample routes.
 * Run: npm start  (from backend/)
 */
require("dotenv").config();

const express = require("express");
const { connectRedis } = require("./config/redisClient");
const sampleTasksRedis = require("./routes/sampleTasksRedis");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/tasks", sampleTasksRedis);

async function main() {
  await connectRedis();
  app.listen(PORT, () => {
    console.log(`[server] Listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("[server] Failed to start:", err);
  process.exit(1);
});
