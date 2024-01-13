import * as React from "react";
import Toggle from "./toggle";
import Wrapper from "./wrapper";

export interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  return (
    <Wrapper>
      <Toggle />
    </Wrapper>
  );
}
