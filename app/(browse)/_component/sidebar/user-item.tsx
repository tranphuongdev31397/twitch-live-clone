import BadgeLive from "@/components/client/badge-live";
import {
  UserAvatar,
  UserAvatarSkeleton,
} from "@/components/client/user-avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

export default function UserItem({
  username,
  imageUrl,
  isLive = false,
}: UserItemProps) {
  const pathname = usePathname();

  const href = `/${username}`;

  const isActive = href === pathname;
  const { collapsed } = useSidebar((state) => state);

  return (
    <Button
      variant={"ghost"}
      className={cn(
        "w-full h-12",
        collapsed ? "justify-start" : "justify-center",
        isActive && "bg-accent"
      )}
      asChild
    >
      <Link className="w-full h-12" href={href}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4",
            collapsed && "justify-center"
          )}
        >
          <UserAvatar
            username={username}
            imageUrl={imageUrl}
            isLive={isLive}
            showBadge
          />
          {!collapsed && <p className="truncate flex-1"> {username} </p>}
          {!collapsed && isLive && <BadgeLive className="ml-auto" />}
        </div>
      </Link>
    </Button>
  );
}

export function UserItemSkeleton() {
  return (
    <li
      className={cn("flex max-lg:justify-center items-center w-full gap-x-4")}
    >
      <UserAvatarSkeleton />
      <Skeleton className="max-lg:hidden h-6 w-full truncate flex-1" />
    </li>
  );
}
