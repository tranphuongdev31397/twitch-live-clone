"use client";

import { useParticipants } from "@livekit/components-react";
import Search from "@/components/client/search";
import { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import CommunityItem from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

export interface ChatCommunityProps {
  isHidden: boolean;
  hostName: string;
  viewerName: string;
}

export default function ChatCommunity({
  isHidden,
  hostName,
  viewerName,
}: ChatCommunityProps) {
  const participants = useParticipants();
  const [value, setValue] = useState<string>("");
  const debounceSearch = useDebounce(value, 500);

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((p) =>
      p.name?.toLocaleLowerCase().includes(debounceSearch.toLocaleLowerCase())
    );
  }, [participants, debounceSearch]);
  //   if (isHidden) {
  //     return <div></div>;
  //   }
  return (
    <div className="p-3">
      <Search
        className="lg:w-full"
        placeholder="Search community"
        onChange={(search) => setValue(search)}
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-muted-foreground font-semibold text-sm hidden last:block">
          No results
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity} // id user
          />
        ))}
      </ScrollArea>
    </div>
  );
}
