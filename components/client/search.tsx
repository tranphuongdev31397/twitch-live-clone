"use client";

import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { SearchIcon, X } from "lucide-react";
import { Button } from "../ui/button";

export interface SearchProps {
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
  pushUrl?: string;
  placeholder?: string;
}

export default function Search({
  onSubmit: externalOnSubmit,
  onChange: externalOnChange,
  pushUrl,
  placeholder = "Search...",
}: Readonly<SearchProps>) {
  const [searchValue, setSearchValue] = useState<string>("");

  const router = useRouter();

  const handleOnChange = (value: string) => {
    setSearchValue(value);
    externalOnChange?.(value);
  };

  const handleOnClear = () => {
    setSearchValue("");
    externalOnChange?.("");
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!!pushUrl) {
      const url = queryString.stringifyUrl(
        {
          url: pushUrl,
          query: {
            term: searchValue,
          },
        },
        {
          skipEmptyString: true,
        }
      );
      router.push(url);
    }

    externalOnSubmit?.(searchValue);
  };

  return (
    <form
      className="w-full lg:w-[400px] flex items-center"
      onSubmit={handleOnSubmit}
    >
      <div className="relative w-full">
        <Input
          placeholder={placeholder}
          value={searchValue}
          className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 pr-8"
          onChange={(e) => {
            handleOnChange(e.target.value);
          }}
        />
        {searchValue && (
          <X
            size={18}
            className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-2"
            onClick={handleOnClear}
          />
        )}
      </div>

      <Button
        variant={"secondary"}
        className="rounded-l-none"
        type="submit"
        size="sm"
        disabled={!externalOnSubmit}
      >
        <SearchIcon size={18} />
      </Button>
    </form>
  );
}
