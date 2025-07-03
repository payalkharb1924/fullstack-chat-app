import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"; // when we visit signup login etc we will take a call to this file
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import { server, app, io } from "./lib/socket.js";
import path from "path";

dotenv.config();
// const app = express(); // this is the default way to create an express app but not needed now because we are importing from socket.js
const port = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" })); // or "10mb" if needed
app.use(cookieParser());
// By default, Express doesn’t know how to read cookies sent by the client. cookie-parser parses the Cookie header and populates req.cookies with an object of all cookies.
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// This enables CORS (Cross-Origin Resource Sharing) for your Express backend — allowing your frontend running at http://localhost:5173 to access your backend running at http://localhost:5001.
// ✅ Explanation of each option:
// 🔹 origin: "http://localhost:5173"
// This allows only requests from your frontend (React/Vite app) at http://localhost:5173.
// Prevents requests from unknown origins (security).
// 🔹 credentials: true
// This allows cookies (like JWT or session cookies) and authorization headers to be included in requests.

// Required when you’re using withCredentials: true in Axios on the frontend.

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});
