"use client";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";

import { useQuery } from "convex/react";
import { useMutation } from "convex/react";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export default function Page() {
  const users = useQuery(api.users.getAllUser);
  const addUser = useMutation(api.users.addUsers);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <div>
          <h2>app/web</h2>
        </div>

        <Button onClick={() => addUser()}>Add User</Button>
        <UserButton />
        <OrganizationSwitcher />
      </div>
    </>
  );
}
