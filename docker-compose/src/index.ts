import { Hono } from "hono";
import { Client } from "pg";

const app = new Hono();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/check-db", async (c) => {
  try {
    const result = await client.query("SELECT NOW()");
    return c.json({
      message: "Database connection is successful!",
      date: result.rows[0],
    });
  } catch (error) {
    return c.text("Database connection failed!", 500);
  }
});

export default app;
