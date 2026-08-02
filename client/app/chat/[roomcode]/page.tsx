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
  <main className="relative h-screen overflow-hidden bg-[#0B0A17] flex flex-col">
    <div className="absolute inset-0 -z-10 overflow-hidden">

  <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-600/20 blur-[140px]" />

  <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-pink-500/15 blur-[140px]" />

</div>
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