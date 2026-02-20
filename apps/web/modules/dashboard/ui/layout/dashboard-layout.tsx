import { AuthGaurd } from "@/modules/auth/ui/components/auth-guard";
import { OrganizationGuard } from "@/modules/auth/ui/components/oarganization-guard";

import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { cookies } from "next/headers";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

export const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <AuthGaurd>
      <OrganizationGuard>
        {/*Sets the defauly sidebar state even during SSR */}
        <SidebarProvider defaultOpen={defaultOpen}>
          <DashboardSidebar />
          <main className="flex flex-1 flex-col ">{children}</main>
        </SidebarProvider>
      </OrganizationGuard>
    </AuthGaurd>
  );
};
