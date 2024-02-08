"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SendIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import ChatInfo from "./chat-info";
import { CHAT_DELAY_TIME } from "./chat.config";
import { Skeleton } from "@/components/ui/skeleton";

export interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (text: string) => void;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
}

export default function ChatForm({
  onSubmit,
  value,
  onChange,
  isHidden,
  isFollowersOnly,
  isFollowing,
  isDelayed,
}: ChatFormProps) {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);
  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isFollowersOnlyAndNotFollowing || isDelayBlocked;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDisabled && isDelayed) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, CHAT_DELAY_TIME);
    } else {
      onSubmit();
    }
  };

  if (isHidden) return null;

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <ChatInfo isChatFollowersOnly={isFollowersOnly} isDelayed={isDelayed} />
      <div className="w-full flex flex-row">
        <Input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder="Send a message..."
          disabled={isDisabled || isDelayBlocked}
          className={cn(
            "border-white/10 border-r-0 rounded-r-none focus-visible:ring-transparent"
          )}
        />
        <Button
          className="flex justify-center items-center border-l-0 w-[55px] rounded-l-none"
          size={"icon"}
          variant={"default"}
          disabled={isDisabled || isDelayBlocked}
          type="submit"
        >
          <SendIcon size={"16"} />
        </Button>
      </div>
    </form>
  );
}

export const ChatFormSkeleton = () => {
  return (
    <div className="p-3">
      <Skeleton className="w-full h-6" />
    </div>
  );
};
