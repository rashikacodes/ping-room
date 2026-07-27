"use client";
import { use } from "react";

export default function ChatRoom({
  params,
}: {
  params: Promise<{ roomcode: string }>;
}) {
  const { roomcode } = use(params);
  return <div className="text-white p-8">You're in room: {roomcode}</div>;
}