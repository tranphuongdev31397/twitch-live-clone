import { db } from "@/lib/db";
import type { CreateUserParams } from "../types/User.types";
import { User } from "@prisma/client";

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
      }
    });
  }

  static async deleteUser (externalUserId : string) {
    return await db.user.delete({
        where: {  externalUserId  }
    })
  }
}

export default UserService;
