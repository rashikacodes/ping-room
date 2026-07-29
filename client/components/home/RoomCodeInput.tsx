type RoomCodeInputProps = {
  roomCode: string;
  setRoomCode: React.Dispatch<React.SetStateAction<string>>;
};

export default function RoomCodeInput({
  roomCode,
  setRoomCode,
}: RoomCodeInputProps) {
  return (
    <input
      type="text"
      placeholder="Room Code"
      className="w-full rounded-xl bg-white/10 border border-white/20 p-3 uppercase text-white placeholder-gray-400 outline-none focus:border-indigo-400"
      value={roomCode}
      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
    />
  );
}