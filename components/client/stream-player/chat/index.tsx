"use client";
import { BREAKPOINTS } from "@/configs/breakpoint";
import { EVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import ChatHeader, { ChatHeaderSkeleton } from "./chat-header";
import ChatForm, { ChatFormSkeleton } from "./chat-form";
import ChatList from "./chat-list";
import ChatCommunity from "./chat-community";
import { Skeleton } from "@/components/ui/skeleton";

export interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export default function Chat({
  viewerName,
  hostName,
  hostIdentity,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) {
  const matches = useMediaQuery(BREAKPOINTS.MAX_LG);
  const { collapsed, variant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState<string>("");
  const { chatMessages, send, isSending } = useChat();

  const messageReversed = useMemo(() => {
    return chatMessages.sort((a, b) => b.timestamp - a.timestamp);
  }, [chatMessages]);

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const onSubmit = () => {
    if (!send) return;
    send(value);
    setValue("");
  };

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === EVariant.Chat && (
        <>
          <div className="flex-1 overflow-auto">
            <ChatList messages={messageReversed} isHidden={isHidden} />
          </div>
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={(text) => setValue(text)}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isFollowing={isFollowing}
            isDelayed={isChatDelayed}
          />
        </>
      )}
      {variant === EVariant.Community && (
        <ChatCommunity
          isHidden={isHidden}
          hostName={hostName}
          viewerName={viewerName}
        />
      )}
    </div>
  );
}

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeaderSkeleton />
      <div className="flex-1 flex justify-center items-center">
        <Skeleton className="h-4 w-3/5" />
      </div>
      <ChatFormSkeleton />
    </div>
  );
};
