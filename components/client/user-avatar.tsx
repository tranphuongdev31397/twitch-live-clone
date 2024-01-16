import { UserItemProps } from "@/app/(browse)/_component/sidebar/user-item";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import BadgeLive from "./badge-live";
import { useSidebar } from "@/store";
import { Skeleton } from "../ui/skeleton";

const avatarVariants = cva("", {
  variants: {
    size: {
      sm: "h-4 w-4",
      default: "h-8 w-8",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface UserAvatarProps extends UserItemProps {
  showBadge?: boolean;
  className?: string;
}

export function UserAvatar({
  username,
  imageUrl,
  isLive,
  showBadge,
  size,
  className,
}: UserAvatarProps & VariantProps<typeof avatarVariants>) {
  const showLive = showBadge && isLive;
  const { collapsed } = useSidebar((state) => state);
  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500  border border-background",
          avatarVariants({ size }),
          className
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>

      {showLive && collapsed && (
        <div
          className={cn(
            "absolute -bottom-1 translate-y-1/2 left-1/2 -translate-x-1/2"
          )}
        >
          <BadgeLive />
        </div>
      )}
    </div>
  );
}

export function UserAvatarSkeleton({
  size,
  className,
}: VariantProps<typeof avatarVariants> & { className?: string }) {
  return (
    <Skeleton
      className={cn("rounded-full", avatarVariants({ size }), className)}
    />
  );
}
