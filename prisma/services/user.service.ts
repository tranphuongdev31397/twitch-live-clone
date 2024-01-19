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
          NOT: {
            id: userId,
          },
        },
        orderBy: {
          createAt: "desc",
        },
      });
    } else {
      users = await db.user.findMany({
        orderBy: {
          createAt: "desc",
        },
      });
    }

    return users;
  }

  static async findUserByUsername(username: string) {
    const user = await db.user.findUnique({
      where: { username },
    });

    return user;
  }

  static async follow(id: string) {
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
      throw new Error("You can't follow yourself");
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    if (existingFollow) {
      throw new Error("Already following!");
    }
    const follow = await db.follow.create({
      data: {
        followerId: self.id,
        followingId: otherUser.id,
      },
      include: {
        follower: true,
        following: true,
      },
    });

    return follow;
  }

  static async unfollow(id: string) {
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
      throw new Error("Cannot unfollow yourself");
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    if (!existingFollow) {
      throw new Error("Not following this user!");
    }
    const unfollow = await db.follow.delete({
      where: {
        id: existingFollow.id,
      },
      include: {
        following: true,
      },
    });

    return unfollow;
  }
}

export default UserService;
