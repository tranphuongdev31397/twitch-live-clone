import FeedsContainer, {
  FeedContainerSkeleton,
} from "./_component/FeedContainer";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <section className="max-w-screen-2xl mx-auto w-full p-8 h-full">
        <div className="flex flex-col mb-8">
          <h1 className="text-xl font-semibold">Welcome to Gamehub 🎮</h1>
          <p className="text-base text-muted-foreground">
            Let&apos;s play with amazing streamers
          </p>
        </div>
        <FeedsContainer />
      </section>
    </Suspense>
  );
}

export const HomePageSkeleton = () => {
  return (
    <section
      data-section="feeds"
      className="max-w-screen-2xl mx-auto w-full p-8 h-full"
    >
      <div className="flex flex-col mb-8">
        <Skeleton className="rounded-none h-8 w-40" />
        <Skeleton className="rounded-none h-6 w-20" />
      </div>

      <FeedContainerSkeleton />
    </section>
  );
};
