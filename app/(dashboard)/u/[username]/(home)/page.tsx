import StreamPlayer from "@/components/client/stream-player";
import AuthService from "@/prisma/services/auth.service";
import StreamService from "@/prisma/services/stream.service";
import UserService from "@/prisma/services/user.service";
import { currentUser } from "@clerk/nextjs";

export interface StreamPageProps {
  params: {
    username: string;
  };
}

export default async function StreamPage({ params }: StreamPageProps) {
  const externalUser = await currentUser();
  const user = await UserService.findUserByUsername(params.username);
  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    return null;
  }
  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
}
