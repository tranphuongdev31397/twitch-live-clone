"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export interface NavItemProps {
  isActive: boolean;
  href: string;
  icon: LucideIcon;
  label: string;
}

export default function NavItem({
  label,
  href,
  icon: Icon,
  isActive,
}: NavItemProps) {
  const { collapsed } = useSidebar((state) => state);
  return (
    <Link className="w-full" href={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full h-12",
          collapsed ? "justify-center" : "justify-start",
          isActive && "bg-accent"
        )}
        asChild
      >
        <div className={cn("flex items-center gap-x-4")}>
          <Icon size={16} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Button>
    </Link>
  );
}

export const NavItemSkeleton = () => {
  return (
    <li className="px-2 w-full h-12 flex justify-center lg:justify-start">
      <div className="flex items-center gap-x-4 w-min-sidebar lg:w-max-sidebar">
        <Skeleton className="w-8 h-8 rounded-md" />
        <Skeleton className="h-8 flex-1" />
      </div>
    </li>
  );
};
