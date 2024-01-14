import * as React from "react";
import Navbar from "./_component/navbar";
import Sidebar from "./_component/sidebar";
import Container from "./_component/containter";
export interface BrowseLayoutProps {
  children: React.ReactNode;
}

export default function BrowseLayout({ children }: BrowseLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="flex pt-20 h-full browse-root">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
}
