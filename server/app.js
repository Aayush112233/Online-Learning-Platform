import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDb from "./config/connectDb.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import messageRoutes from "./routes/MessageRoutes.js";
import TeacherRoutes from "./routes/TeacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js"

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

//CoRS Policy
app.use(cors());

//Database
connectDb(DATABASE_URL);

//JSON
app.use(express.json());

//Load Routes
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/student", studentRoutes);

//for chat
app.use("/api/messages", messageRoutes);

//Teacher
app.use("/api/teacher", TeacherRoutes);

// Real-time chat functionality
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on("add-user", (userId) => {
    console.log(`User ${userId} connected to socket ${socket.id}`);
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      console.log(
        `Sending message from ${data.from} to ${data.to}: ${data.msg}`
      );
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        console.log(`User ${key} disconnected`);
        onlineUsers.delete(key);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
