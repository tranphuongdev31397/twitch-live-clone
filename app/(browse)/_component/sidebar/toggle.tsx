"use client";

import Hint from "@/components/client/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import { ArrowLeftFromLine, ExpandIcon } from "lucide-react";

export interface ToggleProps {
  isLogin?: boolean;
}

export default function Toggle({ isLogin }: ToggleProps) {
  const { collapsed, onToggle } = useSidebar((state) => state);

  return (
    <div className="p-3 flex flex-row justify-between items-center gap-x-4">
      {!collapsed && <p className="font-semibold text-sm truncate">For You</p>}
      <Hint label={collapsed ? "Expand" : "Collapse"} side="right" asChild>
        <Button className="hidden lg:block " variant="ghost" onClick={onToggle}>
          <ArrowLeftFromLine
            className={cn(
              "transition-transform duration-300",
              collapsed && "rotate-180"
            )}
            size={"16"}
          />
        </Button>
      </Hint>
    </div>
  );
}

export function ToggleSkeleton() {
  return (
    <div className="p-3 flex flex-row justify-between items-center gap-x-4">
      <Skeleton className="hidden h-6 w-12 lg:block font-semibold text-sm truncate" />
      <Skeleton className="hidden lg:block h-8 w-8 rounded-md" />
    </div>
  );
}
