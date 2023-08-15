"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";

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

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-center w-full animate-[bounce_5s_ease-out_infinite]">
          <Image
            src="/logo.png"
            alt="Empty"
            width={64}
            height={64}
            className="animate-[pulse_5s_ease-in-out_infinite] user-select-none pointer-events-none"
          />
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Quantum Threads of the Futureverse
        </h2>
        <p className="text-muted-foreground text-center font-light text-sm md:text-lg">
          {" "}
          Converse with the Apex of AI: Witness the Pinnacle of Digital Power.
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            key={tool.href}
            className="p-4 border-black/10 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            onClick={() => router.push(tool.href)}
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>

            <ArrowRight className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          </Card>
        ))}
      </div>
    </div>
  );
}
