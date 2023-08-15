"use client";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const [mounted, setMounted] = useState(false);
  const user = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage your account settings."
        icon={Settings}
        iconColor="text-stone-900 dark:text-stone-300"
        bgColor="bg-stone-900/10 dark:bg-stone-300/10"
      />
      <div className="px-4 lg:px-8">
        <Card className="w-full h-full py-4 px-8">
          <div className="flex items-center my-4">
            <UserAvatar />
            <p className="text-muted-foreground text-bold ml-2">
              Signed in as @{user.user?.fullName}
            </p>
          </div>
          <hr className="my-6" />
          <h1 className="text-2xl font-semibold mb-4">Account Details</h1>
          <div className="flex flex-col gap-1 text-lg">
            <div className="flex items-center">
              <p className="text-extrabold">User ID: </p>
              <p className="text-muted-foreground text-bold ml-16">
                {user.user?.id}
              </p>
            </div>

            <div className="flex items-center">
              <p className="text-extrabold">Password: </p>
              <p className="text-muted-foreground text-bold ml-10">
                {user.user?.passwordEnabled ? "Configured" : "Not Configured"}
              </p>
            </div>
          </div>

          <hr className="my-6" />
          <h1 className="text-2xl font-semibold mb-4">User Details</h1>

          <div className="flex flex-col gap-1 text-lg">
            <div className="flex items-center">
              <p className="text-extrabold">First Name: </p>
              <p className="text-muted-foreground text-bold ml-8">
                {user.user?.firstName}
              </p>
            </div>

            <div className="flex items-center">
              <p className="text-extrabold">Last Name: </p>
              <p className="text-muted-foreground text-bold ml-8">
                {user.user?.lastName}
              </p>
            </div>

            <div className="flex items-center">
              <p className="text-extrabold">Email:</p>
              <p className="text-muted-foreground text-bold ml-20">
                {user.user?.emailAddresses[0].emailAddress}
                <Badge variant="secondary" className="pt-1 ml-2">
                  Verified
                </Badge>
              </p>
            </div>

            <div className="flex items-center">
              <p className="text-extrabold">Phone: </p>
              <p className="text-muted-foreground text-bold ml-16 pl-1">
                {user.user?.primaryPhoneNumber?.phoneNumber || "None"}
              </p>
            </div>

            <div className="flex items-center">
              <p className="text-extrabold">Last Sign In: </p>
              <p className="text-muted-foreground text-bold ml-6">
                {user.user?.lastSignInAt
                  ? user.user?.lastSignInAt?.toLocaleDateString() +
                    " at " +
                    user.user?.lastSignInAt?.toLocaleTimeString()
                  : "Never"}
              </p>
            </div>
          </div>

          <hr className="my-6" />

          <SignOutButton>
            <Button
              variant="default"
              className="text-bold text-white bg-gray-900 dark:text-black dark:bg-gray-100"
            >
              Sign Out
            </Button>
          </SignOutButton>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
