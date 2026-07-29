type SidebarProps = {
  onlineUsers: string[];
  myUsername: string;
};

export default function Sidebar({
  onlineUsers,
  myUsername,
}: SidebarProps) {
  return (
    <div className="w-56 border-r border-slate-800 p-4 overflow-y-auto bg-slate-950">
      <h2 className="text-slate-400 text-sm font-semibold uppercase mb-4">
        Online ({onlineUsers.length})
      </h2>

      <ul className="space-y-3">
        {onlineUsers.map((user, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-white"
          >
            <span className="w-2 h-2 rounded-full bg-green-500"></span>

            <span
              className={
                user === myUsername
                  ? "font-semibold text-indigo-400"
                  : ""
              }
            >
              {user}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}