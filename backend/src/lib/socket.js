import { Server } from "socket.io";
import http from "http"; // inbuilt in node
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
} // this will return the socketId when we pass userId

// to store onlineUsers
const userSocketMap = {}; // {userId: socketId} this is a key value pair we will use here wher userId will come from database

// listen for incoming connections
io.on("connection", (socket) => {
  // this socket is the user that connected
  console.log("A user is connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // this is used to send events to all the connected clients and we can name it anything but i this case we put getOnlineUsers and the data we want to broadcast is the keys of online users
  // we will store the socketId in userSocketMap
  // this will help us to identify which user is connected
  // and we can send message to that user

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
