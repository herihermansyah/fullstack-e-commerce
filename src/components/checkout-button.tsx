"use client";

import {useCartStore} from "@/store/use-cart-store";
import {useRouter} from "next/navigation";
import React from "react";
import {toast} from "sonner";
import {Button} from "./ui/button";
import {Loader2} from "lucide-react";

interface CheckoutButtonProps {
  userId: string;
  addressId: string;
  paymentMethodId: string;
}

function CheckoutButton({
  userId,
  addressId,
  paymentMethodId,
}: CheckoutButtonProps) {
  const {checkOut, loadingId} = useCartStore();
  const router = useRouter();
  const isLoading = loadingId === "checkOut";

  const isReady = !!userId && !!addressId && !!paymentMethodId;

  const handleCheckout = async () => {
    if (!isReady) {
      toast.error(
        "Please set the address and payment method in your profile first!"
      );
      return;
    }
    try {
      const order = await checkOut(userId, addressId!, paymentMethodId!);

      if (order) {
        toast.success("Payment successful! Your order is being processed.");
        router.push(`/orders/${order.id}`); 
      }
    } catch (error) {
      toast.error("Oops, payment process failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading || !isReady}
      className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-bold shadow-lg"
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="animate-spin" /> Processing...
        </span>
      ) : (
        "Checkout Now"
      )}
    </Button>
  );
}

export default CheckoutButton;
