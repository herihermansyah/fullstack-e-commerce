"use client";

import {ColumnDef} from "@tanstack/react-table";
import {OrderType} from "../../types/order.type";
import {Badge} from "@/components/ui/badge"; 
import {format} from "date-fns";
import {ChangeStatus} from "@/components/orders/change-status";
import {ChangePaymentStatus} from "@/components/orders/change-payment-status";

export const productColumn: ColumnDef<OrderType>[] = [
  {
    header: "No",
    cell: ({row}) => <div className="font-medium">{row.index + 1}</div>,
  },
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({row}) => format(new Date(row.original.createdAt), "dd MMM yyyy"),
  },

  {
    header: "Customer",
    accessorKey: "user.name",
    cell: ({row}) => (
      <div className="flex flex-col">
        <span className="font-bold text-slate-900">
          {row.original.user.name}
        </span>
        <span className="text-xs text-slate-500">
          {row.original.user.email}
        </span>
      </div>
    ),
  },
  {
    header: "Quantity",
    cell: ({row}) => {
      const totalItems = row.original.items.map((item) => (
        <div key={item.id}>
          <span>{item.quantity} pcs</span>
        </div>
      ));
      return <div className="text-[12px]">{totalItems}</div>;
    },
  },
  {
    header: "Products Name",
    cell: ({row}) => {
      const items = row.original.items;

      const maxLength = 30;

      return (
        <div>
          {items.map((item) => {
            const productName = item.productName;
            const truncatedTitle =
              productName.length > maxLength
                ? productName.substring(0, maxLength) + "..."
                : productName;
            return (
              <div key={item.id}>
                <span> {truncatedTitle}</span>
              </div>
            );
          })}
        </div>
      );
    },
  },

  {
    accessorKey: "subtotal",
    header: "Total Amount",
    cell: ({row}) => {
      const amount = row.original.subtotal;
      return (
        <div className="font-black text-blue-700">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)}
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status Order",
    cell: ({row}) => {
      const {status, id} = row.original;

      const variant =
        status === "DELIVERED"
          ? "default"
          : status === "PENDING"
          ? "secondary"
          : status === "CANCELLED"
          ? "destructive"
          : "outline";

      return (
        <div className="flex  items-center  gap-2">
          <Badge variant={variant} className="font-bold">
            {status}
          </Badge>
          <ChangeStatus status={status} id={id} />
        </div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({row}) => {
      const {paymentStatus, id} = row.original;

      const variant =
        paymentStatus === "PAID"
          ? "default"
          : paymentStatus === "UNPAID"
          ? "destructive"
          : "default";

      return (
        <div className="flex  items-center  gap-2">
          <Badge variant={variant} className="font-bold">
            {paymentStatus}
          </Badge>
          <ChangePaymentStatus status={paymentStatus ?? ""} id={id} />
        </div>
      );
    },
  },
];
