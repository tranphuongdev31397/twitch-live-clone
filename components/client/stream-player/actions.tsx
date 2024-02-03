"use client";

import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export interface ActionsProps {
  isFollowing: boolean;
  hostId: string;
  isHost: boolean;
}

export default function Actions({ isFollowing, isHost, hostId }: ActionsProps) {
  const [isPending, startTransition] = useTransition();
  const user = useAuth();
  const router = useRouter();
  const handleToggleFollow = () => {
    if (!user) return router.push("/sign-in");
    if (isHost) return;

    if (isFollowing) {
      onUnFollow(hostId)
        .then((res) => {
          toast.success(`Unfollowed ${res.following.username}`);
        })
        .catch((error: any) => {
          toast.error(error?.message ?? "Something went wrong");
        });
    } else {
      onFollow(hostId)
        .then((res) => {
          toast.success(`Following ${res.following.username}`);
        })
        .catch((error: any) => {
          toast.error(error?.message ?? "Something went wrong");
        });
    }
  };
  return (
    <Button
      className="group lg:w-auto w-full font-bold"
      onClick={() => {
        startTransition(() => {
          handleToggleFollow();
        });
      }}
      disabled={isPending || isHost}
    >
      <HeartIcon
        className={cn(
          "group-hover:fill-black group-hover:scale-110 transition-all",
          isFollowing ? "fill-black" : ""
        )}
        size={"16"}
      />
      <span>{isFollowing ? "Unfollow" : "Follow"}</span>
    </Button>
  );
}
