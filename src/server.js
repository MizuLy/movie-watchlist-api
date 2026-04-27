const express = require("express");
const { config } = require("dotenv");

const { connectDB, disconnectDB } = require("./config/db");

const movieRoutes = require("./routes/movie.routes");
const authRoutes = require("./routes/auth.routes");
const watchListRoutes = require("./routes/watchList.routes");

config();
connectDB();

const app = express();
const PORT = 6969;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchListRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`);
});

// This ONLY for Server Hosting
// COPY PASTE THIS TO AVOID LEAKING DATA WHEN DATABASE ERROR
// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
