"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import * as React from "react";

export interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  const { collapsed } = useSidebar((state) => state);
  return (
    <aside
      className={cn(
        "fixed w-60 z-50 flex flex-col left-0 h-full bg-background border-r border-[#2d2e35]  transition-all duration-500",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
}
