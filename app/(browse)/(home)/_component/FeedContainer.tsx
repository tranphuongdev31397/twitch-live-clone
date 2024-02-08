import { StreamFeed } from "../interface";
import FeedCard from "./FeedCard";

export interface FeedsContainerProps {
  streams: StreamFeed[];
}

export default function FeedsContainer({ streams }: FeedsContainerProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {streams.map((stream) => {
        return <FeedCard key={stream.id} stream={stream} />;
      })}
    </div>
  );
}
