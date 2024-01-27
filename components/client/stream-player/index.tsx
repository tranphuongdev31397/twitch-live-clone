"use client";
import { LIVEKIT_WS } from "@/configs/livekit";
import useViewerToken from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import Video from "./video";

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
  const { identity, name, token } = useViewerToken(user.id);
  if (!identity || !token || !name) {
    return <p>You cannot watch this live</p>;
  }
  return (
    <>
      <LiveKitRoom
        className="grid grid-cols-1  lg:gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full"
        token={token}
        serverUrl={LIVEKIT_WS}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>
      </LiveKitRoom>
    </>
  );
}
