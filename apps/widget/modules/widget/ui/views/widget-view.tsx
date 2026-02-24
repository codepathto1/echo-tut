// import { WidgetFooter } from "@/modules/widget/components/widget-footer";
// import { WidgetHeader } from "@/modules/widget/components/widget-header";
import { WidgetAuthScreen } from "@/modules/widget/ui/screen/widget-screen";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  return (
    <main className=" min-h-screen flex min-w-screen  h-full w-full flex-col overflow-hidden border bg-muted  ">
      <WidgetAuthScreen />
      <div className="flex flex-1 p-5">Organization id:{organizationId}</div>
      {/* <WidgetFooter /> */}
    </main>
  );
};
