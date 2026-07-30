"use client";

import { ReactNode } from "react";
import { ShieldCheck, Zap, Users } from "lucide-react";

interface HeroProps {
  children: ReactNode;
}

export default function Hero({ children }: HeroProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0B0A17] via-[#131126] to-[#090814]">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
       <div className="absolute -top-56 -left-44 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[170px]" />

<div className="absolute right-[-120px] top-24 h-[420px] w-[420px] rounded-full bg-pink-500/15 blur-[170px]" />

<div className="absolute bottom-[-180px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[170px]" />
      </div>

      <div className="mx-auto max-w-7xl px-8">

        {/* HERO */}

        <div className="grid min-h-screen items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <div className="inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
              ✨ Real-time • Private • No Sign-up
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white lg:text-6xl">
              Chat Instantly.
              <br />

              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Just You & Yours.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-xl leading-9 text-slate-400">
              Create private chat rooms in seconds.
              Share the room code with your friends
              and start chatting instantly.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <div className="flex items-center gap-2 rounded-full bg-white/5 px-5 py-3 text-sm text-white">
                <Zap size={18} className="text-yellow-400" />
                Instant
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white/5 px-5 py-3 text-sm text-white">
                <ShieldCheck
                  size={18}
                  className="text-emerald-400"
                />
                Private
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white/5 px-5 py-3 text-sm text-white">
                <Users
                  size={18}
                  className="text-sky-400"
                />
                No Sign-up
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex justify-center lg:justify-end">
            {children}
          </div>

        </div>

      </div>

    </main>
  );
}