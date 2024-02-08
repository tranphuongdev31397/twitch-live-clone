import { User } from "@prisma/client";

export interface StreamFeed {
  user: User;
  id: string;
  name: string;
  thumbnailUrl: string | null;
  isLive: boolean;
}
