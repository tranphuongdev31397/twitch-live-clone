import AuthService from "@/prisma/services/auth.service";
import Navbar from "./_components/navbar";
import { redirect } from "next/navigation";
import { BROWSE_ROUTES } from "@/routes/browse";
import React from "react";
import { WrapperSidebarSkeleton } from "@/layouts/components/wrapper-sidebar";
import Sidebar from "./_components/sidebar";
import ContainerSidebar from "@/layouts/components/containter-sidebar";

export interface CreatorLayoutProps {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

export default async function CreatorLayout({
  params,
  children,
}: CreatorLayoutProps) {
  const { username } = params;

  const self = await AuthService.getSelfByUsername(username);

  if (!self || !username) {
    redirect(BROWSE_ROUTES.PUBLIC.HOME);
  }

  return (
    <>
      <Navbar />
      <div className="flex pt-20 h-full browse-root">
        <React.Suspense
          fallback={<WrapperSidebarSkeleton loadingChildren={<></>} />}
        >
          <Sidebar />
        </React.Suspense>
        <ContainerSidebar>{children}</ContainerSidebar>
      </div>
    </>
  );
}
