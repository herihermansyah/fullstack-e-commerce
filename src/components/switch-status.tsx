"use client";

import React, {useTransition} from "react";
import {Switch} from "./ui/switch";
import {Label} from "./ui/label";
import {toast} from "sonner";
import {Ban, Loader2, ShieldCheck} from "lucide-react";

interface SwitchStatusProps {
  id: string;
  isStatus: boolean;
  labelName: string;
  action: () => Promise<{success?: boolean; error?: string}>;
}

export function SwitchStatus({
  id,
  isStatus,
  labelName,
  action,
}: SwitchStatusProps) {
  const [isPending, startTransition] = useTransition();

  const handleChange = () => {
    startTransition(async () => {
      const result = await action();
      if (result.success) {
        toast.success(`${labelName} deactivated successfully`);
      } else {
        toast.error(`${labelName} failed to deactivate`);
      }
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        checked={isStatus}
        disabled={isPending}
        onCheckedChange={handleChange}
        className="data-[state=checked]:bg-green-500"
      />
      <Label htmlFor={id}>
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
        ) : isStatus ? (
          <div className="flex items-center gap-1 text-green-600 font-medium text-xs">
            <ShieldCheck className="h-4 w-4" /> ACTIVE
          </div>
        ) : (
          <div className="flex items-center gap-1 text-red-600 font-medium text-xs">
            <Ban className="h-4 w-4" /> BLOCK
          </div>
        )}
      </Label>
    </div>
  );
}
