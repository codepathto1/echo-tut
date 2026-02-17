import React from "react";
import { AuthGaurd } from "@/modules/auth/ui/components/auth-guard";
import { OrganizationGuard } from "@/modules/auth/ui/components/oarganization-guard";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGaurd>
      <OrganizationGuard>{children}</OrganizationGuard>
    </AuthGaurd>
  );
};

export default Layout;
