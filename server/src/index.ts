import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

import { registerSocketHandlers } from "./socket/socketHandler";

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
     origin: [
      "http://localhost:3000",
      "https://ping-room-lac.vercel.app/",
    ],
    methods: ["GET", "POST"],
  },
});

// Register all Socket.IO events
registerSocketHandlers(io);

const PORT =  process.env.PORT ||4000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
});