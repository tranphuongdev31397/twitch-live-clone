import { db } from "@/lib/db";
import AuthService from "./auth.service";

class FollowService {
  static async isFollowingUser(id: string) {
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
        return true;
      }

      const existingFollowing = await db.follow.findFirst({
        where: {
          followerId: self.id,
          followingId: otherUser.id,
        },
      });
      return !!existingFollowing;
    } catch (error) {
      return false;
    }
  }
}

export default FollowService;
