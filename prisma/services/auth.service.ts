import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

class AuthService {
  static async getSelf() {
    const self = await currentUser();

    if (!self || !self.username || !self.externalId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: {
        username: self.username,
        id: self.externalId,
      },
    });

    if (!user) {
      throw new Error("Not found");
    }

    return user;
  }
}

export default AuthService;
