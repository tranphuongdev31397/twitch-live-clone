import FollowService from "@/prisma/services/follow.service";
import UserService from "@/prisma/services/user.service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";
import BlockService from "@/prisma/services/block.service";
import StreamPlayer from "@/components/client/stream-player";

export interface UserPageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await UserService.findUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await FollowService.isFollowingUser(user.id);

  const { isBlockedUser, isBlockedByUser } = await BlockService.isBlocked(
    user.id
  );

  if (isBlockedByUser) {
    notFound();
  }
  return (
    <StreamPlayer stream={user.stream} user={user} isFollowing={isFollowing} />
  );
}
