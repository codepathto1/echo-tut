"use client";

import { useOrganization } from "@clerk/nextjs";
import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout";
import { OrganizationSelectView } from "@/modules/auth/ui/views/organization-select-view";

export const OrganizationGuard = ({ children }: { children: React.ReactNode }) => {
  const { organization } = useOrganization();
  if (!organization) {
    return (
      <div>
        <OrganizationSelectView />
      </div>
    );
  }
  return <AuthLayout>{children}</AuthLayout>;
};
