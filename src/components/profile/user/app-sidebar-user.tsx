"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {LogOut} from "lucide-react";
import Link from "next/link";
import {SignOut} from "../signout-button";

type UserType = {
  id: string;
  image: string;
  name: string;
};

interface AppSidebarUserProps {
  user: UserType;
}

export function AppSidebarUser({user}: AppSidebarUserProps) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            className="object-cover"
            src={user?.image ?? ""}
            alt={user?.name || ""}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href={`/profile/${user?.id}/preview`}
              className="w-full cursor-pointer"
            >
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/orders" className="w-full cursor-pointer">
              Order History
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogOut />
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
