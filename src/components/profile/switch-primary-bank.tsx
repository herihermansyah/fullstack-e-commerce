"use client";

import React, {useTransition} from "react";
import {Switch} from "../ui/switch";
import {Label} from "../ui/label";
import {toast} from "sonner";
import {Loader2, Star} from "lucide-react";

interface SwitchPrimaryProps {
  id: string;
  isPrimary: boolean;
  labelName: string;
  action: () => Promise<{success?: boolean; error?: string}>;
}

export default function SwitchPrimary({
  id,
  isPrimary,
  labelName,
  action,
}: SwitchPrimaryProps) {
  const [isPending, startTransition] = useTransition();

  const handleChangePrimary = (checked: boolean) => {
    if (!checked) return;
    startTransition(async () => {
      const result = await action();
      if (result.success) {
        toast.success(`managed to become the main one${labelName}`);
      } else {
        toast.error(`failed to be the main one ${labelName}`);
      }
    });
  };
  return (
    <div className="flex items-center space-x-2">
      <Switch
        className="data-[state=checked]:bg-green-500"
        id={id}
        checked={isPrimary}
        onCheckedChange={handleChangePrimary}
        disabled={isPending}
      />
      <Label htmlFor={id}>
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
        ) : isPrimary ? (
          <div className="flex items-center gap-1 text-green-600 font-medium text-xs">
            <Star className="h-4 w-4 text-yellow-500" /> PRIMARY
          </div>
        ) : (
          <div className="flex items-center gap-1 text-gray-500 font-medium text-xs">
            <Star className="h-4 w-4 text-gray-500" /> SET AS PRIMARY
          </div>
        )}
      </Label>
    </div>
  );
}
