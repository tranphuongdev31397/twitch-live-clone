"use client";

import { onFollow, onUnFollow } from "@/actions/follow";
import Hint from "@/components/client/hint";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { Fragment, useTransition } from "react";
import { toast } from "sonner";

export interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export default function Actions({ isFollowing, userId }: ActionsProps) {
  const labelFollow = isFollowing ? "Unfollow" : "Follow";

  const [isPending, startTransition] = useTransition();

  const { user } = useUser();

  const { username } = useParams();
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

  if (!user) {
    return null;
  }

  const ElementWrapper = user.username === username ? Hint : Fragment;

  return (
    <ElementWrapper
      side="bottom"
      label={"Can't follow yourself"}
      className="w-full"
    >
      <Button
        className="font-semibold text-xs w-full"
        onClick={handleOnClick}
        loading={isPending}
        iconSize={"lucide"}
        disabled={user.username === username}
        iconProps={{
          size: 16,
        }}
      >
        {labelFollow}
      </Button>
    </ElementWrapper>
  );
}
