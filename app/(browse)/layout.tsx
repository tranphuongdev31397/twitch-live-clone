import * as React from "react";
import Navbar from "./_component/navbar";
import Sidebar from "./_component/sidebar";
import Container from "./_component/containter";
import { WrapperSkeleton } from "./_component/sidebar/wrapper";
export interface BrowseLayoutProps {
  children: React.ReactNode;
}

export default function BrowseLayout({ children }: BrowseLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="flex pt-20 h-full browse-root">
        <React.Suspense fallback={<WrapperSkeleton />}>
          <Sidebar />
        </React.Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
}
