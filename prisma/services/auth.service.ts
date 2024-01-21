import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

class AuthService {
  static async getSelf() {
    const self = await currentUser();

    if (!self || !self.username || !self.id) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: {
        username: self.username,
        externalUserId: self.id,
      },
    });

    if (!user) {
      throw new Error("Not found");
    }

    return user;
  }

  static async getSelfByUsername(username: string) {
    try {
      const self = await currentUser();

      if (!self || !self.username) {
        throw new Error("Unauthorized");
      }

      const user = await db.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (user.username !== self.username) {
        throw new Error("Unauthorized");
      }

      return user;
    } catch (error) {
      return null;
    }
  }
}

export default AuthService;
