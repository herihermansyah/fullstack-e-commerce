import {auth} from "@/auth";
import React from "react";
import {NavUser} from "./nav-user";

async function SidebarInfoAdmin() {
  const session = await auth();

  if (!session) return null;

  const userData = {
    id: session.user.id || "",
    email: session.user.email || "",
    name: session.user.name || "",
    image: session.user.image || "",
  };

  return (
    <div>
      <NavUser user={userData} />
    </div>
  );
}

export default SidebarInfoAdmin;
