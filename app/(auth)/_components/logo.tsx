import * as React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

export interface LogoProps {}

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export function Logo(props: LogoProps) {
  return (
    <div className={cn("flex items-center flex-col gap-y-4", font.className)}>
      <Image src="/logo1.svg" alt="logo" height={150} width={150} />
      <p className="text-sm font-semibold text-muted-foreground">Join to play together</p>
    </div>
  );
}
