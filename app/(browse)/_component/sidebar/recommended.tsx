"use client";
import Hint from "@/components/client/hint";
import { useSidebar } from "@/store";
import { User } from "@prisma/client";
import { VideoIcon } from "lucide-react";
import UserItem, { UserItemSkeleton } from "./user-item";
import { Skeleton } from "@/components/ui/skeleton";

export interface RecommendedProps {
  data: User[];
}

export default function Recommended({ data }: RecommendedProps) {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div className="flex flex-col">
      {showLabel ? (
        <p className="uppercase text-sm font-semibold truncate">
          Recommended List
        </p>
      ) : (
        <Hint asChild label="Recommended List" align="center" side="right">
          <VideoIcon className="text-muted-foreground ml-3" size={20} />
        </Hint>
      )}

      <ul className="space-y-2 py-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            isLive={true}
            imageUrl={user.imageUrl}
          />
        ))}
      </ul>
    </div>
  );
}

export function RecommendSkeleton() {
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
