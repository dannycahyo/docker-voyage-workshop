import { Hono } from "hono";
import { connectToMongo } from "./lib/mongodb";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/current-date", async (c) => {
  try {
    const db = await connectToMongo();
    const date = new Date();

    await db.collection("dates").insertOne({
      timestamp: date,
    });

    return c.json({
      date: date.toISOString(),
      stored: true,
    });
  } catch (error) {
    return c.json({ error: "Database error" }, 500);
  }
});

export default app;
