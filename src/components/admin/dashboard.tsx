import {AppSidebar} from "@/components/admin/app-sidebar";
import ButtonBack from "@/components/button-back";
import SidebarInfoAdmin from "@/components/admin/sidebar-info-admin";
import {Separator} from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

export default function Dashboard({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <div>
            <SidebarInfoAdmin />
          </div>
        </header>
        <main className="px-4">
          <div className="mb-5">
            <ButtonBack />
          </div>
          <div className="mb-5">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
