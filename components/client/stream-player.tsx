"use client";
import useViewerToken from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";

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
  return <div>Live now</div>;
}
