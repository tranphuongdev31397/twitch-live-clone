import FeedService from "@/prisma/services/feed.service";
import FeedsContainer from "./_component/FeedContainer";

export default async function Home() {
  const streams = await FeedService.getListFeeds();
  return (
    <section
      data-section="feeds"
      className="max-w-screen-2xl mx-auto w-full p-8 h-full"
    >
      <div className="flex flex-col mb-8">
        <h1 className="text-xl font-semibold">Welcome to Gamehub 🎮</h1>
        <p className="text-base text-muted-foreground">
          Let&apos;s play with amazing streamers
        </p>
      </div>
      <FeedsContainer streams={streams} />
    </section>
  );
}
