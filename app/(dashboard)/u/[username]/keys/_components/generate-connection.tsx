"use client";
import { createIngress } from "@/actions/ingress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IngressInput } from "livekit-server-sdk";
import { AlertTriangleIcon } from "lucide-react";
import { ElementRef, useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const RMTP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressTypes = typeof RMTP | typeof WHIP;

export default function GenerateConnection() {
  const [ingressType, setIngressType] = useState<IngressTypes>(RMTP);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const onSubmit = () => {
    startTransition(() => {
      createIngress(+ingressType)
        .then((res) => {
          // closeRef?.current?.click();
          toast.success("Ingress generated!");
          setOpen(false);
        })
        .catch((error: any) => {
          toast.error(error.message || "Some thing went wrong!");
        });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Generate Connect</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate connection</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RMTP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangleIcon size={16} />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current
            connection!
          </AlertDescription>
        </Alert>
        <div className="flex items-center justify-between">
          <DialogClose asChild>
            <Button disabled={isPending} variant={"destructive"}>
              Close
            </Button>
          </DialogClose>
          <Button loading={isPending} onClick={onSubmit}>
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
