"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";
import HomeCard from "@/components/home/HomeCard";
import Hero from "@/components/home/Hero";
import ChatPreview from "@/components/home/ChatPreview";

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
  <>
    <Hero>
      <HomeCard
        mode={mode}
        setMode={setMode}
        username={username}
        setUsername={setUsername}
        roomCode={roomCode}
        setRoomCode={setRoomCode}
        error={error}
        onAction={
          mode === "create"
            ? handleCreateRoom
            : handleJoinRoom
        }
      />
    </Hero>
  </>
);
}