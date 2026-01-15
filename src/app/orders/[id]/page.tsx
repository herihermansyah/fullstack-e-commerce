import OrderDetail from "@/components/orders/order-detail";
import {getOrderById} from "@/feature/orders/action/getOrderById.action";
import React from "react";

async function page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const result = await getOrderById(id);
  if (!result) return null;
  return (
    <div className="container mx-auto">
      <OrderDetail item={result} />
    </div>
  );
}

export default page;
