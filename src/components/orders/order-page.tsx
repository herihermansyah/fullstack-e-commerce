import {getOrders} from "@/feature/orders/action/getOrder.action";
import Image from "next/image";
import React from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Package, MapPin, Calendar} from "lucide-react";
import {Button} from "../ui/button";
import Link from "next/link";

async function OrderPage() {
  const result = await getOrders();

  if (!result || result.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold">No orders yet</h2>
        <p className="text-muted-foreground">
          Your shopping history will appear here.{" "}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
          <p className="text-muted-foreground">
            Manage and monitor your order status.{" "}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {result.map((order) => (
          <Card
            key={order.id}
            className="overflow-hidden border-2 hover:border-primary/20 transition-colors"
          >
            <CardHeader className="bg-slate-50/50 border-b py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                      Order ID
                    </p>
                    <p className="text-sm font-mono font-medium">
                      #{order.id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                      Date
                    </p>
                    <p className="text-sm font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(order.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      order.status === "DELIVERED" ? "default" : "secondary"
                    }
                    className="px-3 py-1"
                  >
                    {order.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-white border-blue-200 text-blue-700 px-3 py-1"
                  >
                    {order.paymentStatus || "UNPAID"}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.id} className="p-6 flex items-center gap-6">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden border bg-white shrink-0">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-lg truncate">
                        {item.productName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Amount: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        $ {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50/30 p-6 border-t flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-2 max-w-md">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                    <MapPin className="h-3 w-3" /> Shipping address
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {order.address.fullAddress}, {order.address.city}
                  </p>
                  <Link href={`/orders/${order.id}`}>
                    <Button variant={"outline"}>Details</Button>
                  </Link>
                </div>

                <div className="space-y-3 text-right">
                  <div className="flex justify-end items-center gap-4 text-muted-foreground">
                    <span className="text-sm">Sub-total</span>
                    <span className="text-sm font-medium">
                      $ {order.totalAmount.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <Separator className="ml-auto w-32" />
                  <div className="flex justify-end items-center gap-4">
                    <span className="text-lg font-semibold">
                      Payment amount
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      $ {order.totalAmount.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default OrderPage;
