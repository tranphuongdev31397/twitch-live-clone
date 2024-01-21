"use client";

import { onSettingStream } from "@/actions/stream";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

export interface ToggleCardProps {
  label: React.ReactNode;
  field: FieldTypes;
  value: boolean;
}

export default function ToggleCard({
  label,
  field,
  value = false,
}: Readonly<ToggleCardProps>) {
  const [isPending, startTransition] = useTransition();
  const onToggleSetting = () => {
    startTransition(() => {
      onSettingStream({
        [field]: !value,
      })
        .then((res) => {
          const isChecked = res[field];
          toast.success(`${label} was ${isChecked ? "on" : "off"}`);
        })
        .catch((err) => toast.error(err?.message || "Something went wrong!"));
    });
  };

  return (
    <div className="rounded-xl w-full bg-muted p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{label}</h3>
        <Switch
          onCheckedChange={onToggleSetting}
          checked={value}
          disabled={isPending}
        />
      </div>
    </div>
  );
}
