import FollowService from "@/prisma/services/follow.service";
import UserService from "@/prisma/services/user.service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";
import BlockService from "@/prisma/services/block.service";

export interface UserPageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await UserService.findUserByUsername(params.username);

  if (!user) {
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
    <div className="flex flex-col">
      <p>
        {user.username} {user.id} {`follow: ${isFollowing}`}
        {`blocked User: ${isBlockedUser}`}
        {`blocked by User: ${isBlockedByUser}`}
      </p>
      <Actions
        isBlocked={isBlockedUser}
        isFollowing={isFollowing}
        userId={user.id}
      />
    </div>
  );
}
