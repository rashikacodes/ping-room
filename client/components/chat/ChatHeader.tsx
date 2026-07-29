type ChatHeaderProps = {
  roomCode: string;
};

export default function ChatHeader({
  roomCode,
}: ChatHeaderProps) {
  return (
    <div className="border-b border-slate-800 p-5">
      <h1 className="text-3xl font-bold text-white">
        PingRoom
      </h1>

      <div className="flex items-center gap-3 mt-2">
        <span className="text-slate-400">
          Room:
        </span>

        <span className="font-semibold text-indigo-400 bg-slate-900 px-3 py-1 rounded-lg">
          {roomCode}
        </span>

        <button
          onClick={() => {
            navigator.clipboard.writeText(roomCode);
            alert("Room code copied!");
          }}
          className="text-sm hover:bg-indigo-500 px-2 py-1 rounded-lg text-white"
        >
          Copy
        </button>
      </div>
    </div>
  );
}