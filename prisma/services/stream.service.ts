import { db } from "@/lib/db";

class StreamService {
  static async getStreamByUserId(userId: string) {
    const stream = await db.stream.findUnique({
      where: {
        userId,
      },
    });

    return stream;
  }
}

export default StreamService;
