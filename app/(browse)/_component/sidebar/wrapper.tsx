"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import * as React from "react";
import { useIsClient } from "usehooks-ts";
import { ToggleSkeleton } from "./toggle";
import { RecommendSkeleton } from "./recommended";
export interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  const isClient = useIsClient();
  const { collapsed } = useSidebar((state) => state);

  if (!isClient) {
    return <WrapperSkeleton />;
  }

  return (
    <aside
      className={cn(
        "fixed w-max-sidebar  z-50 flex flex-col left-0 h-full bg-background border-r border-[#2d2e35]  transition-all duration-500 sidebar-root",
        collapsed && "w-min-sidebar"
      )}
    >
      {children}
    </aside>
  );
}

export function WrapperSkeleton() {
  return (
    <aside
      className={cn(
        "fixed w-min-sidebar lg:w-max-sidebar  z-50 flex flex-col left-0 h-full bg-background border-r border-[#2d2e35]  transition-all duration-500 sidebar-root"
      )}
    >
      <ToggleSkeleton />
      <RecommendSkeleton />
    </aside>
  );
}
