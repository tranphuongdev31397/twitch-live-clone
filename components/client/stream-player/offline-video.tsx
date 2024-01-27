import { WifiOffIcon } from "lucide-react";

export interface OfflineVideoProps {
  username: string;
}

export default function OfflineVideo({ username }: OfflineVideoProps) {
  return (
    <div className="flex space-y-4 justify-center items-center h-full flex-col">
      <WifiOffIcon size={40} className="text-muted-foreground" />
      <p className="font-semibold text-muted-foreground">
        {username} is offline!
      </p>
    </div>
  );
}
