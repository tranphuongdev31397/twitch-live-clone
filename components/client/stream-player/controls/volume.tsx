import { Slider } from "@/components/ui/slider";
import { Volume1Icon, Volume2Icon, VolumeXIcon } from "lucide-react";
import * as React from "react";
import Hint from "../../hint";

export interface VolumeControlProps {
  volume: number;
  onToggle?: () => void;
  onChangeVolume: (value: number) => void;
}

export default function VolumeControl({
  volume,
  onToggle,
  onChangeVolume,
}: VolumeControlProps) {
  let Icon = Volume1Icon;

  const isAboveHalf = volume > 50;
  const isMuted = volume === 0;

  const currentVolume = React.useRef(volume);

  if (isAboveHalf) {
    Icon = Volume2Icon;
  } else if (isMuted) {
    Icon = VolumeXIcon;
  }

  const handleToggle = () => {
    if (isMuted) {
      onChangeVolume(currentVolume.current);
    } else {
      currentVolume.current = volume;
      onChangeVolume(0);
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <Hint asChild label={isMuted ? "Unmuted" : "Muted"}>
        <button
          className="text-white hover:bg-white/10 p-2 rounded-lg"
          onClick={handleToggle}
        >
          <Icon size={20} />
        </button>
      </Hint>
      <Slider
        className="w-[8rem]"
        value={[volume]}
        onValueChange={([value]) => {
          onChangeVolume(value);
        }}
        max={100}
        step={1}
      />
    </div>
  );
}
