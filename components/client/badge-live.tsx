import { cn } from "@/lib/utils";
import * as React from "react";

export interface BadgeLiveProps {
  className?: string;
}

export default function BadgeLive({ className }: BadgeLiveProps) {
  return (
    <div
      className={cn(
        "uppercase tracking-wide text-[10px] text-center p-0 px-1.5  font-semibold text-white bg-rose-500 rounded-md border border-background",
        className
      )}
    >
      Live
    </div>
  );
}
