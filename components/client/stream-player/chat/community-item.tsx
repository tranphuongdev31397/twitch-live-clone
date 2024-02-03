import { cn, stringToHexColor } from "@/lib/utils";
import Hint from "../../hint";
import { Button } from "@/components/ui/button";
import { BanIcon } from "lucide-react";
import { onBlock } from "@/actions/block";
import { useTransition } from "react";
import { toast } from "sonner";

export interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export default function CommunityItem({
  hostName,
  participantName,
  viewerName,
  participantIdentity,
}: CommunityItemProps) {
  const color = stringToHexColor(participantName ?? "");
  const isSelf = viewerName === participantName;
  const isHost = hostName === viewerName;
  const [isPending, startTransaction] = useTransition();
  const handleBlock = () => {
    if (isSelf || !isHost) {
      toast.warning("You can't block yourself!");
      return;
    }
    onBlock(participantIdentity)
      .then(() => toast.success(`${viewerName} is blocked`))
      .catch((error: any) =>
        toast.error(error.message ?? "Something went wrong")
      );
  };
  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5"
      )}
    >
      <p style={{ color }} className="text-sm font-semibold">
        {participantName}
      </p>

      {!isSelf && isHost && (
        <Hint label="Block">
          <Button
            className="group-hover:opacity-100 h-auto w-auto p-1 transition"
            variant={"ghost"}
            onClick={handleBlock}
            disabled={isPending}
          >
            <BanIcon className="text-muted-foreground" size={16} />
          </Button>
        </Hint>
      )}
    </div>
  );
}
