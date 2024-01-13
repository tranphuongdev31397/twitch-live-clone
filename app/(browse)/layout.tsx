import * as React from "react";
import Navbar from "./(home)/_component/Navbar";

export interface BrowseLayoutProps {
  children: React.ReactNode;
}

export default function BrowseLayout({ children }: BrowseLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="flex pt-20 h-full">{children}</div>
    </>
  );
}
