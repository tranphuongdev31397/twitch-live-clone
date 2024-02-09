import FeedService from "@/prisma/services/feed.service";
import { BROWSE_ROUTES } from "@/routes/browse";
import { redirect } from "next/navigation";
import SearchResults from "./components/SearchResults";

export interface SearchPageProps {
  searchParams: {
    term?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = searchParams;
  if (!term) {
    redirect(BROWSE_ROUTES.PUBLIC.HOME);
  }

  const feedsSearched = await FeedService.searchFeeds(term);

  return (
    <section
      data-section="search-feeds"
      className="max-w-screen-2xl mx-auto w-full p-8 h-full"
    >
      <div className="flex flex-col mb-8">
        <h1 className=" sm:text-lg font-semibold">
          Results for term: <span className="text-teal-600">{term}</span>
        </h1>
        {feedsSearched.length === 0 && (
          <p className="text-sm sm:text-base text-muted-foreground">
            No results found. Please searching for something else!
          </p>
        )}
      </div>
      <SearchResults searchResults={feedsSearched} />
    </section>
  );
}
