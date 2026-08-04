import { Server, Socket } from "socket.io";

import {
  createRoom,
  getRoom,
  addUserToRoom,
  removeUserFromRoom,
  getOnlineUsers,
  isRoomEmpty,
  deleteRoom,
} from "../rooms/roomManager";

import {
  CreateRoomPayload,
  JoinRoomPayload,
  SendMessagePayload,
  GetRoomInfoPayload,
} from "../types";

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    // ---------------- CREATE ROOM ----------------

    socket.on("create-room", ({ username }: CreateRoomPayload) => {
      console.log("CREATE ROOM EVENT RECEIVED:", username);
      const roomCode = createRoom(username, socket.id);

      socket.join(roomCode);
      socket.data.roomCode = roomCode;

      socket.emit("room-created", {
        roomCode,
        onlineUsers: getOnlineUsers(roomCode),
      });
    });

    // ---------------- JOIN ROOM ----------------

    socket.on(
      "join-room",
      ({ username, roomCode }: JoinRoomPayload) => {
        const room = getRoom(roomCode);

        if (!room) {
          socket.emit("room-error", {
            message: "Room not found",
          });
          return;
        }

        addUserToRoom(roomCode, socket.id, username);

        socket.join(roomCode);
        socket.data.roomCode = roomCode;

        const onlineUsers = getOnlineUsers(roomCode);

        socket.to(roomCode).emit("user-joined", {
          username,
          onlineUsers,
        });

        socket.emit("room-joined", {
          roomCode,
          onlineUsers,
        });

        console.log(`${username} joined ${roomCode}`);
      }
    );

    // ---------------- SEND MESSAGE ----------------

    socket.on(
      "send-message",
      ({ roomCode, message }: SendMessagePayload) => {
        const room = getRoom(roomCode);

        if (!room) return;

        const username = room.users.get(socket.id);

        if (!username) return;

        io.to(roomCode).emit("receive-message", {
          username,
          message,
          timestamp: Date.now(),
        });
      }
    );

    // ---------------- ROOM INFO ----------------

    socket.on(
      "get-room-info",
      ({ roomCode }: GetRoomInfoPayload) => {
        const room = getRoom(roomCode);

        if (!room) return;

        socket.emit("room-info", {
          onlineUsers: getOnlineUsers(roomCode),
        });
      }
    );

    // ---------------- DISCONNECT ----------------

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);

      const roomCode = socket.data.roomCode;

      if (!roomCode) return;

      const username = removeUserFromRoom(
        roomCode,
        socket.id
      );

      if (!username) return;

      if (isRoomEmpty(roomCode)) {
        deleteRoom(roomCode);

        console.log(`🗑️ Room ${roomCode} deleted`);
      } else {
        socket.to(roomCode).emit("user-left", {
          username,
          onlineUsers: getOnlineUsers(roomCode),
        });
      }
    });
  });
}