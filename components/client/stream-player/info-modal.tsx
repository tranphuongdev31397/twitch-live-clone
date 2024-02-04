"use client";

import { onSettingStream } from "@/actions/stream";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  ElementRef,
  FormEvent,
  useCallback,
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";
import Hint from "../hint";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

export interface InfoModalProps {
  initialName: string;
  initialThumb: string | null;
}

export default function InfoModal({
  initialName,
  initialThumb,
}: InfoModalProps) {
  const [value, setValue] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumb);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const isDirty = value !== initialName;

  const onHideModal = useCallback(() => {
    return closeRef?.current?.click();
  }, [closeRef.current]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isDirty) return;
    startTransition(() => {
      onSettingStream({
        name: value,
      })
        .then(() => {
          toast.success("Updated config stream!");
          onHideModal();
        })
        .catch((err: Error) => {
          toast.error(err.message ?? "Something went wrong");
        });
    });
  };

  const onRemoveThumb = () => {
    startTransition(() => {
      onSettingStream({
        thumbnailUrl: null,
      })
        .then(() => {
          toast.success("Updated thumbnail stream!");
          setThumbnailUrl(null);
          onHideModal();
        })
        .catch((err: Error) => {
          toast.error(err.message ?? "Something went wrong");
        });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Config your stream</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label htmlFor="name">Stream title</Label>
            <Input
              id="name"
              placeholder="Stream title..."
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative  flex items-center aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-10">
                  <Hint label="Remove thumbnail" asChild side="left">
                    <Button onClick={onRemoveThumb} variant={"teal"}>
                      <Trash2Icon size={"16"} />
                    </Button>
                  </Hint>
                </div>
                <div className="w-[200px] h-auto aspect-video mx-auto relative">
                  <Image
                    src={thumbnailUrl}
                    alt={"thumbnail"}
                    fill
                    objectFit="cover"
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#FFFFFF",
                    },
                    allowedContent: {
                      color: "#ffffff",
                    },
                  }}
                  onClientUploadComplete={(files) => {
                    setThumbnailUrl(files[0].url);
                    router.refresh();

                    onHideModal();
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant={"ghost"}>
                Cancel
              </Button>
            </DialogClose>
            <Hint disabled={isDirty} label="Please change something">
              <Button
                disabled={!isDirty}
                loading={isPending}
                type="submit"
                variant={"teal"}
              >
                Submit
              </Button>
            </Hint>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
