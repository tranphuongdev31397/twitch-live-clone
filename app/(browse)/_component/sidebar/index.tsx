import * as React from "react";
import Toggle from "./toggle";
import Wrapper from "./wrapper";
import Recommended from "./recommended";
import UserService from "@/prisma/services/user.service";

export interface SidebarProps {}

export default async function Sidebar({}: SidebarProps) {
  const recommendedList = await UserService.recommendUsers();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 p-3">
        <Recommended data={recommendedList} />
      </div>
    </Wrapper>
  );
}
