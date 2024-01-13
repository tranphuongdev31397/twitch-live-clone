import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface HintProps {
  label: React.ReactNode;
  children: React.ReactNode;
  asChild?: boolean;
  side?: "top" | "bottom" | "right" | "left";
  align?: "start" | "end" | "center";
}

export default function Hint({
  label,
  children,
  side = "top",
  align = "center",
  asChild,
}: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          className="text-black bg-white"
          side={side}
          align={align}
        >
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
