import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { HomeIcon, InboxIcon } from "lucide-react";

export const WidgetFooter = () => {
  const screen = "selection";
  return (
    <footer className="flex items-center  justify-between border-t bg-background">
      <Button className="h-14 rounded-none flex-1" variant="ghost">
        <HomeIcon className={cn("size-5", screen === "selection" && "text-primary")} />
      </Button>
      <Button className="h-14 rounded-none flex-1" variant="ghost">
        <InboxIcon className={cn("size-5", screen === "message" && "text-primary")} />
      </Button>
    </footer>
  );
};
