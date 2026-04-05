/**
 * Example: import into your Express app after `await connectRedis()`.
 *
 *   const { connectRedis } = require("../config/redisClient");
 *   const sampleTasksRedis = require("./routes/sampleTasksRedis");
 *   await connectRedis();
 *   app.use("/api/tasks", sampleTasksRedis);
 */
const express = require("express");
const { redisClient } = require("../config/redisClient");

const router = express.Router();

const TTL_SECONDS = 60 * 60; // 1 hour

/** POST /api/tasks  { "id": "task-1", "title": "...", ... } */
router.post("/", express.json(), async (req, res) => {
  try {
    const body = req.body;
    const id = body?.id;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: 'Body must include a string "id" field' });
    }

    const key = `task:${id}`;
    const payload = JSON.stringify(body);

    await redisClient.setEx(key, TTL_SECONDS, payload);

    return res.status(201).json({ ok: true, key, expiresInSeconds: TTL_SECONDS });
  } catch (err) {
    console.error("[sampleTasksRedis] POST error:", err);
    return res.status(500).json({ error: "Failed to save task in Redis" });
  }
});

/** GET /api/tasks/:id */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const key = `task:${id}`;
    const raw = await redisClient.get(key);

    if (raw == null) {
      return res.status(404).json({ error: "Task not found or expired" });
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw;
    }

    return res.json({ data });
  } catch (err) {
    console.error("[sampleTasksRedis] GET error:", err);
    return res.status(500).json({ error: "Failed to read task from Redis" });
  }
});

module.exports = router;
