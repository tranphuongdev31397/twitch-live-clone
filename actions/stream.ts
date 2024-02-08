"use server";

import { db } from "@/lib/db";
import AuthService from "@/prisma/services/auth.service";
import { BROWSE_ROUTES } from "@/routes/browse";
import { DASHBOARD_ROUTES } from "@/routes/dashboard";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

const onSettingStream = async (values: Partial<Stream>) => {
  try {
    const self = await AuthService.getSelf();

    const selfStream = await db.stream.findUnique({
      where: {
        userId: self?.id,
      },
    });

    if (!selfStream) {
      throw new Error("Stream not found");
    }
    const validData: Partial<
      Pick<
        Stream,
        | "name"
        | "isChatDelayed"
        | "isChatEnabled"
        | "isChatFollowersOnly"
        | "thumbnailUrl"
      >
    > = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly,
      thumbnailUrl: values.thumbnailUrl,
    };

    const streamUpdated = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: validData,
    });

    revalidatePath(DASHBOARD_ROUTES.PRIVATE.CHAT(self.username));
    revalidatePath(DASHBOARD_ROUTES.PRIVATE.STREAM(self.username));
    revalidatePath(BROWSE_ROUTES.PUBLIC.USERNAME(self.username));

    return streamUpdated;
  } catch (error) {
    throw error;
  }
};

export { onSettingStream };
