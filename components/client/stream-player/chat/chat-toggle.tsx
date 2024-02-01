"use client";

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from "lucide-react";
import Hint from "../../hint";
import { Button } from "@/components/ui/button";

export interface ChatToggleProps {}

export default function ChatToggle(props: ChatToggleProps) {
  const { onToggle, collapsed } = useChatSidebar((state) => state);
  const label = collapsed ? "Expand" : "Collapse";
  const Icon = collapsed ? ArrowLeftFromLineIcon : ArrowRightFromLineIcon;
  return (
    <Hint label={label} side="left" asChild>
      <Button
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
        onClick={onToggle}
        variant={"ghost"}
      >
        <Icon size={16} />
      </Button>
    </Hint>
  );
}
