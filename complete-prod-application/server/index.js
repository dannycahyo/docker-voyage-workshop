const express = require("express");
const app = express();
const winston = require("winston");
const expressWinston = require("express-winston");
const { Pool } = require("pg");
require("dotenv").config();

// Database configuration
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: "my-postgres-db",
  port: 5432,
});

// Middleware
app.use(express.json());
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  }),
);

const handleHealthCheck = (_, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "Server is running" });
};

const handleHello = (_, res) => {
  res.status(200).json({ message: "hello world" });
};

const handleBye = (_, res) => {
  res.status(200).json({ message: "bye world" });
};

const handleDBCheck = async (_, res, next) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({
      status: "Connected to database",
      currentTime: result.rows[0].now,
    });
  } catch (error) {
    next(error);
  }
};

// Routes
app.get("/health", handleHealthCheck);
app.get("/hello", handleHello);
app.get("/bye", handleBye);
app.get("/db-check", handleDBCheck);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
