import { Server } from "socket.io";
import jwt from "jsonwebtoken";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  // 🔐 Socket auth
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.id);

    // Join live stream room
    socket.on("join_live_chat", (roomName) => {
      socket.join(roomName);
      console.log(`Joined chat room: ${roomName}`);
    });

    // Receive message
    socket.on("send_message", ({ roomName, message }) => {
      io.to(roomName).emit("receive_message", {
        userId: socket.user.id,
        username: socket.user.username,
        message,
        time: new Date(),
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
