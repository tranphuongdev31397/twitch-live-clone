import * as React from "react";
import { Logo } from "./_components/logo";

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <Logo />
      {children}
    </div>
  );
}
