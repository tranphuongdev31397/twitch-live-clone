import * as React from "react";
import Navbar from "./_component/navbar";
import Sidebar, { SidebarChildrenLoading } from "./_component/sidebar";
import { WrapperSidebarSkeleton } from "@/layouts/components/wrapper-sidebar";
import ContainerSidebar from "@/layouts/components/containter-sidebar";
export interface BrowseLayoutProps {
  children: React.ReactNode;
}

export default function BrowseLayout({ children }: BrowseLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="flex pt-20 h-full browse-root">
        <React.Suspense
          fallback={
            <WrapperSidebarSkeleton
              loadingChildren={<SidebarChildrenLoading />}
            />
          }
        >
          <Sidebar />
        </React.Suspense>
        <ContainerSidebar>{children}</ContainerSidebar>
      </div>
    </>
  );
}
