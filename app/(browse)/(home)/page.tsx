import { Suspense } from "react";

import {
  FeedContainerSkeleton,
  FeedsContainer,
} from "./_component/FeedContainer";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  return (
    <section className="max-w-screen-2xl mx-auto w-full p-8 h-full">
      <div className="flex flex-col mb-8">
        <h1 className="text-xl font-semibold">Welcome to Gamezone 🎮</h1>
        <p className="text-base text-muted-foreground">
          Let&apos;s play with amazing streamers
        </p>
      </div>
      <Suspense fallback={<FeedContainerSkeleton />}>
        <FeedsContainer />
      </Suspense>
    </section>
  );
}
