import { Separator } from "@/components/ui/separator";
import { PencilIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import InfoModal from "./info-modal";
import { Skeleton } from "@/components/ui/skeleton";

export interface InfoStreamProps {
  viewerIdentity: string;
  hostIdentity: string;
  thumbnailUrl: string | null;
  streamTitle: string;
}

export default function InfoStream({
  viewerIdentity,
  hostIdentity,
  thumbnailUrl,
  streamTitle,
}: InfoStreamProps) {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = hostAsViewer === viewerIdentity;
  if (!isHost) return null;
  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md p-2 w-auto h-auto bg-teal-500">
            <PencilIcon size={"20"} />
          </div>
          <div>
            <h2 className="text-sm font-semibold lg:text-base capitalize">
              Edit your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize your visibility
            </p>
          </div>
          <div className="ml-auto">
            <InfoModal initialName={streamTitle} initialThumb={thumbnailUrl} />
          </div>
        </div>

        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Stream Title</h3>
            <p className="text-sm font-semibold">{streamTitle}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Thumbnail</h3>
            {thumbnailUrl && (
              <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                <Image
                  src={thumbnailUrl}
                  fill
                  alt={streamTitle}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const InfoStreamSkeleton = () => {
  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex  items-center gap-x-2.5 p-4">
          <Skeleton className="w-10 h-10 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />

            <Skeleton className="h-4 w-36" />
          </div>
          <Skeleton className="h-10 w-14 ml-auto" />
        </div>

        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Stream Title</h3>
            <Skeleton className="h-6 w-40" />
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Thumbnail</h3>

            <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
              <Skeleton className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
