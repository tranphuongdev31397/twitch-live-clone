"use client";
import CopyText from "@/components/client/copy-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export interface KeyCardProps {
  value: string;
}

export default function KeyCard({ value }: KeyCardProps) {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="p-6 flex flex-row gap-x-4 items-baseline bg-muted rounded-xl">
      <h3 className="flex-1 font-semibold">Stream Key:</h3>
      <div className="flex-[4]">
        <div className="flex-1 flex flex-row items-center mb-1">
          <Input
            type={showPass ? "text" : "password"}
            disabled={!value}
            placeholder="Stream Key"
            value={value}
          />
          <CopyText value={value} />
        </div>
        <Button
          size={"sm"}
          variant={"link"}
          onClick={() => {
            setShowPass(!showPass);
          }}
        >
          {showPass ? "Hide" : "Show"}
        </Button>
      </div>
    </div>
  );
}
