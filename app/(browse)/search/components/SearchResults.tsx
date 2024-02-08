import * as React from "react";
import { StreamFeed } from "../../(home)/interface";
import SearchFeed from "./SearchFeed";

export interface SearchResultsProps {
  searchResults: StreamFeed[];
}

export default function SearchResults({ searchResults }: SearchResultsProps) {
  return (
    <div className="grid grid-cols-1">
      {searchResults.map((stream) => {
        return <SearchFeed key={stream.id} feed={stream} />;
      })}
    </div>
  );
}
