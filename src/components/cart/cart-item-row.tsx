"use client";

import Image from "next/image";
import {useCartStore} from "@/store/use-cart-store";
import {Button} from "@/components/ui/button";
import {Minus, Plus, Trash2, Loader2} from "lucide-react";
import {Prisma} from "@/generated/prisma/client";

type CartType = Prisma.CartItemGetPayload<{
  include: {
    product: true;
  };
}>;

interface CartItemRowProps {
  item: CartType;
}

export default function CartItemRow({item}: CartItemRowProps) {
  const {update, loadingId} = useCartStore();
  const isLoading = loadingId === item.id;

  return (
    <div className="flex container mx-auto items-center gap-4 p-4 border rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
      {/* Product Image */}
      <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={item.product.thumbnail}
          alt={item.product.title}
          fill
          className="object-cover"
          loading="eager"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-slate-800 line-clamp-1 ">
          {item.product.title}
        </h4>
        <p className="text-blue-600 font-bold mt-1">
          ${item.product.price.toLocaleString()}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-1 border rounded-md p-1 bg-slate-50">
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-slate-500"
            onClick={() => update?.(item.id, "minus")}
            disabled={isLoading}
          >
            {item.quantity <= item.product.minimumOrderQuantity ? (
              <Trash2 className="h-4 w-4 text-red-500" />
            ) : (
              <Minus className="h-4 w-4" />
            )}
          </Button>

          <div className="w-8 text-center font-medium">
            {isLoading ? (
              <Loader2 className="h-3 w-3 animate-spin mx-auto" />
            ) : (
              item.quantity
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-slate-500"
            onClick={() => update?.(item.id, "plus")}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground font-medium">
          Sub: ${(item.product.price * item.quantity).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
