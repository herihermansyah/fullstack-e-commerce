"use client";

import * as React from "react";
import {PackageSearch, SquareTerminal, Store} from "lucide-react";

import {NavMain} from "@/components/admin/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {DashboardLogo} from "./dashboard-logo";

const data = {
  navMain: [
    {
      title: "Data",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "users",
          url: "/admin/usersdata",
        },
        {
          title: "orders",
          url: "/admin/ordersdata",
        },
      ],
    },
    {
      title: "Product",
      icon: PackageSearch,
      isActive: true,
      items: [
        {
          title: "All Product",
          url: "/admin/listproduct",
        },
        {
          title: "Add Product",
          url: "/admin/addproduct",
        },
        {
          title: "Add Category",
          url: "/admin/addcategory",
        },
      ],
    },

    {
      title: "Go To Shop",
      icon: Store,
      isActive: true,
      items: [
        {
          title: "All Products",
          url: "/products",
        },
        {
          title: "Carts",
          url: "/cartpage",
        },
        {
          title: "Orders",
          url: "/orders",
        },
      ],
    },
  ],
};

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
