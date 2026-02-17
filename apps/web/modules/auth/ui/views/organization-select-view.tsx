import { OrganizationList } from "@clerk/nextjs";

export const OrganizationSelectView = () => {
  return (
    <OrganizationList hidePersonal afterCreateOrganizationUrl="/" afterSelectOrganizationUrl="/" skipInvitationScreen />
  );
};
