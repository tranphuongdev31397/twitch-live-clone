import * as React from "react";
import { StreamFeed } from "../../(home)/interface";
import Thumbnail from "@/components/client/thumbnail";
import { UserAvatar } from "@/components/client/user-avatar";
import { formatDistanceToNow } from "date-fns";

export interface SearchFeedProps {
  feed: StreamFeed;
}

export default function SearchFeed({ feed }: SearchFeedProps) {
  const { isLive, name, thumbnailUrl, user, updatedAt } = feed;
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
      <Thumbnail
        fallback={
          <UserAvatar imageUrl={user.imageUrl} username={user.username} />
        }
        className="w-full sm:w-[16rem] flex-shrink-0"
        isLive={isLive}
        src={thumbnailUrl}
      />
      <div className="space-y-1 truncate w-full">
        <p className="text-sm sm:text-lg truncate font-semibold">
          {user.username}
        </p>
        <p className="text-teal-600 text-xs sm:text-sm truncate font-semibold">
          {name}
        </p>
        {updatedAt && (
          <p className="text-muted-foreground text-xs sm:text-sm truncate font-semibold">
            {formatDistanceToNow(new Date(updatedAt), {
              addSuffix: true,
            })}
          </p>
        )}
      </div>
    </div>
  );
}
