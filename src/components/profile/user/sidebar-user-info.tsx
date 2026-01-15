import {auth} from "@/auth";
import React from "react";
import {AppSidebarUser} from "./app-sidebar-user";

async function SidebarUserInfo() {
  const session = await auth();

  if (!session) return null;

  const userData = {
    id: session.user.id || "",
    name: session.user.name || "",
    image: session.user.image || "",
  };
  return (
    <div>
      <AppSidebarUser user={userData} />
    </div>
  );
}

export default SidebarUserInfo;
