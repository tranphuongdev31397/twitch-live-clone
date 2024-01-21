"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import * as React from "react";
import { useIsClient } from "usehooks-ts";

export interface WrapperSidebarProps {
  children: React.ReactNode;
  loadingChildren: React.ReactNode;
}

export default function WrapperSidebar({
  loadingChildren,
  children,
}: WrapperSidebarProps) {
  const isClient = useIsClient();
  const { collapsed } = useSidebar((state) => state);

  if (!isClient) {
    return <WrapperSidebarSkeleton loadingChildren={loadingChildren} />;
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

export function WrapperSidebarSkeleton({
  loadingChildren,
}: {
  loadingChildren: React.ReactNode;
}) {
  return (
    <aside
      className={cn(
        "fixed w-min-sidebar lg:w-max-sidebar  z-50 flex flex-col left-0 h-full bg-background border-r border-[#2d2e35]  transition-all duration-500 sidebar-root"
      )}
    >
      {loadingChildren}
    </aside>
  );
}
