import { db } from "@/lib/db";
import AuthService from "./auth.service";

class BlockService {
  static async isBlocked(id: string) {
    try {
      const self = await AuthService.getSelf();

      const otherUser = await db.user.findUnique({
        where: {
          id,
        },
      });

      if (!otherUser) {
        throw new Error("User not found");
      }

      if (otherUser.id === self.id) {
        return {
          isBlockedUser: false,
          isBlockedByUser: false,
        };
      }

      const existingBlockedUser = await db.block.findUnique({
        where: {
          blockerId_blockedId: {
            blockerId: self.id,
            blockedId: otherUser.id,
          },
        },
      });

      const existingBlockedByUser = await db.block.findUnique({
        where: {
          blockerId_blockedId: {
            blockerId: otherUser.id,
            blockedId: self.id,
          },
        },
      });

      return {
        isBlockedUser: !!existingBlockedUser,
        isBlockedByUser: !!existingBlockedByUser,
      };
    } catch (error) {
      return {
        isBlockedUser: false,
        isBlockedByUser: false,
      };
    }
  }
  static async block(id: string) {
    const self = await AuthService.getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      throw new Error("User not found!");
    }

    if (otherUser.id === self.id) {
      throw new Error("You can't block yourself");
    }

    const existingBlocked = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockedId: otherUser.id,
          blockerId: self.id,
        },
      },
    });

    if (existingBlocked) {
      throw new Error("Already Blocking!");
    }
    const block = await db.block.create({
      data: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
      include: {
        blocked: true,
      },
    });

    return block;
  }

  static async unblock(id: string) {
    const self = await AuthService.getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      throw new Error("User not found!");
    }

    if (otherUser.id === self.id) {
      throw new Error("Cannot unblock yourself");
    }

    const existingBlocked = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });

    if (!existingBlocked) {
      throw new Error("Not blocking this user!");
    }
    const unblock = await db.block.delete({
      where: {
        id: existingBlocked.id,
      },
      include: {
        blocked: true,
      },
    });

    return unblock;
  }
}

export default BlockService;
