import { create } from "zustand";

export enum EVariant {
  Chat = "Chat",
  Community = "Community",
}

interface ChatSidebarProps {
  collapsed: boolean;
  variant: EVariant;
  onExpand: () => void;
  onChangeVariant: (variant: EVariant) => void;
  onCollapse: () => void;
  onToggle: () => void;
  onTrigger: (status: boolean) => void;
}

export const useChatSidebar = create<ChatSidebarProps>((set) => ({
  collapsed: false,
  variant: EVariant.Chat,
  onExpand: () =>
    set(() => ({
      collapsed: false,
    })),
  onCollapse: () =>
    set(() => ({
      collapsed: true,
    })),
  onToggle: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),
  onTrigger: (status) =>
    set(() => ({
      collapsed: status,
    })),
  onChangeVariant: (variant: EVariant) => {
    set(() => ({
      variant,
    }));
  },
}));
