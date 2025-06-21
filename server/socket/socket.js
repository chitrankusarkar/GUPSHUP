import dotenv from 'dotenv';
dotenv.config();
import { Server } from 'socket.io';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URI,
    credentials: true,
  },
});

const userSocketMap = {}; // { userId: socketId }

const getSocketId = (userId) => userSocketMap[userId];

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (!userId) return;

  userSocketMap[userId] = socket.id;
  io.emit("onlineUsers", Object.keys(userSocketMap));

  // Typing indicators
  socket.on("typing", ({ to }) => {
    const socketId = getSocketId(to);
    if (socketId) io.to(socketId).emit("userTyping", { from: userId });
  });

  socket.on("stopTyping", ({ to }) => {
    const socketId = getSocketId(to);
    if (socketId) io.to(socketId).emit("userStopTyping", { from: userId });
  });

  // Read status
  socket.on("messageRead", ({ messageId, readerId, senderId }) => {
    const senderSocket = getSocketId(senderId);
    if (senderSocket) {
      io.to(senderSocket).emit("messageRead", { messageId, readerId });
    }
  });

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server, getSocketId };
