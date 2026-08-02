"use client";

import { Users, ShieldCheck } from "lucide-react";

type SidebarProps = {
  onlineUsers: string[];
  myUsername: string;
};

export default function Sidebar({
  onlineUsers,
  myUsername,
}: SidebarProps) {
  return (
    <aside className="hidden md:flex w-[250px] flex-col border-r border-white/10 bg-[#141327]/60 backdrop-blur-xl">

      {/* Header */}

      <div className="border-b border-white/10 px-5 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-purple-600/30">
            <Users className="text-white" size={18} />
          </div>

          <div>
            <h2 className="text-base font-bold text-white">
              Members
            </h2>

            <p className="text-xs text-slate-400">
              {onlineUsers.length} Online
            </p>
          </div>

        </div>

      </div>

      {/* Members */}

      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-4">

        {onlineUsers.map((user) => {
          const isMe = user === myUsername;

          return (
            <div
              key={user}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-2.5 transition-all duration-300 hover:border-purple-500/20 hover:bg-white/10"
            >
              <div className="flex items-center gap-3">

                {/* Avatar */}

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-sm font-bold text-white shadow-md">

                  {user.charAt(0).toUpperCase()}

                </div>

                <div>

                  <p
                    className={`text-sm font-semibold ${
                      isMe ? "text-purple-300" : "text-white"
                    }`}
                  >
                    {user}
                  </p>

                  <p className="text-xs text-slate-500">
                    {isMe ? "You" : "Online"}
                  </p>

                </div>

              </div>

              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#4ade80]" />
            </div>
          );
        })}

      </div>

      {/* Footer */}

      <div className="border-t border-white/10 p-4">

        <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 px-4 py-3">

          <ShieldCheck
            size={18}
            className="text-emerald-400"
          />

          <div>

            <p className="text-xs font-medium text-white">
              Private Room
            </p>

            <p className="text-xs text-slate-400">
              Messages stay inside this room
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}