import { ChatItem } from "@/types/message";
import MessageBubble from "./MessageBubble";
import SystemMessage from "./SystemMessage";

type MessageListProps = {
  messages: ChatItem[];
  myUsername: string;
};

export default function MessageList({
  messages,
  myUsername,
}: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.length === 0 && (
        <p className="text-center text-slate-500 mt-20">
          No messages yet...
        </p>
      )}

      {messages.map((item, index) => {
        if (item.type === "system") {
          return (
            <SystemMessage
              key={index}
              text={item.text}
            />
          );
        }

        return (
          <MessageBubble
            key={index}
            message={item}
            isMine={item.username === myUsername}
          />
        );
      })}
    </div>
  );
}