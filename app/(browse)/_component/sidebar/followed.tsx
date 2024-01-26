"use client";
import Hint from "@/components/client/hint";
import { useSidebar } from "@/store";
import { Follow, Stream, User } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import UserItem, { UserItemSkeleton } from "./user-item";
import { Skeleton } from "@/components/ui/skeleton";

export interface FollowProps {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null;
    };
  })[];
}

export default function Follow({ data }: FollowProps) {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {showLabel ? (
        <p className="uppercase text-sm font-semibold truncate">Follow List</p>
      ) : (
        <Hint asChild label="Follow List" align="center" side="right">
          <HeartIcon className="text-muted-foreground ml-3" size={20} />
        </Hint>
      )}

      <ul className="space-y-2 py-4">
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            username={follow.following.username}
            isLive={follow.following.stream?.isLive}
            imageUrl={follow.following.imageUrl}
          />
        ))}
      </ul>
    </div>
  );
}

export function FollowSkeleton() {
  return (
    <div className="flex flex-col max-lg:items-center p-3">
      <Skeleton className="h-8 w-8 max-lg:rounded-md lg:w-48" />
      <ul className="space-y-2 py-2">
        {[...Array(3)].map((_, i) => (
          <UserItemSkeleton key={i} />
        ))}
      </ul>
    </div>
  );
}
