"use client";

import { SendHorizontal, Smile, Paperclip } from "lucide-react";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

export default function ChatInput({
  value,
  onChange,
  onSend,
}: ChatInputProps) {
  return (
    <div className="border-t border-white/10 bg-[#0F0D1F]/80 backdrop-blur-xl px-6 py-5">

      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-1">


        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-white placeholder:text-slate-500 outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSend();
            }
          }}
        />

        {/* Send */}

        <button
          onClick={onSend}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/40"
        >
          <SendHorizontal size={18} />
          Send
        </button>

      </div>

    </div>
  );
}