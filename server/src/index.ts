import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

type RoomData = {
  users: Map<string, string>; 
};

const rooms = new Map<string, RoomData>();
function generateRoomCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let roomCode = "";

  for (let i = 0; i < 6; i++) {
    roomCode += chars[Math.floor(Math.random() * chars.length)];
  }

  return roomCode;
}

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

io.on("connection", (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

 socket.on("create-room", ({ username }: { username: string }) => {
    let roomCode = generateRoomCode();

    while (rooms.has(roomCode)) {
        roomCode = generateRoomCode();
    }

    const roomData: RoomData = {
        users: new Map(),
    };

    roomData.users.set(socket.id, username);

    rooms.set(roomCode, roomData);

    socket.join(roomCode);

    socket.emit("room-created", {
        roomCode,
    });
});

  socket.on( "join-room",({  username,roomCode, }: { username: string;  roomCode: string;}) => {
      roomCode = roomCode.trim().toUpperCase();
      const room = rooms.get(roomCode);

      if (!room) {
        socket.emit("room-error", {
          message: "Room not found",
        });
        return;
      }

      room.users.set(socket.id, username);

      socket.join(roomCode);

      socket.emit("room-joined", {
        roomCode,
      });

      console.log(`${username} joined room ${roomCode}`);
    }
  );

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);

    // Phase 6:
    // Remove the user from the room
    // Delete room if empty
  });
});

const PORT = 4000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
});