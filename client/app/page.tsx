"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

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

    socket.emit("join-room", {
      username: username.trim(),
      roomCode: roomCode.trim().toUpperCase(),
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">

        <h1 className="text-5xl font-extrabold text-center text-white">
          PingRoom
        </h1>

        <p className="text-center text-gray-300 mt-2 mb-8">
          Create or Join a private chat room
        </p>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-xl bg-white/10 border border-white/20 p-3 text-white placeholder-gray-400 outline-none focus:border-indigo-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="text"
            placeholder="Room Code"
            className="w-full rounded-xl bg-white/10 border border-white/20 p-3 uppercase text-white placeholder-gray-400 outline-none focus:border-indigo-400"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          />

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <button
            onClick={handleCreateRoom}
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500"
          >
            🚀 Create Room
          </button>

          <button
            onClick={handleJoinRoom}
            className="w-full rounded-xl border border-indigo-400 py-3 font-semibold text-indigo-200 transition hover:bg-indigo-500 hover:text-white"
          >
            🔗 Join Room
          </button>

        </div>
      </div>
    </main>
  );
}