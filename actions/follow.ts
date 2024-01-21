"use server";

import FollowService from "@/prisma/services/follow.service";
import { BROWSE_ROUTES } from "@/routes/browse";
import { revalidatePath } from "next/cache";

const onFollow = async (id: string) => {
  try {
    const followedUser = await FollowService.follow(id);

    revalidatePath(BROWSE_ROUTES.PUBLIC.HOME);

    if (followedUser) {
      revalidatePath(
        BROWSE_ROUTES.PUBLIC.USERNAME(followedUser.following.username)
      );
    }

    return followedUser;
  } catch (error) {
    throw error;
  }
};

const onUnFollow = async (id: string) => {
  try {
    const unFollowUser = await FollowService.unfollow(id);

    revalidatePath(BROWSE_ROUTES.PUBLIC.HOME);

    if (unFollowUser) {
      revalidatePath(
        BROWSE_ROUTES.PUBLIC.USERNAME(unFollowUser.following.username)
      );
    }

    return unFollowUser;
  } catch (error) {
    throw error;
  }
};

export { onFollow, onUnFollow };
