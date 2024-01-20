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
  disabled?: boolean;
  side?: "top" | "bottom" | "right" | "left";
  align?: "start" | "end" | "center";
  className?: string;
}

export default function Hint({
  label,
  children,
  side = "top",
  align = "center",
  disabled = true,
  asChild,
  className,
}: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger
          className={className}
          disabled={disabled}
          asChild={asChild}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent
          className="text-black bg-white border-transparent"
          side={side}
          align={align}
        >
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
