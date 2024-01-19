"use client";

import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { PanelsTopLeftIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export default function Actions({ isFollowing, userId }: ActionsProps) {
  const labelFollow = isFollowing ? "Unfollow" : "Follow";

  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((res) => toast.success(`Followed ${res.following.username}`))
        .catch((error) => toast.error(error.message));
    });
  };
  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then((res) => toast.success(`Unfollowed ${res.following.username}`))
        .catch((error) => toast.error(error.message));
    });
  };

  const handleOnClick = () => {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      className="font-semibold text-xs"
      onClick={handleOnClick}
      loading={isPending}
      iconSize={"lucide"}
      iconProps={{
        size: 16,
      }}
    >
      {labelFollow}
    </Button>
  );
}
