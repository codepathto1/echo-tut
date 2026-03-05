"use client";
import { WidgetHeader } from "@/modules/widget/components/widget-header";
import { errorMessageAtom } from "@/modules/widget/atoms/screen-atom";
import { useAtomValue } from "jotai";
import { TriangleAlert } from "lucide-react";
export const WidgetErrorScreen = () => {
  const errorMessage = useAtomValue(errorMessageAtom);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-4 font-semibold">
          <p className="text-3xl">Hi there!👋</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col gap-y-3 items-center justify-center">
        <TriangleAlert className="" />
        <p className="text-sm">{errorMessage || "Error"}</p>
      </div>
    </>
  );
};
