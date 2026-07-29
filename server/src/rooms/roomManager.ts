import { RoomData } from "../types";

const rooms = new Map<string, RoomData>();

function generateRoomCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let roomCode = "";
  for (let i = 0; i < 6; i++) {
    roomCode += chars[Math.floor(Math.random() * chars.length)];
  }
  return roomCode;
}

export function createRoom(username: string, socketId: string): string {
  let roomCode = generateRoomCode();
  while (rooms.has(roomCode)) {
    roomCode = generateRoomCode();
  }

  const roomData: RoomData = { users: new Map() };
  roomData.users.set(socketId, username);
  rooms.set(roomCode, roomData);

  return roomCode;
}

export function getRoom(roomCode: string): RoomData | undefined {
  return rooms.get(roomCode.trim().toUpperCase());
}

export function addUserToRoom(roomCode: string, socketId: string, username: string): void {
  const room = getRoom(roomCode);
  if (!room) return;
  room.users.set(socketId, username);
}

export function removeUserFromRoom(roomCode: string, socketId: string): string | undefined {
  const room = getRoom(roomCode);
  if (!room) return undefined;

  const username = room.users.get(socketId);
  room.users.delete(socketId);

  return username;
}

export function getOnlineUsers(roomCode: string): string[] {
  const room = getRoom(roomCode);
  if (!room) return [];
  return Array.from(room.users.values());
}

export function isRoomEmpty(roomCode: string): boolean {
  const room = getRoom(roomCode);
  return !room || room.users.size === 0;
}

export function deleteRoom(roomCode: string): void {
  rooms.delete(roomCode.trim().toUpperCase());
}