import * as React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import cn from "@/lib/utils";

export interface LogoProps {}

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export function Logo(props: LogoProps) {
  return (
    <div>
      <Image src="/logo1.svg" alt="logo" height={150} width={150} />
    </div>
  );
}
