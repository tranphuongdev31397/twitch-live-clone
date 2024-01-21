import Toggle, { ToggleSkeleton } from "./toggle";
import Recommended, { RecommendSkeleton } from "./recommended";
import UserService from "@/prisma/services/user.service";
import Follow, { FollowSkeleton } from "./followed";
import FollowService from "@/prisma/services/follow.service";
import WrapperSidebar from "@/layouts/components/wrapper-sidebar";

export interface SidebarProps {}

export default async function Sidebar({}: SidebarProps) {
  const recommendedList = await UserService.recommendUsers();
  const followingList = await FollowService.getFollowingList();

  return (
    <WrapperSidebar loadingChildren={<SidebarChildrenLoading />}>
      <Toggle />
      <div className="space-y-4 p-3">
        <Follow data={followingList} />
        <Recommended data={recommendedList} />
      </div>
    </WrapperSidebar>
  );
}

export const SidebarChildrenLoading = () => {
  return (
    <>
      <ToggleSkeleton />
      <FollowSkeleton />
      <RecommendSkeleton />
    </>
  );
};
