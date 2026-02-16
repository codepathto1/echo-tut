import { Button } from "@workspace/ui/components/button";
import { subtract } from "@workspace/math/add";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">App/Widget</h1>
        <div className="flex gap-2">
          <Button>Button</Button>
          {subtract(2, 8)}
        </div>
      </div>
    </div>
  );
}
