type ModeToggleProps = {
  mode: "create" | "join";
  setMode: React.Dispatch<React.SetStateAction<"create" | "join">>;
};

export default function ModeToggle({
  mode,
  setMode,
}: ModeToggleProps) {
  return (
    <div className="relative flex rounded-2xl bg-white/5 p-1 border border-white/10">

      <button
        onClick={() => setMode("create")}
        className={`relative flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-300 ${
          mode === "create"
            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-600/30"
            : "text-slate-400 hover:text-white"
        }`}
      >
        ✨ Create
      </button>

      <button
        onClick={() => setMode("join")}
        className={`relative flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-300 ${
          mode === "join"
            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-600/30"
            : "text-slate-400 hover:text-white"
        }`}
      >
        🚪 Join
      </button>

    </div>
  );
}