"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export const LandingNavBar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-2 user-select-none pointer-events-none">
          <Image fill alt="Wisdom Logo" src="/logo.png" />
        </div>
        <h1 className="text-2xl font-semibold text-white">Wisdom</h1>
      </Link>
      <div className="flex items-center gap-x-4">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
