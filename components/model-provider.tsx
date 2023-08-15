"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import {
  Check,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-lime-500",
    bgColor: "bg-lime-500/10",
    href: "/conversation",
  },

  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-rose-500",
    bgColor: "bg-rose-600/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
];

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
      <Dialog open={proModal.visible} onOpenChange={proModal.onClose}>
        <DialogContent className="dark:bg-stone-950 dark:border-zinc-800">
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
              <div className="flex items-center gap-x-2 font-bold py-1">
                Upgrade to Wisdom
                <Badge variant="premium" className="uppercase text-xs">
                  Pro
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription>
              <p className="text-muted-foreground text-sm text-center mb-2">
                Unlock all the tools and features to generate images, videos,
                music, code and more at just $30/month. Cancel anytime.
              </p>
              {tools.map((tool, index) => (
                <Card
                  key={tool.href}
                  className="p-4 border-black/5 flex items-center justify-between mb-2 dark:bg-stone-950 dark:border-zinc-800"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("w-8 h-8", tool.color)} />
                    </div>
                    <div className="font-semibold">{tool.label}</div>
                  </div>

                  <Check className="w-5 h-5 text-green-500" />
                </Card>
              ))}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="premium" size="lg" className="w-full">
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};
