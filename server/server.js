import express from "express";
import cors from "cors";
import http from "http";

import { Server } from "socket.io";

import documentRoutes from "./routes/documentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use("/api/documents", documentRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});