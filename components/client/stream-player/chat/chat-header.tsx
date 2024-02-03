"use client";
import { EVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import ChatToggle from "./chat-toggle";
import ChatSwitch from "./chat-switch";
import { Skeleton } from "@/components/ui/skeleton";

export interface ChatHeaderProps {}

export default function ChatHeader({}: ChatHeaderProps) {
  const { variant } = useChatSidebar((state) => state);

  const title = variant === EVariant.Chat ? "Stream Chat" : "Community";
  return (
    <div className="p-3 border-b relative">
      <div className="absolute left-2  top-1/2 -translate-y-1/2 lg:block hidden">
        <ChatToggle />
      </div>
      <p className="font-semibold text-center">{title}</p>
      <div className="absolute right-2  top-1/2 -translate-y-1/2">
        <ChatSwitch />
      </div>
    </div>
  );
}

export const ChatHeaderSkeleton = () => {
  return (
    <div className="p-3 border-b text-center relative">
      <div className="absolute left-2  top-1/2 -translate-y-1/2 lg:block hidden">
        <Skeleton className="h-6 w-6 rounded-none" />
      </div>

      <div className="text-center mx-auto">
        <Skeleton className="h-6 w-20 mx-auto" />
      </div>

      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <Skeleton className="h-6 w-6 rounded-none" />
      </div>
    </div>
  );
};
