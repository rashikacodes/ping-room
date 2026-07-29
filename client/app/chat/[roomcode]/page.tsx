"use client";
import { use, useState } from "react";
import Sidebar from "@/components/chat/Sidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";
import useUsername from "@/hooks/useUsername";
import useChat from "@/hooks/useChat";

export default function ChatRoom({params,}: {params: Promise<{ roomCode: string }>;
}) {
  const { roomCode } = use(params);
  const [messageInput, setMessageInput] = useState("");
  const myUsername = useUsername();
  const {
    messages,
    onlineUsers,
    sendMessage,
  } = useChat(roomCode);
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    sendMessage(messageInput);
    setMessageInput("");
  };
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