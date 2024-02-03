"use client";

import { ReceivedChatMessage } from "@livekit/components-react";
import ChatMessage from "./chat-message";

export interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export default function ChatList({ messages, isHidden }: ChatListProps) {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="empty-message flex justify-center items-center h-full">
        <p className="text-sm text-muted-foreground font-semibold">
          {isHidden ? "Chat is disabled" : "Welcome to the chat!"}
        </p>
      </div>
    );
  }
  return (
    <div className="messages-list h-full flex flex-1 flex-col-reverse overflow-y-auto p-3">
      {messages.map((mess) => (
        <ChatMessage key={mess.timestamp} data={mess} />
      ))}
    </div>
  );
}
