import { db } from "@/lib/db";
import AuthService from "./auth.service";

class FollowService {
  static async getFollowingList() {
    try {
      const self = await AuthService.getSelf();

      const followingList = await db.follow.findMany({
        where: {
          followerId: self.id,
          following: {
            blocking: {
              none: {
                blockedId: self.id,
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          following: true,
        },
      });

      return followingList;
    } catch {
      return [];
    }
  }
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

export default FollowService;
