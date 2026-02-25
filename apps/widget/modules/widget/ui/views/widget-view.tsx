"use client";
import { WidgetAuthScreen } from "@/modules/widget/ui/screen/widget-screen";
import { useAtomValue } from "jotai";
import { ScreenAtom } from "@/modules/widget/atoms/screen-atom";
interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(ScreenAtom);
  const screenComponents = {
    error: <p>error</p>,
    loading: <p>loading</p>,
    auth: <WidgetAuthScreen />,
    voice: <p>voice</p>,
    selection: <p>selection</p>,
    chat: <p>chat</p>,
    inbox: <p>inbox</p>,
  };
  return (
    <main className=" min-h-screen flex min-w-screen  h-full w-full flex-col overflow-hidden border bg-muted  ">
      <WidgetAuthScreen />
      <div className="flex flex-1 p-5">Organization id:{organizationId}</div>
      {/* <WidgetFooter /> */}
    </main>
  );
};
