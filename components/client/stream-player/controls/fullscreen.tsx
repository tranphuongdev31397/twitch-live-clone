import { Maximize2Icon, Minimize2, Minimize2Icon } from "lucide-react";
import * as React from "react";
import Hint from "../../hint";

export interface FullScreenControlProps {
  isFullscreen: boolean;
  onFullscreen?: () => void;
}

export default function FullScreenControl({
  isFullscreen = false,
  onFullscreen,
}: FullScreenControlProps) {
  const Icon = isFullscreen ? Minimize2Icon : Maximize2Icon;
  const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";
  return (
    <div className="flex items-center justify-center">
      <Hint label={label} side="top" asChild>
        <button
          className="text-white hover:bg-white/10 p-2 rounded-lg"
          onClick={onFullscreen}
        >
          <Icon size={20} />
        </button>
      </Hint>
    </div>
  );
}
