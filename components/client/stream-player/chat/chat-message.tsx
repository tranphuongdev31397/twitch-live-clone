"use client";

import { stringToHexColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { format } from "date-fns";
export interface ChatMessageProps {
  data: ReceivedChatMessage;
}

export default function ChatMessage({ data }: ChatMessageProps) {
  return (
    <div className="inline-flex flex-row gap-x-2 p-2 rounded-md hover:bg-white/5">
      <span className="font-semibold text-sm text-muted-foreground whitespace-nowrap">
        {format(data.timestamp, "HH:mm")}
      </span>
      <div className="flex flex-wrap items-baseline gap-1 grow">
        <p className="text-sm font-semibold whitespace-nowrap">
          <span
            className="truncate"
            style={{
              color: stringToHexColor(data?.from?.name ?? ""),
            }}
          >
            {data.from?.name}
          </span>
        </p>
        <p className="text-sm break-all">{data.message}</p>
      </div>
    </div>
  );
}
