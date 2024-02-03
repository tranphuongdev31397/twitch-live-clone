"use client";

import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserAvatar, UserAvatarSkeleton } from "../user-avatar";
import { stringToHexColor } from "@/lib/utils";
import VerifiedMark from "../verified-mark";
import Actions from "./actions";
import { EyeIcon, ViewIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export interface StreamHeaderProps {
  hostIdentity: string;
  hostName: string;
  imageUrl: string;
  viewerIdentity: string;
  isFollowing: boolean;
  streamName: string;
}

export default function StreamHeader({
  hostIdentity,
  hostName,
  imageUrl,
  isFollowing,
  streamName,
  viewerIdentity,
}: StreamHeaderProps) {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);
  const isLive = !!participant;
  const viewersCount = participants.length - 1; // minus host
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;
  return (
    <div className="p-3 flex flex-row  justify-between items-baseline flex-wrap gap-y-4">
      <div className="flex flex-row gap-x-4 items-center">
        <UserAvatar
          username={hostName}
          imageUrl={imageUrl}
          showBadge
          isLive={isLive}
          size="lg"
        />
        <div className="space-y-1">
          <div className="flex flex-row items-center">
            <p className="font-semibold text-primary">{hostName}</p>
            <span className="ml-2">
              <VerifiedMark />
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{streamName}</p>
          <div className="flex items-center gap-x-2 text-emerald-300">
            <EyeIcon size={16} />
            <p className="font-semibold text-xs">{viewersCount} view(s)</p>
          </div>
        </div>
      </div>

      <Actions
        isFollowing={isFollowing}
        isHost={isHost}
        hostId={hostIdentity}
      />
    </div>
  );
}

export const StreamHeaderSkeleton = () => {
  return (
    <div className="p-3 flex flex-row  justify-between items-baseline flex-wrap gap-y-4">
      <div className="flex flex-row gap-x-4 items-center">
        <UserAvatarSkeleton size={"lg"} />
        <div className="space-y-1">
          <div className="flex flex-row items-center">
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-6 w-40" />

          <div className="flex items-center gap-x-2 text-emerald-300">
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>
      <Skeleton className="h-10 w-full lg:w-20" />
    </div>
  );
};
