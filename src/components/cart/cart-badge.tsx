"use client";

import {useCartStore} from "@/store/use-cart-store";
import {cn} from "@/lib/utils";

export function CartBadge() {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <div className="relative inline-flex items-center p-2 cursor-pointer transition-transform hover:scale-110">
      {totalItems > 0 && (
        <span
          className={cn(
            "absolute -top-0.5 -right-0.5",
            "bg-red-500 text-white text-[10px] font-bold",
            "h-5 w-5 flex items-center justify-center rounded-full",
            "border-2 border-blue-600",
            "animate-in zoom-in duration-300"
          )}
        >
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </div>
  );
}
