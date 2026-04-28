"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardSidebar from "./app-sidebar";
import { ModeToggle } from "../mode-toggle";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset className="bg-transparent">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(214,119,61,0.16),transparent_55%)]" />

        <header className="sticky top-0 z-20 mx-4 mt-4 flex h-16 shrink-0 items-center justify-between gap-2 rounded-full border border-border/70 bg-background/76 px-5 shadow-[0_22px_50px_-34px_rgba(20,29,47,0.45)] backdrop-blur-xl md:mx-6">
          <SidebarTrigger className="-ml-1" />

          <ModeToggle />
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-6 px-4 pb-8 pt-4 md:px-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
