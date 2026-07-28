"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"create" | "join">("create");

  useEffect(() => {
    const handleRoomCreated = ({ roomCode }: { roomCode: string }) => {
      router.push(`/chat/${roomCode}`);
    };

    const handleRoomJoined = ({ roomCode }: { roomCode: string }) => {
      router.push(`/chat/${roomCode}`);
    };

    const handleRoomError = ({ message }: { message: string }) => {
      setError(message);
    };

    socket.on("room-created", handleRoomCreated);
    socket.on("room-joined", handleRoomJoined);
    socket.on("room-error", handleRoomError);

    return () => {
      socket.off("room-created", handleRoomCreated);
      socket.off("room-joined", handleRoomJoined);
      socket.off("room-error", handleRoomError);
    };
  }, [router]);

  const handleCreateRoom = () => {
    if (!username.trim()) {
      setError("Enter your username");
      return;
    }

    setError("");
    
    if (!socket.connected) socket.connect();
    sessionStorage.setItem("username", username.trim());
    socket.emit("create-room", {
      username: username.trim(),
    });
  };

  const handleJoinRoom = () => {
    if (!username.trim() || !roomCode.trim()) {
      setError("Fill all fields");
      return;
    }

    setError("");

    if (!socket.connected) socket.connect();
      sessionStorage.setItem("username", username.trim());
    socket.emit("join-room", {
      username: username.trim(),
      roomCode: roomCode.trim().toUpperCase(),
    });
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">

        <h1 className="text-5xl font-extrabold text-center text-white">
          PingRoom
        </h1>

        <p className="text-center text-gray-300 mt-2 mb-8">
          Create or Join a private chat room
        </p>

        <div className="space-y-5">

  {/* Mode toggle */}
 <div className="flex rounded-xl overflow-hidden border border-white/20">
  <button
    onClick={() => setMode("create")}
    className={`flex-1 py-2 font-semibold transition ${
      mode === "create" ? "bg-indigo-600 text-white" : "bg-white/5 text-gray-300"
    }`}
  >
    Create
  </button>
  <button
    onClick={() => setMode("join")}
    className={`flex-1 py-2 font-semibold transition ${
      mode === "join" ? "bg-indigo-600 text-white" : "bg-white/5 text-gray-300"
    }`}
  >
    Join
  </button>
</div>

  <input
    type="text"
    placeholder="Your Name"
    className="w-full rounded-xl bg-white/10 border border-white/20 p-3 text-white placeholder-gray-400 outline-none focus:border-indigo-400"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />

  {/* Room code only shows in Join mode */}
  {mode === "join" && (
    <input
      type="text"
      placeholder="Room Code"
      className="w-full rounded-xl bg-white/10 border border-white/20 p-3 uppercase text-white placeholder-gray-400 outline-none focus:border-indigo-400"
      value={roomCode}
      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
    />
  )}

  {error && (
    <p className="text-red-400 text-sm text-center">
      {error}
    </p>
  )}

  <button
    onClick={mode === "create" ? handleCreateRoom : handleJoinRoom}
    className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500"
  >
    {mode === "create" ? "🚀 Create Room" : "🔗 Join Room"}
  </button>

</div>
      </div>
    </main>
  );
}