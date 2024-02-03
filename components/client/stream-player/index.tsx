"use client";
import { LIVEKIT_WS } from "@/configs/livekit";
import useViewerToken from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import Video, { VideoSkeleton } from "./video";
import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import Chat, { ChatSkeleton } from "./chat";
import ChatToggle from "./chat/chat-toggle";
import StreamHeader, { StreamHeaderSkeleton } from "./stream-header";

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
    return <StreamPlayerSkeleton />;
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
          <StreamHeader
            streamName={stream.name}
            hostIdentity={user.id}
            hostName={user.username}
            imageUrl={user.imageUrl}
            viewerIdentity={identity}
            isFollowing={isFollowing}
          />
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

export const StreamPlayerSkeleton = () => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 relative  lg:gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full transition-all"
      )}
    >
      <div className="relative space-y-4 pb-10 col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar">
        <VideoSkeleton />
        <StreamHeaderSkeleton />
      </div>
      <div className="col-span-1">
        <ChatSkeleton />
      </div>
    </div>
  );
};
