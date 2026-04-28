"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export default function SidebarNavHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="cursor-default hover:bg-transparent active:bg-transparent"
        >
          <div className="flex size-10 items-center justify-center rounded-2xl bg-linear-to-br from-primary via-chart-4 to-chart-2 shadow-[0_22px_46px_-24px_rgba(214,119,61,0.95)] ring-1 ring-white/40">
            <span className="font-display text-xl font-semibold text-primary-foreground">
              V
            </span>
          </div>

          {!isCollapsed && (
            <div className="group flex cursor-pointer items-center gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="font-display text-lg font-semibold tracking-tight">
                  VidSurvey
                </span>
                <span className="text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-sidebar-foreground/62">
                  Control Room
                </span>
              </div>
            </div>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
