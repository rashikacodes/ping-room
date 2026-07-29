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
    <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">
      <h1 className="text-5xl font-extrabold text-center text-white">
        PingRoom
      </h1>

      <p className="text-center text-gray-300 mt-2 mb-8">
        Create or Join a private chat room
      </p>

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
          <p className="text-red-400 text-sm text-center">
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