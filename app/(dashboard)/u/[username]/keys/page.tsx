import * as React from "react";
import GenerateConnection from "./_components/generate-connection";
import UrlsCard from "./_components/urls-card";
import KeyCard from "./_components/key-card";
import AuthService from "@/prisma/services/auth.service";
import StreamService from "@/prisma/services/stream.service";

export interface KeysPageProps {}

export default async function KeysPage(props: KeysPageProps) {
  const self = await AuthService.getSelf();
  const stream = await StreamService.getStreamByUserId(self.id);
  if (!stream) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-2xl">Keys and Urls</h1>
        <GenerateConnection />
      </div>
      <div className="space-y-4">
        <UrlsCard value={stream?.serverUrl || ""} />
        <KeyCard value={stream?.streamKey || ""} />
      </div>
    </div>
  );
}
