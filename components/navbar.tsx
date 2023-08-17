"use client";

import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Navbar = ({ apiLimitCount }: { apiLimitCount: number }) => {
  const { setTheme, theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("");

  useEffect(() => {
    setCurrentTheme(
      theme === "system"
        ? systemTheme === "light"
          ? "light"
          : "dark"
        : theme === "light"
        ? "light"
        : "dark"
    );
  }, [theme, systemTheme]);

  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimitCount={apiLimitCount} />
      <div className="flex w-full items-center justify-end gap-8">
        <Switch
          checked={currentTheme === "dark"}
          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-readonly
          className="text-red-500"
          theme={currentTheme}
        />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
