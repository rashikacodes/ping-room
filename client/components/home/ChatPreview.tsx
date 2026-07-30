import { Send } from "lucide-react";

export default function ChatPreview() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">

      <h2 className="mb-10 text-center text-4xl font-bold text-white">
        See PingRoom in Action
      </h2>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">

          <div>
            <p className="font-semibold text-white">
              Room • AB12CD
            </p>

            <p className="text-sm text-emerald-400">
              ● 4 Online
            </p>
          </div>

        </div>

        {/* Messages */}

        <div className="space-y-5 p-6">

          <div className="flex gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 font-bold">
              A
            </div>

            <div className="rounded-2xl rounded-tl-none bg-white/10 px-4 py-3">
              <p className="text-sm font-semibold text-pink-300">
                Anshu
              </p>

              <p className="text-white">
                Hey everyone! 👋
              </p>
            </div>

          </div>

          <div className="flex justify-end">

            <div className="rounded-2xl rounded-tr-none bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3">

              <p className="text-sm font-semibold">
                You
              </p>

              <p>Hello 😊</p>

            </div>

          </div>

          <div className="flex gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 font-bold">
              P
            </div>

            <div className="rounded-2xl rounded-tl-none bg-white/10 px-4 py-3">

              <p className="text-sm font-semibold text-sky-300">
                Priya
              </p>

              <p>Ready to chat? 🚀</p>

            </div>

          </div>

          <p className="text-center text-sm italic text-emerald-400">
            Vikram joined the room
          </p>

        </div>

        {/* Input */}

        <div className="flex items-center gap-3 border-t border-white/10 p-5">

          <input
            disabled
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-white/10 px-5 py-3 outline-none"
          />

          <button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3">

            <Send size={18} />

          </button>

        </div>

      </div>

    </section>
  );
}