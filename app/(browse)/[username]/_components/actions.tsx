"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import Hint from "@/components/client/hint";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { Fragment, useTransition } from "react";
import { toast } from "sonner";

export interface ActionsProps {
  isFollowing: boolean;
  isBlocked: boolean;
  userId: string;
}

export default function Actions({
  isFollowing,
  isBlocked,
  userId,
}: ActionsProps) {
  const labelFollow = isFollowing ? "Unfollow" : "Follow";
  const labelBlockUser = isBlocked ? "Unblock" : "Block";

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

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((res) => toast.success(`Blocked ${res.blocked.username}`))
        .catch((error) => toast.error(error.message));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((res) => toast.success(`Unblocked ${res.blocked.username}`))
        .catch((error) => toast.error(error.message));
    });
  };

  const handleOnClick = (type: "follow" | "block") => {
    switch (type) {
      case "follow":
        if (isFollowing) {
          handleUnFollow();
        } else {
          handleFollow();
        }
        break;
      case "block":
        if (isBlocked) {
          handleUnblock();
        } else {
          handleBlock();
        }
        break;

      default:
        break;
    }
  };

  if (!user) {
    return null;
  }

  const ElementWrapper = user.username === username ? Hint : Fragment;

  return (
    <>
      <ElementWrapper
        side="bottom"
        label={"Can't follow yourself"}
        className="w-full"
      >
        <Button
          className="font-semibold text-xs w-full"
          onClick={() => handleOnClick("follow")}
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
      <ElementWrapper
        side="bottom"
        label={"Can't block yourself"}
        className="w-full"
      >
        <Button
          className="font-semibold text-xs w-full"
          onClick={() => handleOnClick("block")}
          loading={isPending}
          iconSize={"lucide"}
          disabled={user.username === username}
          iconProps={{
            size: 16,
          }}
          variant={"destructive"}
        >
          {labelBlockUser}
        </Button>
      </ElementWrapper>
    </>
  );
}
