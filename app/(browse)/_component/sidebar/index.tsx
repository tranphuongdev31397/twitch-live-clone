import * as React from "react";
import Toggle from "./toggle";
import Wrapper from "./wrapper";
import Recommended from "./recommended";
import UserService from "@/prisma/services/user.service";
import Follow from "./followed";
import FollowService from "@/prisma/services/follow.service";

export interface SidebarProps {}

export default async function Sidebar({}: SidebarProps) {
  const recommendedList = await UserService.recommendUsers();
  const followingList = await FollowService.getFollowingList();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 p-3">
        <Follow data={followingList} />
        <Recommended data={recommendedList} />
      </div>
    </Wrapper>
  );
}
