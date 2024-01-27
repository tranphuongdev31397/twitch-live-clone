import { Gamepad2Icon } from "lucide-react";

export interface LoadingVideoProps {
  state: string;
}

export default function LoadingVideo({ state }: LoadingVideoProps) {
  return (
    <div className="flex space-y-4 justify-center items-center animate-pulse h-full flex-col">
      <Gamepad2Icon size={40} className="text-muted-foreground" />
      <p className="font-semibold text-muted-foreground capitalize">{state}</p>
    </div>
  );
}
