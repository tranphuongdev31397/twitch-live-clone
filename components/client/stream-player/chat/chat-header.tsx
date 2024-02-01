"use client";
import { EVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import ChatToggle from "./chat-toggle";

export interface ChatHeaderProps {}

export default function ChatHeader({}: ChatHeaderProps) {
  const { variant } = useChatSidebar((state) => state);

  const title = variant === EVariant.Chat ? "Stream Chat" : "Community";
  return (
    <div className="p-3 border-b relative">
      <div className="absolute left-2 top-2 lg:block hidden">
        <ChatToggle />
      </div>
      <p className="font-semibold text-center">{title}</p>
    </div>
  );
}
