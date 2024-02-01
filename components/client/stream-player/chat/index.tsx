"use client";
import { BREAKPOINTS } from "@/configs/breakpoint";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import ChatHeader from "./chat-header";
import ChatForm from "./chat-form";

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
      <div className="flex-1 overflow-auto h-[1000px]">
        <div className="h-[1000px]"></div>
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
    </div>
  );
}
