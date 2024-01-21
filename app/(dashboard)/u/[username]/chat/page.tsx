import AuthService from "@/prisma/services/auth.service";
import StreamService from "@/prisma/services/stream.service";
import * as React from "react";
import ToggleCard from "./_components/toggle-card";

export default async function ChatPage() {
  const self = await AuthService.getSelf();
  const stream = await StreamService.getStreamByUserId(self.id);
  if (!stream) {
    return null;
  }
  return (
    <div className="p-6 w-full">
      <div className="mb-4">
        <h1 className="font-bold text-2xl">Chat settings</h1>
      </div>

      <div className="space-y-4 w-full">
        <ToggleCard
          label="Chat Enabled"
          field="isChatEnabled"
          value={stream?.isChatEnabled}
        />
        <ToggleCard
          label="Chat Delay"
          field="isChatDelayed"
          value={stream?.isChatDelayed}
        />
        <ToggleCard
          label="Only followers"
          field="isChatFollowersOnly"
          value={stream?.isChatFollowersOnly}
        />
      </div>
    </div>
  );
}
