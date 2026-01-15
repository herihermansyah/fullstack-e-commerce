"use client";

import {ColumnDef} from "@tanstack/react-table";
import Image from "next/image";
import {ProductAction} from "../product-actions";
import {ProductType} from "../../types/product.type";

export const productColumn: ColumnDef<ProductType>[] = [
  {
    header: "No",
    cell: ({row}) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({row}) => {
      const title = row.getValue("title") as string;
      const maxLength = 30;

      const truncatedTitle =
        title.length > maxLength
          ? title.substring(0, maxLength) + "..."
          : title;

      return (
        <div className="max-w-100 truncate font-medium">{truncatedTitle}</div>
      );
    },
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "thumbnail",
    header: "Image",
    cell: ({row}) => (
      <div className="relative h-10 w-10 overflow-hidden rounded-md border">
        <Image
          src={row.original.thumbnail}
          alt={row.original.title}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({row}) => {
      const amount = row.original.price;
      return new Intl.NumberFormat("USD", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({row}) => {
      const product = row.original;
      return <ProductAction product={product} />;
    },
  },
];
