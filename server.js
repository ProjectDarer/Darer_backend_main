import express from "express";
import http from "http";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import process from "process";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

// ==========================
// ENV SETUP
// ==========================
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env",
});

const app = express();
const PORT = process.env.PORT || 8080;

// Resolve __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================
// CORE MIDDLEWARE
// ==========================
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
    credentials: true,
  })
);

// ==========================
// ROUTES
// ==========================
import signupRoute from "./backend/api/auth/signup.js";
import loginRoute from "./backend/api/auth/login.js";
import startLiveRoute from "./backend/api/live_streams/go_live.js";
import LogoutRoute from "./backend/api/auth/logout.js";
import { authMiddleware } from "./middleware/auth.js";
import update_profile from "./backend/api/user_profile/updateProfile.js";
import get_profile_data from "./backend/api/user_profile/get_profiledata.js";

app.use("/api/signup", authMiddleware, signupRoute);
app.use("/api/login", authMiddleware, loginRoute);
app.use("/api/start_live", authMiddleware, startLiveRoute);
app.use("/api/logout", authMiddleware, LogoutRoute);
app.use("/api/update_profile", authMiddleware, update_profile);
app.use("/api/get_profile_data", authMiddleware, get_profile_data);

// ==========================
// HEALTH CHECK
// ==========================
app.get("/api/health", (_req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  const state = states[mongoose.connection.readyState] || "unknown";

  res.json({
    dbState: state,
    nodeEnv: process.env.NODE_ENV || "development",
  });
});

// ==========================
// HTTP SERVER (IMPORTANT)
// ==========================
const server = http.createServer(app);

// ==========================
// SOCKET.IO SETUP
// ==========================
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
    credentials: true,
  },
});

// 🔐 SOCKET AUTH
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) return next(new Error("Unauthorized"));

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});

// 🔥 SOCKET EVENTS
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.user.username);

  socket.on("join_live_chat", (roomName) => {
    socket.join(roomName);
  });

  socket.on("send_message", ({ roomName, message }) => {
    io.to(roomName).emit("receive_message", {
      username: socket.user.username,
      message,
    });
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected");
  });
});

// ==========================
// SERVE FRONTEND (PROD)
// ==========================
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "dist");
  app.use(express.static(distPath));

  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// ==========================
// 404 HANDLER
// ==========================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ==========================
// ERROR HANDLER
// ==========================
app.use((err, req, res, next) => {
  console.error("Error:", err);

  res.status(err.status || 500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Server error"
        : err.message,
  });
});

// ==========================
// START SERVER + DB
// ==========================
async function startServer() {
  if (!process.env.MONGO_URI) {
    console.error("❌ Missing MONGO_URI");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log("✅ Connected to MongoDB");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

startServer();
