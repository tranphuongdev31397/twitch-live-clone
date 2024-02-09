"use client";
import * as React from "react";
import { StreamFeed } from "../interface";
import Link from "next/link";
import {
  UserAvatar,
  UserAvatarSkeleton,
} from "@/components/client/user-avatar";
import Thumbnail, { ThumbnailSekeleton } from "@/components/client/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";

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

export const FeedCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-2 group">
      <ThumbnailSekeleton />
      <div className="flex flex-row p-2 gap-x-4 w-full truncate">
        <UserAvatarSkeleton />
        <div className="max-w-full w-full flex-1 space-y-1 truncate">
          <Skeleton className="rounded-none h-6 w-40" />
          <Skeleton className="rounded-none h-4 w-20" />
        </div>
      </div>
    </div>
  );
};
