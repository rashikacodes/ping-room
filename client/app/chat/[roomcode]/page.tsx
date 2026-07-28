"use client";
import { use, useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { ChatItem,Message } from "@/types/message";

export default function ChatRoom({params,}: {params: Promise<{ roomCode: string }>;
}) {
  const { roomCode } = use(params);
  const [messages,setMessages]= useState<ChatItem[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [myUsername, setMyUsername] = useState("");
  
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

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <div className="border-b border-slate-800 p-5">
        <h1 className="text-3xl font-bold text-white">
          PingRoom
        </h1>
      <div className="flex items-center gap-3 mt-2">
  <span className="text-slate-400">
    Room:
  </span>

  <span className="font-semibold text-indigo-400 bg-slate-900 px-3 py-1 rounded-lg">
    {roomCode}
  </span>

  <button
    onClick={() => {
      navigator.clipboard.writeText(roomCode);
      alert("Room code copied!");
    }}
    className="text-sm white hover:bg-indigo-500 px-1 py-1 rounded-lg"
  >
    Copy
  </button>
</div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {messages.length === 0 && (
          <p className="text-center text-slate-500 mt-20">
            No messages yet...
          </p>
        )}

      {messages.map((item, index) => {
        if (item.type === "system") {
          return (
            <div key={index} className="text-center text-slate-500 text-sm italic">
              {item.text}
            </div>
          );
        }

  // TypeScript now knows item is the Message variant here
  const isMine = item.username === myUsername;
  return (
    <div key={index} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className={`rounded-xl p-4 max-w-[70%] ${
        isMine ? "bg-indigo-600" : "bg-slate-900 border border-slate-700"
      }`}>
        <div className="flex justify-between items-center gap-4">
          <span className="font-semibold text-indigo-200">{item.username}</span>
          <span className="text-xs text-slate-300">
            {new Date(item.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <p className="text-white mt-2">{item.message}</p>
      </div>
    </div>
  );
})}

      </div>

      <div className="border-t border-slate-800 p-4 flex gap-3">

        <input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white outline-none focus:border-indigo-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />

        <button
          onClick={handleSendMessage}
          className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-500 transition"
        >
          Send
        </button>

      </div>

    </main>
  );
}