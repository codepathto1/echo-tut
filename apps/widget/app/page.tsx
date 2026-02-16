"use client";

import { Button } from "@workspace/ui/components/button";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

export default function Page() {
  const users = useQuery(api.users.getAllUser);
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">App/Widget</h1>
        <div className="flex gap-2">
          <Button>Button</Button>
        </div>
        <div className="flex flex-col max-w-sm w-full">{JSON.stringify(users, null, 2)}</div>
      </div>
    </div>
  );
}
