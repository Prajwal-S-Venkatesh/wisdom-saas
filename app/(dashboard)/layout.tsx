import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();

  return (
    <div className="relative h-full bg-gray-50">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-800">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72 pb-4 dark:bg-stone-950 h-full">
        <Navbar apiLimitCount={apiLimitCount} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
