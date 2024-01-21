"use server";

import BlockService from "@/prisma/services/block.service";
import FollowService from "@/prisma/services/follow.service";
import { BROWSE_ROUTES } from "@/routes/browse";
import { revalidatePath } from "next/cache";

const onBlock = async (id: string) => {
  try {
    const blockedUser = await BlockService.block(id);

    revalidatePath(BROWSE_ROUTES.PUBLIC.HOME);

    if (blockedUser) {
      revalidatePath(
        BROWSE_ROUTES.PUBLIC.USERNAME(blockedUser.blocked.username)
      );
    }

    return blockedUser;
  } catch (error) {
    throw error;
  }
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
