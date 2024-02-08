"use client";

import { cn, generateRandomSymmetricalColorByTheme } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ReactNode } from "react";
import BadgeLive from "./badge-live";
import { Skeleton } from "../ui/skeleton";

export interface ThumbnailProps {
  src?: string | null;
  fallback?: ReactNode;
  className?: string;
  isLive?: boolean;
}

export default function Thumbnail({
  src,
  fallback,
  className,
  isLive,
}: ThumbnailProps) {
  const { theme } = useTheme();

  const bgColor = generateRandomSymmetricalColorByTheme(
    theme as "dark" | "light"
  );

  return (
    <div
      style={{
        background: bgColor,
      }}
      className={cn("w-full group aspect-video relative rounded-lg", className)}
    >
      <div
        className={cn(
          "w-full overflow-hidden  rounded-lg h-full absolute top-0 left-0 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform bg-background flex justify-center items-center",
          isLive ? "ring-teal-600  ring-[1px]" : ""
        )}
      >
        {src ? (
          <Image fill src={src} alt="stream-thumbnail" />
        ) : (
          fallback ?? null
        )}
      </div>

      {isLive && (
        <div className="absolute z-50 bottom-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform ">
          <BadgeLive />
        </div>
      )}
    </div>
  );
}

export const ThumbnailSekeleton = () => {
  return <Skeleton className="w-full group aspect-video relative rounded-lg" />;
};
