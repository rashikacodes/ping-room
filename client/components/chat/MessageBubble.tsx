import { Message } from "@/types/message";

type MessageBubbleProps = {
  message: Message;
  isMine: boolean;
};

export default function MessageBubble({
  message,
  isMine,
}: MessageBubbleProps) {
  return (
    <div
      className={`flex ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`rounded-xl p-4 max-w-[70%] ${
          isMine
            ? "bg-indigo-600"
            : "bg-slate-900 border border-slate-700"
        }`}
      >
        <div className="flex justify-between items-center gap-4">
          <span className="font-semibold text-indigo-200">
            {message.username}
          </span>

          <span className="text-xs text-slate-300">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>

        <p className="text-white mt-2">
          {message.message}
        </p>
      </div>
    </div>
  );
}