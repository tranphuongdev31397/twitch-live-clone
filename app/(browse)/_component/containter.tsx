"use client";
import { BREAKPOINTS } from "@/configs/breakpoint";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

export interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
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
    <div className={cn("", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}>
      {children}
    </div>
  );
}
