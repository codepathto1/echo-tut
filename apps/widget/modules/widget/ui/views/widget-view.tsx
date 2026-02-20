import { WidgetFooter } from "@/modules/widget/components/widget-footer";
import { WidgetHeader } from "@/modules/widget/components/widget-header";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  return (
    <main className=" min-h-screen flex min-w-screen  h-full w-full flex-col overflow-hidden border bg-muted  ">
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-4 font-semibold">
          <p className="text-3xl">Hi there!👋</p>
          <p className="text-lg">How can we help you,today?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 p-5">Organization id:{organizationId}</div>
      <WidgetFooter />
    </main>
  );
};
