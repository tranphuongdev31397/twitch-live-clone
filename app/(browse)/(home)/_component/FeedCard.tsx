import * as React from "react";
import { StreamFeed } from "../interface";
import Link from "next/link";
import { UserAvatar } from "@/components/client/user-avatar";
import Thumbnail from "@/components/client/thumbnail";

export interface FeedCardProps {
  stream: StreamFeed;
}

export default function FeedCard({ stream }: FeedCardProps) {
  const { isLive, name, thumbnailUrl, user } = stream;
  return (
    <Link href={`/${stream.user.username}`}>
      <div className="h-full w-full space-y-2 group">
        <Thumbnail
          src={thumbnailUrl}
          isLive={isLive}
          fallback={
            <UserAvatar imageUrl={user.imageUrl} username={user.username} />
          }
        />
        <div className="flex flex-row p-2 gap-x-4 w-full truncate">
          <UserAvatar
            isLive={isLive}
            imageUrl={user.imageUrl}
            username={user.username}
            className="self-baseline"
          />
          <div className="max-w-full w-full flex-1 truncate">
            <p className="text-sm font-semibold truncate">{name}</p>
            <p className="text-xs text-muted-foreground">{user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
