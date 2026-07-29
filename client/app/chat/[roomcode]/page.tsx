"use client";
import { use, useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { ChatItem,Message } from "@/types/message";
import Sidebar from "@/components/chat/Sidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";

export default function ChatRoom({params,}: {params: Promise<{ roomCode: string }>;
}) {
  const { roomCode } = use(params);
  const [messages,setMessages]= useState<ChatItem[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [myUsername, setMyUsername] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  useEffect(()=>{
    const handleReceiveMessage = (payload: Message) => {
       setMessages((prev) => [...prev, { ...payload, type: "message" }]);
    };
    socket.on("receive-message", handleReceiveMessage);
    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, []); 
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    socket.emit("send-message", {
      roomCode,
      message: messageInput,
    });

    setMessageInput("");
  };
  useEffect(() => {
  setMyUsername(sessionStorage.getItem("username") || "");
}, []);
 useEffect(() => {
  socket.emit("get-room-info", { roomCode });

  const handleRoomInfo = ({ onlineUsers }: { onlineUsers: string[] }) => {
    setOnlineUsers(onlineUsers);
  };

  socket.on("room-info", handleRoomInfo);

  return () => {
    socket.off("room-info", handleRoomInfo);
  };
}, [roomCode]);
  useEffect(() => {
  const handleUserJoined = ({ username, onlineUsers }: { username: string; onlineUsers: string[] }) => {
    setOnlineUsers(onlineUsers);
    setMessages((prev) => [
      ...prev,
      { type: "system", text: `${username} joined`, timestamp: Date.now() },
    ]);
  };
 
  const handleUserLeft = ({ username, onlineUsers }: { username: string; onlineUsers: string[] }) => {
    setOnlineUsers(onlineUsers);
    setMessages((prev) => [
      ...prev,
      { type: "system", text: `${username} left`, timestamp: Date.now() },
    ]);
  };

  socket.on("user-joined", handleUserJoined);
  socket.on("user-left", handleUserLeft);

  return () => {
    socket.off("user-joined", handleUserJoined);
    socket.off("user-left", handleUserLeft);
  };
}, []);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <ChatHeader roomCode={roomCode} />
      <div className="flex flex-1 overflow-hidden">

          {/* Sidebar */}
        <Sidebar
          onlineUsers={onlineUsers}
          myUsername={myUsername}
        />
        {/* Messages */}
       <MessageList
        messages={messages}
        myUsername={myUsername}
      />
      </div>

   <ChatInput
  value={messageInput}
  onChange={setMessageInput}
  onSend={handleSendMessage}
/>

    </main>
  );
}