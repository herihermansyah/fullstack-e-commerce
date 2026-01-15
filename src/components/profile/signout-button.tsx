"use client";
import {signOut} from "next-auth/react";

export function SignOut() {
  return (
    <div className="cursor-pointer" onClick={() => signOut()}>
      Sign Out
    </div>
  );
}
