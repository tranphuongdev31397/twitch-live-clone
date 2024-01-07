import * as React from 'react';
import Navbar from './(home)/_component/Navbar';

export interface BrowseLayoutProps {
    children: React.ReactNode
}

export default function BrowseLayout ({children}: BrowseLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
