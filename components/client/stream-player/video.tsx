"use client";
import { ConnectionState, Track } from "livekit-client";
import {
  useTracks,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import OfflineVideo from "./offline-video";
import LoadingVideo from "./loading.video";
import LiveVideo from "./live-video";
export interface VideoProps {
  hostName: string;
  hostIdentity: string;
}

export default function Video({ hostName, hostIdentity }: VideoProps) {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    // Offline
    content = <OfflineVideo username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo state={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return <div className="aspect-video border-b group relative">{content}</div>;
}
