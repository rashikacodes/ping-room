type ActionButtonProps = {
  mode: "create" | "join";
  onClick: () => void;
};

export default function ActionButton({
  mode,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500"
    >
      {mode === "create" ? "🚀 Create Room" : "🔗 Join Room"}
    </button>
  );
}