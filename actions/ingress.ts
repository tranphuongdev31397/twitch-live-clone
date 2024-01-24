"use server";

import { db } from "@/lib/db";
import AuthService from "@/prisma/services/auth.service";
import { DASHBOARD_ROUTES } from "@/routes/dashboard";
import {
  RoomServiceClient,
  IngressInput,
  IngressVideoEncodingPreset,
  IngressAudioEncodingPreset,
  IngressClient,
  type CreateIngressOptions,
} from "livekit-server-sdk";

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);

const ingressService = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngresses = async (hostIdentity: string) => {
  try {
    const ingresses = await ingressService.listIngress({
      roomName: hostIdentity,
    });
    const roomList = await roomService.listRooms([hostIdentity]);

    for (const ingress of ingresses) {
      if (ingress.ingressId) {
        await ingressService.deleteIngress(ingress.ingressId);
      }
    }
    for (const room of roomList) {
      await roomService.deleteRoom(room.name);
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const createIngress = async (ingressType: IngressInput) => {
  const self = await AuthService.getSelf();
  // Reset previous ingress
  const isResetSuccess = await resetIngresses(self.id);

  if (!isResetSuccess) {
    throw new Error("Reset previous ingress failed, please try again!");
  }
  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
  }

  const ingress = await ingressService.createIngress(ingressType, options);

  if (!ingress || !ingress.streamKey || !ingress.url) {
    throw new Error("Failed to create ingress!");
  }

  const streamUpdate = await db.stream.update({
    where: {
      userId: self.id,
    },
    data: {
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
      ingressId: ingress.ingressId,
    },
  });

  revalidatePath(DASHBOARD_ROUTES.PRIVATE.KEYS(self.username));
  return streamUpdate;
};
