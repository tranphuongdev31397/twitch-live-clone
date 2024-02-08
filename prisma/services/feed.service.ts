import { db } from "@/lib/db";
import AuthService from "./auth.service";

class FeedService {
  static async getListFeeds() {
    let self;
    try {
      self = await AuthService.getSelf();
    } catch (error) {
      //Not login =>
    }

    const streams = await db.stream.findMany({
      where: self?.id
        ? {
            // Condition: Does not include streams with streamers that have blocked this user
            user: {
              NOT: {
                blocking: {
                  some: {
                    blockedId: self.id,
                  },
                },
              },
            },
          }
        : undefined,
      select: {
        id: true,
        isLive: true,
        user: true,
        thumbnailUrl: true,
        name: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });

    return streams;
  }
}

export default FeedService;
