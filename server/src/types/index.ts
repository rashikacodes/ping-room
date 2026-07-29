export type RoomData = {
  users: Map<string, string>; // socketId -> username
};

export type CreateRoomPayload = {
  username: string;
};

export type JoinRoomPayload = {
  username: string;
  roomCode: string;
};

export type SendMessagePayload = {
  roomCode: string;
  message: string;
};

export type GetRoomInfoPayload = {
  roomCode: string;
};