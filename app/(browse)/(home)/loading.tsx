import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import { FeedContainerSkeleton } from "./_component/FeedContainer";

export const HomePageSkeleton = () => {
  return (
    <section
      data-section="feeds"
      className="max-w-screen-2xl mx-auto w-full p-8 h-full"
    >
      <div className="flex flex-col space-y-2 mb-8">
        <Skeleton className="rounded-none h-8 w-40" />
        <Skeleton className="rounded-none h-6 w-20" />
      </div>

      <FeedContainerSkeleton />
    </section>
  );
};
export interface HomeLoadingProps {}

export default function HomeLoading(props: HomeLoadingProps) {
  return <HomePageSkeleton />;
}
