"use client";
import { use } from "react";

export default function ChatRoom({
  params,
}: {
  params: Promise<{ roomCode: string }>;
}) {
  const { roomCode } = use(params);
  return <div className="text-white p-8">You're in room: {roomCode}</div>;
}