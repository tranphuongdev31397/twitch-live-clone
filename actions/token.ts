"use server";

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";
import AuthService from "@/prisma/services/auth.service";
import UserService from "@/prisma/services/user.service";
import BlockService from "@/prisma/services/block.service";

export const createViewerToken = async (hostIdentity: string) => {
  let self;
  try {
    // User Signed
    self = await AuthService.getSelf();
  } catch (error) {
    // User not sign in => create fake token as guest
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 10000)}`;
    self = { id, username };
  }

  const host = await UserService.findUserById(hostIdentity);

  if (!host) {
    throw new Error("User not found");
  }

  const { isBlockedByUser } = await BlockService.isBlocked(host.id);

  if (isBlockedByUser) {
    throw new Error("Authorization, you have been blocked by this host!");
  }

  const isHost = host.id === self.id;
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.username,
    }
  );

  token.addGrant({
    canPublish: false,
    canPublishData: true,
    room: host.id,
    roomJoin: true,
  });

  return await Promise.resolve(token.toJwt());
};
