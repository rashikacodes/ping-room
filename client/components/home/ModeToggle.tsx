type ModeToggleProps = {
  mode: "create" | "join";
  setMode: React.Dispatch<React.SetStateAction<"create" | "join">>;
};

export default function ModeToggle({
  mode,
  setMode,
}: ModeToggleProps) {
  return (
    <div className="flex rounded-xl overflow-hidden border border-white/20">
      <button
        onClick={() => setMode("create")}
        className={`flex-1 py-2 font-semibold transition ${
          mode === "create"
            ? "bg-indigo-600 text-white"
            : "bg-white/5 text-gray-300"
        }`}
      >
        Create
      </button>

      <button
        onClick={() => setMode("join")}
        className={`flex-1 py-2 font-semibold transition ${
          mode === "join"
            ? "bg-indigo-600 text-white"
            : "bg-white/5 text-gray-300"
        }`}
      >
        Join
      </button>
    </div>
  );
}