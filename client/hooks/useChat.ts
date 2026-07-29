import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { ChatItem, Message } from "@/types/message";

export default function useChat(roomCode: string) {
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // Initial room info
  useEffect(() => {
    socket.emit("get-room-info", { roomCode });

    const handleRoomInfo = ({
      onlineUsers,
    }: {
      onlineUsers: string[];
    }) => {
      setOnlineUsers(onlineUsers);
    };

    socket.on("room-info", handleRoomInfo);

    return () => {
      socket.off("room-info", handleRoomInfo);
    };
  }, [roomCode]);

  // Receive chat messages
  useEffect(() => {
    const handleReceiveMessage = (payload: Message) => {
      setMessages((prev) => [
        ...prev,
        {
          ...payload,
          type: "message",
        },
      ]);
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, []);

  // Join / Leave
  useEffect(() => {
    const handleUserJoined = ({
      username,
      onlineUsers,
    }: {
      username: string;
      onlineUsers: string[];
    }) => {
      setOnlineUsers(onlineUsers);

      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          text: `${username} joined`,
          timestamp: Date.now(),
        },
      ]);
    };

    const handleUserLeft = ({
      username,
      onlineUsers,
    }: {
      username: string;
      onlineUsers: string[];
    }) => {
      setOnlineUsers(onlineUsers);

      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          text: `${username} left`,
          timestamp: Date.now(),
        },
      ]);
    };

    socket.on("user-joined", handleUserJoined);
    socket.on("user-left", handleUserLeft);

    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("user-left", handleUserLeft);
    };
  }, []);

  const sendMessage = (message: string) => {
    if (!message.trim()) return;

    socket.emit("send-message", {
      roomCode,
      message,
    });
  };

  return {
    messages,
    onlineUsers,
    sendMessage,
  };
}