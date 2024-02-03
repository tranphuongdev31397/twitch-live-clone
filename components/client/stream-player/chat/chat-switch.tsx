"use client";

import { EVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { MessageCircleReplyIcon, Users2Icon } from "lucide-react";
import Hint from "../../hint";
import { Button } from "@/components/ui/button";

export interface ChatSwitchProps {}

export default function ChatSwitch(props: ChatSwitchProps) {
  const { variant, onChangeVariant } = useChatSidebar();
  const isChatArea = variant === EVariant.Chat;
  const label = isChatArea ? "Community" : "Back to Chat";
  const Icon = isChatArea ? Users2Icon : MessageCircleReplyIcon;
  const handleSwitchVariant = () => {
    if (isChatArea) {
      onChangeVariant(EVariant.Community);
    } else {
      onChangeVariant(EVariant.Chat);
    }
  };
  return (
    <Hint asChild label={label} side="bottom">
      <Button onClick={handleSwitchVariant} variant={"ghost"}>
        <Icon size={16} />
      </Button>
    </Hint>
  );
}
