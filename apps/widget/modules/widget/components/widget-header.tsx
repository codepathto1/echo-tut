import { cn } from "@workspace/ui/lib/utils";
import React from "react";

export const WidgetHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <header
      className={cn("bg-linear-to-b from-primary to-[#3e8bf5] p-4 text-primary-foreground rounded-t-xl", className)}>
      {children}
    </header>
  );
};

// 3e8bf5
