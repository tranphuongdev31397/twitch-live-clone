import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useRef, useState } from "react";
import VolumeControl from "./controls/volume";
import FullScreenControl from "./controls/fullscreen";
import { useEventListener } from "usehooks-ts";

export interface LiveVideoProps {
  participant: Participant;
}

export default function LiveVideo({ participant }: LiveVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => participant.identity === track.participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleFullScreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      wrapperRef.current?.requestFullscreen();
    }
  };

  useEventListener(
    "fullscreenchange",
    () => {
      setIsFullscreen(!isFullscreen);
    },
    wrapperRef
  );

  const [volume, setVolume] = useState(50);

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = value * 0.01;
    }
  };

  return (
    <div className="relative h-full flex" ref={wrapperRef}>
      <video width="100%" ref={videoRef} />
      <div className="absolute opacity-0 hover:opacity-100 transition-opacity top-0 h-full  w-full">
        <div className="absolute  bottom-0 h-14 w-full flex items-center justify-between  bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl volume={volume} onChangeVolume={handleVolumeChange} />
          <FullScreenControl
            isFullscreen={isFullscreen}
            onFullscreen={handleFullScreen}
          />
        </div>
      </div>
    </div>
  );
}
