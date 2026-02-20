"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LibraryBigIcon,
  CreditCardIcon,
  HeadphonesIcon,
  InboxIcon,
  PaletteIcon,
  LayoutDashboardIcon,
  Mic,
  User2Icon,
} from "lucide-react";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  SidebarContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
} from "@workspace/ui/components/sidebar";
import { TooltipProvider } from "@workspace/ui/components/tooltip";
import { cn } from "@workspace/ui/lib/utils";

const customerSupportItems = [
  {
    title: "Conversations",
    url: "/conversations",
    icon: InboxIcon,
  },
  {
    title: "Knowledge base",
    url: "/files",
    icon: LibraryBigIcon,
  },
];
const confirgurationItems = [
  {
    title: "Widget Customization",
    url: "/customization",
    icon: PaletteIcon,
  },
  {
    title: "Integrations",
    url: "/integrations",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Voice Assistant",
    url: "/plugins/vapi",
    icon: Mic,
  },
];

const accountItems = [
  {
    title: "Account Settings",
    url: "/profile",
    icon: User2Icon,
  },
  {
    title: "Billing",
    url: "/billings",
    icon: CreditCardIcon,
  },
];
export const DashboardSidebar = () => {
  const pathName = usePathname();
  const isActive = (url: string) => {
    if (url === "/") {
      return pathName === "/";
    }
    return pathName.startsWith(url);
  };
  return (
    <Sidebar collapsible="icon" className="group">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <OrganizationSwitcher
                hidePersonal
                skipInvitationScreen
                appearance={{
                  elements: {
                    rootBox: "w-full! h-8!",
                    avatarBox: "size-4 rounded-sm",
                    organizationSwitcherTrigger:
                      "group-data-[collapsible=icon]:size-8! group-data[collapsible=icon]:p-2! w-full! justify-start!",
                    organizationPreview: "group-data-[collapsible=icon]:justify-center! gap-2!",
                    organizationPreviewTextContainer:
                      "group-data-[collapsible=icon]:hidden! text-xs! font-medium! text-sidebar-foreground!",
                  },
                }}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/*Customer Support*/}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Customer Support</SidebarGroupLabel>
            <SidebarMenu>
              {customerSupportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <TooltipProvider>
                    <SidebarMenuButton
                      className={cn(
                        isActive(item.url) &&
                          "bg-linear-to-b from-sidebar-primary to-[#3e8bf5]! text=sidebar-primary-foreground! hover:to-[#3e8bf5]/90!",
                      )}
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipProvider>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/*Configurations*/}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Configurations</SidebarGroupLabel>
            <SidebarMenu>
              {confirgurationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <TooltipProvider>
                    <SidebarMenuButton
                      className={cn(
                        isActive(item.url) &&
                          "bg-linear-to-b from-sidebar-primary to-[#3e8bf5]! text-sidebar-foreground@ hover:to-[#3e8bf5]/90!",
                      )}
                      asChild
                      isActive={isActive(item.url)}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipProvider>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/*Account Items*/}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <TooltipProvider>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                      className={cn(
                        isActive(item.url) &&
                          "bg-linear-to-b from-sidebar-primary to-[#3e8bf5] text-sidebar-foreground! hover:to-[#3e8bf5]/90! ",
                      )}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipProvider>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton
              showName
              appearance={{
                elements: {
                  rootBox: "w-full! h-8!",
                  userButtonTrigger:
                    "w-full! p-2! hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground! group-data[collapsible=icon]:p-2!",
                  userButtonBox:
                    "w-full! flex flex-row-reverse! justify-end! gap-2! test-data-[collapsible=icon]:justify-center text-sidebar-foreground!  ",
                  userButtonOuterIdentifier: "group-data-[collapsible=icon]:hidden! pl-0!",
                  avatarBox: "size-5! rounded-md!",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
