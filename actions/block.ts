"use server";

import AuthService from "@/prisma/services/auth.service";
import BlockService from "@/prisma/services/block.service";
import { BROWSE_ROUTES } from "@/routes/browse";
import { DASHBOARD_ROUTES } from "@/routes/dashboard";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";
const RoomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);
const onBlock = async (id: string) => {
  let self;
  let blockedUser;
  try {
    self = await AuthService.getSelf();

    // Todo: Can improve with partner of streamer
  } catch (error) {
    // Failed by authorized => Don't have permission to block user
    throw error;
  }

  try {
    // Block User in system db (mean user is signing)
    blockedUser = await BlockService.block(id);
  } catch (error) {
    // Viewer be a guest
  }

  try {
    // Kick out user is blocked from room
    await RoomService.removeParticipant(self.id, id);
  } catch (error) {
    // User not in the room
  }

  revalidatePath(DASHBOARD_ROUTES.PRIVATE.COMMUNITY(self.username));

  return blockedUser;
};

const onUnblock = async (id: string) => {
  try {
    const unBlockedUser = await BlockService.unblock(id);

    revalidatePath(BROWSE_ROUTES.PUBLIC.HOME);

    if (unBlockedUser) {
      revalidatePath(
        BROWSE_ROUTES.PUBLIC.USERNAME(unBlockedUser.blocked.username)
      );
    }

    return unBlockedUser;
  } catch (error) {
    throw error;
  }
};

export { onUnblock, onBlock };
