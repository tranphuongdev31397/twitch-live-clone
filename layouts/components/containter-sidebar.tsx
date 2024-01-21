"use client";
import { BREAKPOINTS } from "@/configs/breakpoint";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

export interface ContainerSidebarProps {
  children: React.ReactNode;
}

export default function ContainerSidebar({ children }: ContainerSidebarProps) {
  const matches = useMediaQuery(BREAKPOINTS.MAX_LG);
  const { collapsed, onTrigger } = useSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      onTrigger(true);
    } else {
      onTrigger(false);
    }
  }, [matches, onTrigger]);

  return (
    <div
      className={cn(
        "transition-all duration-500 w-full",
        collapsed ? "ml-min-sidebar" : "ml-min-sidebar lg:ml-max-sidebar"
      )}
    >
      {children}
    </div>
  );
}
