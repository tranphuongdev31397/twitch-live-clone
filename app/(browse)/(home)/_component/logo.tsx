import * as React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BROWSE_ROUTES } from "@/routes/browse";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export function Logo() {
  return (
    <Link
      href={BROWSE_ROUTES.PUBLIC.HOME}
      className={cn(
        "flex relative items-center [&_p]:hover:animate-pulse  hover:opacity-75 transition",
        font.className
      )}
    >
      <div className="min-w-16 lg:min-w-20 h-auto w-full shrink-0">
        <Image src="/logo1.svg" alt="logo" height={80} width={80} />
      </div>
      <p
        className={cn(
          "hidden  rotate-90 absolute top-1/2  right-0 translate-x-1/2 -translate-y-1/2 lg:flex flex-row items-center  text-[8px] text-semibold text-muted-foreground",
          font.className
        )}
      >
        Play Together
      </p>
    </Link>
  );
}
