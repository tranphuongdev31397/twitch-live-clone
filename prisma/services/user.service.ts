import { db } from "@/lib/db";
import type { CreateUserParams } from "../types/User.types";
import { User } from "@prisma/client";
import AuthService from "./auth.service";

class UserService {
  static async createUser({
    username,
    imageUrl,
    externalUserId,
  }: CreateUserParams) {
    return await db.user.create({
      data: {
        username,
        imageUrl,
        externalUserId,
        stream: {
          create: {
            name: `${username}'s Stream`,
          },
        },
      },
    });
  }

  static async updateUser({
    username,
    imageUrl,
    externalUserId,
  }: PartialWithRequired<User, "externalUserId">) {
    return await db.user.update({
      where: { externalUserId },
      data: {
        username,
        imageUrl,
      },
    });
  }

  static async deleteUser(externalUserId: string) {
    return await db.user.delete({
      where: { externalUserId },
    });
  }

  static async recommendUsers() {
    let userId;
    try {
      const self = await AuthService.getSelf();
      userId = self.id;
    } catch (error) {
      userId = null;
    }

    let users = [];
    if (userId) {
      users = await db.user.findMany({
        where: {
          AND: [
            {
              NOT: {
                id: userId,
              },
            },
            {
              NOT: {
                followedBy: {
                  some: {
                    followerId: userId,
                  },
                },
              },
            },
            {
              NOT: {
                blocking: {
                  some: {
                    blockedId: userId,
                  },
                },
              },
            },
          ],
        },
        include: {
          stream: {
            select: {
              isLive: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      users = await db.user.findMany({
        include: {
          stream: {
            select: {
              isLive: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return users;
  }

  static async findUserByUsername(username: string) {
    const user = await db.user.findUnique({
      where: { username },
      include: { stream: true },
    });

    return user;
  }

  static async findUserById(id: string) {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        stream: true,
      },
    });

    return user;
  }
}

export default UserService;
