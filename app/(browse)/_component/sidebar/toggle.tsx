"use client";

import Hint from "@/components/client/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import { ArrowLeftFromLine, ExpandIcon } from "lucide-react";

export interface ToggleProps {}

export default function Toggle(props: ToggleProps) {
  const { collapsed, onToggle } = useSidebar((state) => state);

  return (
    <div className="p-3 p-l6 flex flex-row justify-between items-center gap-x-4">
      {!collapsed && <p>For you</p>}
      <Hint label={collapsed ? "Expand" : "Collapse"} side="right" asChild>
        <Button className="hidden lg:block" variant="ghost" onClick={onToggle}>
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
