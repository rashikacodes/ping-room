import ModeToggle from "./ModeToggle";
import UsernameInput from "./UsernameInput";
import RoomCodeInput from "./RoomCodeInput";
import ActionButton from "./ActionButton";

type HomeCardProps = {
  mode: "create" | "join";
  setMode: React.Dispatch<React.SetStateAction<"create" | "join">>;

  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;

  roomCode: string;
  setRoomCode: React.Dispatch<React.SetStateAction<string>>;

  error: string;

  onAction: () => void;
};

export default function HomeCard({
  mode,
  setMode,
  username,
  setUsername,
  roomCode,
  setRoomCode,
  error,
  onAction,
}: HomeCardProps) {
  return (
    <div className="w-full max-w-[380px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-[0_20px_80px_rgba(139,92,246,0.25)]">

     <div className="mb-8 text-center">

  {/* Logo */}

  <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 shadow-[0_0_45px_rgba(168,85,247,0.45)]">

    <span className="text-4xl">💬</span>

    {/* Floating sparkle */}

    <span className="absolute -right-1 -top-1 text-lg animate-pulse">
      ✨
    </span>

  </div>

  <h2 className="text-4xl font-extrabold tracking-tight text-white">
    PingRoom
  </h2>

  <p className="mt-2 text-slate-400">
    Create a room and start chatting instantly.
  </p>

  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5">

    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

    <span className="text-xs font-medium text-emerald-300">
      Ready to chat
    </span>

  </div>

</div>

      <div className="space-y-5">

        <ModeToggle
          mode={mode}
          setMode={setMode}
        />

        <UsernameInput
          username={username}
          setUsername={setUsername}
        />

        {mode === "join" && (
          <RoomCodeInput
            roomCode={roomCode}
            setRoomCode={setRoomCode}
          />
        )}

        {error && (
          <p className="rounded-xl bg-red-500/10 py-2 text-center text-sm text-red-400">
            {error}
          </p>
        )}

        <ActionButton
          mode={mode}
          onClick={onAction}
        />

      </div>

    </div>
  );
}