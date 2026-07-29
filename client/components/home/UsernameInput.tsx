type UsernameInputProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

export default function UsernameInput({
  username,
  setUsername,
}: UsernameInputProps) {
  return (
    <input
      type="text"
      placeholder="Your Name"
      className="w-full rounded-xl bg-white/10 border border-white/20 p-3 text-white placeholder-gray-400 outline-none focus:border-indigo-400"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  );
}