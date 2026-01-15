"use client";

import {useCartStore} from "@/store/use-cart-store";
import React from "react";
import {Button} from "../ui/button";
import {Loader2, ShoppingCart} from "lucide-react";

interface AddToCartProps {
  userId: string;
  productId: string;
  quantity: number;
}

function AddToCart({userId, productId, quantity}: AddToCartProps) {
  const {loadingId, add} = useCartStore();

  const isLoading = loadingId === productId;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) return;
    await add?.(userId, productId, quantity);
  };

  return (
    <Button
  
      onClick={handleAddToCart}
      disabled={isLoading}
      variant="outline"
      size="sm"
      className="border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors w-full"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <ShoppingCart className="mr-1" size={14} />
      )}
    </Button>
  );
}

export default AddToCart;
