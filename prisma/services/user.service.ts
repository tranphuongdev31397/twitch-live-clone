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
}

export default UserService;
