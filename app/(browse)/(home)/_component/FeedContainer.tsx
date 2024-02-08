"use server";

import FeedService from "@/prisma/services/feed.service";
import FeedCard, { FeedCardSkeleton } from "./FeedCard";

export default async function FeedsContainer() {
  const streams = await FeedService.getListFeeds();

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {streams.map((stream) => {
        return <FeedCard key={stream.id} stream={stream} />;
      })}
    </div>
  );
}

export const FeedContainerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {[...Array(4)].map((_, i) => (
        <FeedCardSkeleton key={i} />
      ))}
    </div>
  );
};
