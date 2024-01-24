import CopyText from "@/components/client/copy-text";
import { Input } from "@/components/ui/input";
import * as React from "react";

export interface UrlsCardProps {
  value: string;
}

export default function UrlsCard({ value }: UrlsCardProps) {
  return (
    <div className="p-6 flex flex-row gap-x-4 items-center bg-muted rounded-xl">
      <h3 className="flex-1 font-semibold">Server Url:</h3>
      <div className="flex-[4] flex items-center">
        <Input
          className="flex-1"
          disabled={!value}
          placeholder="Server Url"
          value={value}
        />
        <CopyText value={value} />
      </div>
    </div>
  );
}
