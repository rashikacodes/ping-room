"use client";

import { ChatItem } from "@/types/message";

type MessageBubbleProps = {
  message: ChatItem;
  isMine: boolean;
};

export default function MessageBubble({
  message,
  isMine,
}: MessageBubbleProps) {
  if (message.type !== "message") return null;

  return (
    <div
  className={`mb-4 flex ${
    isMine ? "justify-end pr-4" : "justify-start pl-4"
  }`}
>
      <div
        className={`max-w-[60%] rounded-2xl px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
          isMine
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20"
            : "border border-white/10 bg-white/5 text-white backdrop-blur-xl"
        }`}
      >
        {/* Username */}

        {!isMine && (
          <p className="mb-1 text-xs font-semibold text-purple-300">
            {message.username}
          </p>
        )}

        {/* Message */}

        <p className="break-words text-[15px] leading-6">
          {message.message}
        </p>

        {/* Time */}

        <div
          className={`mt-2 flex ${
            isMine ? "justify-end" : "justify-end"
          }`}
        >
          <span
            className={`text-[11px] ${
              isMine
                ? "text-indigo-100/80"
                : "text-slate-400"
            }`}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}