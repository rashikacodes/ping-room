import { User } from "lucide-react";

type UsernameInputProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

export default function UsernameInput({
  username,
  setUsername,
}: UsernameInputProps) {
  return (
    <div className="space-y-2">


      <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-300 focus-within:border-purple-500/60 focus-within:bg-white/10">

        <User
          size={18}
          className="text-slate-500 transition-colors group-focus-within:text-purple-400"
        />

        <input
          type="text"
          placeholder="Enter your name..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-transparent text-white placeholder:text-slate-500 outline-none"
        />

      </div>

    </div>
  );
}