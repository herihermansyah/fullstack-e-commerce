"use client";

import {MoveLeft} from "lucide-react";
import {useRouter} from "next/navigation";
import React from "react";

function ButtonBack() {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500" onClick={() => router.back()}>
      <MoveLeft className="cursor-pointer" size={20} />
      <span>back</span>
    </div>
  );
}

export default ButtonBack;
