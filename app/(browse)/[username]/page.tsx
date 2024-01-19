import FollowService from "@/prisma/services/follow.service";
import UserService from "@/prisma/services/user.service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";

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
  return (
    <div className="flex flex-col">
      <p>
        {user.username} {user.id} {`${isFollowing}`}
      </p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  );
}
