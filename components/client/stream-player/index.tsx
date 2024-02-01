"use client";
import { LIVEKIT_WS } from "@/configs/livekit";
import useViewerToken from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import Video from "./video";
import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import Chat from "./chat";
import ChatToggle from "./chat/chat-toggle";

export interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing?: boolean;
}

export default function StreamPlayer({
  user,
  stream,
  isFollowing = false,
}: StreamPlayerProps) {
  const { collapsed } = useChatSidebar((state) => state);

  const { identity, name, token } = useViewerToken(user.id);

  if (!identity || !token || !name) {
    return <p>You cannot watch this live</p>;
  }

  return (
    <>
      {collapsed && (
        <div className="fixed top-[100px] right-2 z-[100] lg:block hidden">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        className={cn(
          "grid grid-cols-1 relative  lg:gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full transition-all",
          {
            "lg:grid-cols-2 2xl:grid-cols-2": collapsed,
          }
        )}
        token={token}
        serverUrl={LIVEKIT_WS}
      >
        <div className="relative space-y-4 pb-10 col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>
        <div
          className={cn("col-span-1", {
            hidden: collapsed,
          })}
        >
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
}
