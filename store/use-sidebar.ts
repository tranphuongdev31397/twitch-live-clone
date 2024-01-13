import { create } from "zustand";

interface SidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onToggle: () => void;
  onTrigger: (status: boolean) => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  collapsed: false,
  onExpand: () =>
    set(() => ({
      collapsed: true,
    })),
  onCollapse: () =>
    set(() => ({
      collapsed: false,
    })),
  onToggle: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),
  onTrigger: (status) =>
    set(() => ({
      collapsed: status,
    })),
}));
