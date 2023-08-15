"use client";

import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { MoveRightIcon } from "lucide-react";

export const LandingHero = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Productive AI tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-rose-500">
          <TypewriterComponent
            options={{
              strings: [
                "Conversation.",
                "Photo Generation.",
                "Video Generation.",
                "Music Generation.",
                "Code Generation.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-2xl font-light text-zinc-400">
        Create Content using AI 10x faster than ever.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="rounded md:text-lg p-4 md:p-6 rounded-full font-semibold"
            size="lg"
          >
            Start Generating for free
            <MoveRightIcon className="ml-4" />
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required. Cancel anytime.
      </div>
    </div>
  );
};
