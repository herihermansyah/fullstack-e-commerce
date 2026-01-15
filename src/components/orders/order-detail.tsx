"use client";

import {Prisma} from "@/generated/prisma/client";
import Image from "next/image";
import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {
  Package,
  MapPin,
  CreditCard,
  Receipt,
  Clock,
  BadgeCheck,
} from "lucide-react";

type OrderType = Prisma.OrderGetPayload<{
  include: {
    address: true;
    items: true;
  };
}>;

interface OrderDetailProps {
  item: OrderType;
}

function OrderDetail({item}: OrderDetailProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("USD", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="mt-5 flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Order Details
          </h1>
          <p className="text-muted-foreground mt-1">
            Order ID:{" "}
            <span className="font-mono text-primary uppercase">
              #{item.id.slice(-8)}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="px-4 py-1 text-sm font-semibold capitalize"
          >
            {item.status === "PENDING" ? (
              <>
                <Clock className="w-3 h-3 mr-2" /> {item.status.toLowerCase()}
              </>
            ) : (
              <>
                <BadgeCheck className="w-3 h-3 mr-2" />{" "}
                {item.status.toLowerCase()}
              </>
            )}
          </Badge>
          <Badge
            className={`px-4 py-1 text-sm font-semibold ${
              item.paymentStatus === "PAID" ? "bg-green-600" : "bg-orange-500"
            }`}
          >
            {item.paymentStatus}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" /> Ordered Goods
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y p-0">
              {item.items.map((i) => (
                <div
                  key={i.id}
                  className="flex items-center gap-4 p-6 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="relative h-24 w-24 rounded-xl overflow-hidden border bg-white shrink-0 shadow-sm">
                    <Image
                      src={i.productImage}
                      alt={i.productName}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg text-slate-900 truncate">
                      {i.productName}
                    </h4>
                    <p className="text-sm text-muted-foreground font-medium">
                      {i.quantity} x {formatCurrency(i.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">
                      {formatCurrency(i.price * i.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">Shipping address</h3>
                  <p className="font-semibold text-slate-700">
                    {item.address.label}
                  </p>
                  <p className="text-muted-foreground leading-relaxed italic">
                    {item.address.fullAddress}, {item.address.city}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-md border-primary/10">
            <CardHeader className="border-b bg-primary/2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" /> Cost Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-slate-600">
                  <span>Sub-total</span>
                  <span className="font-medium text-slate-900">
                    {formatCurrency(item.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping costs</span>
                  <span className=" text-green-600 font-bold">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold">Final Amount</span>
                  <span className="text-2xl font-black text-primary">
                    {formatCurrency(item.totalAmount)}
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <div className="bg-slate-100 rounded-xl p-4 space-y-2 border border-slate-200">
                  <p className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                    <CreditCard className="w-3 h-3" /> Payment Method
                  </p>
                  <p className="font-bold text-sm text-slate-800 uppercase tracking-tight">
                    {item.paymentMethod}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center px-4 italic text-sm text-muted-foreground">
            Thank you for shopping! We are processing your order. With love.
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
