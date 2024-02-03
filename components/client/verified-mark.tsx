import { CheckIcon } from "lucide-react";
import * as React from "react";

export interface VerifiedMarkProps {}

export default function VerifiedMark(props: VerifiedMarkProps) {
  return (
    <span className="h-4 w-4 rounded-full bg-blue-500 flex justify-center items-center">
      <CheckIcon size={12} className="text-white" />
    </span>
  );
}
