import Navigation, { NavigationSkeleton } from "./navigation";
import Toggle, { ToggleSkeleton } from "./toggle";
import WrapperSidebar from "@/layouts/components/wrapper-sidebar";

export interface SidebarProps {}

export default async function Sidebar({}: SidebarProps) {
  return (
    <WrapperSidebar loadingChildren={<SidebarChildrenLoading />}>
      <Toggle />
      <Navigation />
      <div className="space-y-4 p-3"></div>
    </WrapperSidebar>
  );
}

const SidebarChildrenLoading = () => {
  return (
    <>
      <ToggleSkeleton />
      <NavigationSkeleton />
    </>
  );
};
