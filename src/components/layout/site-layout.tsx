"use client";
import React from "react";
import {usePathname} from "next/navigation";

function SiteLayout({
  children,
  header,
  footer,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin") || pathname.startsWith("/login") || pathname.startsWith("/signup") ;
  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <div className="sticky top-0 z-50">{header}</div>}
      <main className="flex-1">{children}</main>
      {!isAdminPage && <div className="sticky bottom-0 z-50">{footer}</div>}
    </div>
  );
}

export default SiteLayout;
