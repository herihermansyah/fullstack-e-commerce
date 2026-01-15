"use client";

import {Prisma} from "@/generated/prisma/client";
import React from "react";
import {Card, CardContent} from "../ui/card";
import {Separator} from "../ui/separator";
import CheckoutButton from "../checkout-button";
import {AddressInfo} from "./address-info";
import {PaymentInfo} from "./payment-info";

type AdddressProps = Prisma.AddressGetPayload<{
  select: {
    id: true;
    label: true;
    fullAddress: true;
    city: true;
  };
}>;

type PaymentProps = Prisma.PaymentMethodGetPayload<{
  select: {
    id: true;
    bankName: true;
    cardHolder: true;
    cardNumber: true;
  };
}>;

interface CartSummaryProps {
  userId: string;
  subTotal: string;
  address: AdddressProps;
  paymentMethods: PaymentProps;
}

function CartSummary({
  userId,
  subTotal,
  address,
  paymentMethods,
}: CartSummaryProps) {
  return (
    <Card className="sticky top-24">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        <AddressInfo address={address} />

        <PaymentInfo payment={paymentMethods} />

        <div className="space-y-2">
          <div className="flex justify-between text-muted-foreground">
            <span>Sub-Total</span>
            <span>${subTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${subTotal.toLocaleString()}</span>
          </div>
        </div>

        <CheckoutButton
          userId={userId}
          addressId={address?.id}
          paymentMethodId={paymentMethods?.id}
        />
      </CardContent>
    </Card>
  );
}

export default CartSummary;
