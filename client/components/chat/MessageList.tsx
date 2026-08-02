"use client";

import { useEffect, useRef } from "react";
import { ChatItem } from "@/types/message";
import MessageBubble from "./MessageBubble";
import SystemMessage from "./SystemMessage";

type MessageListProps = {
  messages: ChatItem[];
  myUsername: string;
};

export default function MessageList({
  messages,
  myUsername,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="relative flex-1 overflow-y-auto px-8 py-8">

      {/* Background Glow */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute top-20 left-1/3 h-72 w-72 rounded-full bg-purple-600/10 blur-[120px]" />

        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-pink-500/10 blur-[120px]" />

      </div>

      {/* Empty State */}

      {messages.length === 0 && (
        <div className="mt-28 flex flex-col items-center">

          <div className="text-7xl">💬</div>

          <h2 className="mt-6 text-3xl font-bold text-white">
            Start the conversation
          </h2>

          <p className="mt-3 text-slate-400">
            Send your first message.
          </p>

        </div>
      )}

      {/* Messages */}

      <div className="relative z-10 w-full">

        {messages.map((item, index) => {
          if (item.type === "system") {
            return (
              <SystemMessage
                key={index}
                text={item.text}
              />
            );
          }

          return (
            <MessageBubble
              key={index}
              message={item}
              isMine={item.username === myUsername}
            />
          );
        })}

        <div ref={bottomRef} />

      </div>

    </div>
  );
}