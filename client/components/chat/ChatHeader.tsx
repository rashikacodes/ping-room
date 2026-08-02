"use client";

import { useState } from "react";
import { Copy, Check, Wifi } from "lucide-react";

type ChatHeaderProps = {
  roomCode: string;
};

export default function ChatHeader({ roomCode }: ChatHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(roomCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0F0D1F]/80 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Left */}

        <div>
          <h1 className="text-3xl font-bold text-white">
            💬 PingRoom
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Private Room • Real-time Chat
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Connected Badge */}

          <div className="hidden md:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">

            <Wifi
              size={16}
              className="text-emerald-400"
            />

            <span className="text-sm text-emerald-300">
              Connected
            </span>

          </div>

          {/* Room Code */}

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-lg">

            <p className="text-xs uppercase tracking-widest text-slate-500">
              Room
            </p>

            <p className="font-bold text-indigo-300">
              {roomCode}
            </p>

          </div>

          {/* Copy Button */}

       <button
  onClick={handleCopy}
  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white"
>
  {copied ? (
    <>
      <Check size={16} />
      Copied
    </>
  ) : (
    <>
      <Copy size={16} />
      Copy
    </>
  )}
</button>

        </div>

      </div>

    </header>
  );
}