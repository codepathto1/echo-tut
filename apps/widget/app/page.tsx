"use client";

import { use } from "react";
import { WidgetView } from "@/modules/widget/ui/views/widget-view";

import { Button } from "@workspace/ui/components/button";
interface Props {
  searchParams: Promise<{
    organizationId: string;
  }>;
}

export default function Page({ searchParams }: Props) {
  const { organizationId } = use(searchParams);
  return <WidgetView organizationId={organizationId} />;
}
