"use client";

import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {useTransition} from "react";
import {toast} from "sonner";
import {Loader2, ShieldCheck, User} from "lucide-react";
import { changeRole } from "../action";

interface SwitchUserProps {
  userId: string;
  role: string;
}

export function SwitchRole({userId, role}: SwitchUserProps) {
  const [isPending, startTransition] = useTransition();
  const isAdmin = role === "ADMIN";

  const handleRole = () => {
    startTransition(async () => {
      const result = await changeRole(userId);
      if (result.success) {
        toast.success("change role success");
      } else {
        toast.error("Failed to change role");
      }
    });
  };

  return (
    <div className="flex items-center space-x-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
      <Switch
        id={`switch-role-${userId}`}
        checked={isAdmin}
        disabled={isPending}
        onCheckedChange={handleRole}
        className="data-[state=checked]:bg-green-500"
      />
      <Label
        htmlFor={`switch-role-${userId}`}
        className="cursor-pointer flex items-center gap-2"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
        ) : isAdmin ? (
          <div className="flex items-center gap-1 text-green-600 font-medium text-xs">
            <ShieldCheck className="h-4 w-4 text-indigo-600" /> ADMIN
          </div>
        ) : (
          <div className="flex items-center gap-1 text-red-600 font-medium text-xs">
            <User className="h-4 w-4 text-slate-400" /> USER
          </div>
        )}
      </Label>
    </div>
  );
}
