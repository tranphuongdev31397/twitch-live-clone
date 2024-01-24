"use client";
import { useCopyToClipboard } from "usehooks-ts";
import { Button, ButtonProps } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CopyTextProps extends ButtonProps {
  value: string;
}

export default function CopyText({ value, ...rest }: CopyTextProps) {
  const [_, copyFnc] = useCopyToClipboard();
  const [isPending, setIsPending] = useState(false);

  const onCopy = async (text: string) => {
    setIsPending(true);
    const isSuccess = await copyFnc(text);
    if (isSuccess) {
      toast.success("Coppied to clipboard!");
    } else {
      toast.error("Error when copying, please try again");
    }
    setTimeout(() => {
      setIsPending(false);
    }, 1000);
  };

  const Icon = !isPending ? CopyIcon : CopyCheckIcon;
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => onCopy(value)}
      {...rest}
      disabled={!value || isPending}
    >
      <Icon className={cn(isPending && "text-emerald-500")} size={16} />
    </Button>
  );
}
