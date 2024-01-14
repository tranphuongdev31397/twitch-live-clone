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
    // const self = await AuthService.getSelf();
    return await db.user.findMany({
      orderBy: {
        createAt: "desc",
      },
    });
  }
}

export default UserService;
