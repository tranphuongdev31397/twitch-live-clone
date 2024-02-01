"use client";

import { useMemo } from "react";
import { CHAT_DELAY_TIME } from "./chat.config";
import Hint from "../../hint";
import { Alert } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export interface ChatInfoProps {
  isDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export default function ChatInfo({
  isDelayed,
  isChatFollowersOnly,
}: ChatInfoProps) {
  let hint = useMemo(() => {
    if (isChatFollowersOnly && !isDelayed) {
      return "Only followers can chat";
    }
    if (isDelayed && !isChatFollowersOnly) {
      return `Messages are delayed by ${CHAT_DELAY_TIME / 1000} seconds`;
    }

    if (isDelayed && isChatFollowersOnly) {
      return `Only followers can chat. Messages are delayed by ${
        CHAT_DELAY_TIME / 1000
      } seconds`;
    }

    return "";
  }, [isDelayed, isChatFollowersOnly]);

  let label = useMemo(() => {
    if (isChatFollowersOnly && !isDelayed) {
      return "Followers only";
    }
    if (isDelayed && !isChatFollowersOnly) {
      return `Slow mode`;
    }

    if (isDelayed && isChatFollowersOnly) {
      return `Followers only and slow mode`;
    }

    return "";
  }, [isDelayed, isChatFollowersOnly]);

  if (!isDelayed && !isChatFollowersOnly) return;
  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint} asChild>
        <InfoIcon size={16} />
      </Hint>
      <p className="font-semibold text-xs">{label}</p>
    </div>
  );
}
