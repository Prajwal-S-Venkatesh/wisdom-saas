"use client";

import { LandingHero } from "@/components/landing-hero";
import { LandingNavBar } from "@/components/landing-navbar";
import React from "react";

const LandingLayout = () => {
  return (
    <div className="h-full bg-gray-900">
      <LandingNavBar />
      <LandingHero />
    </div>
  );
};

export default LandingLayout;
