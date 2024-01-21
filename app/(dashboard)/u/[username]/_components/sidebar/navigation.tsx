"use client";
import { DASHBOARD_ROUTES } from "@/routes/dashboard";
import { useUser } from "@clerk/nextjs";
import {
  FullscreenIcon,
  KeyRoundIcon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import NavItem, { NavItemSkeleton } from "./nav-item";

export interface NavigationProps {}

export default function Navigation(props: NavigationProps) {
  const pathname = usePathname();
  const { user } = useUser();

  const SIDEBAR_MENU = [
    {
      label: "Stream",
      href: DASHBOARD_ROUTES.PRIVATE.STREAM(user?.username || ""),
      icon: FullscreenIcon,
    },
    {
      label: "Keys",
      href: DASHBOARD_ROUTES.PRIVATE.KEYS(user?.username || ""),
      icon: KeyRoundIcon,
    },
    {
      label: "Chat",
      href: DASHBOARD_ROUTES.PRIVATE.CHAT(user?.username || ""),
      icon: MessageSquareIcon,
    },
    {
      label: "Community",
      href: DASHBOARD_ROUTES.PRIVATE.COMMUNITY(user?.username || ""),
      icon: UsersIcon,
    },
  ];
  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {SIDEBAR_MENU.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
}

export const NavigationSkeleton = () => {
  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {[...Array(4)].map((_, i) => (
        <NavItemSkeleton key={i} />
      ))}
    </ul>
  );
};
