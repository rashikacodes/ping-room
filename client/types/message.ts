export type Message = {
  username: string;
  message: string;
  timestamp: number;
};

export type SystemMessage = {
  type: "system";
  text: string;
  timestamp: number;
};

export type ChatItem = 
  | (Message & { type: "message" })
  | SystemMessage;