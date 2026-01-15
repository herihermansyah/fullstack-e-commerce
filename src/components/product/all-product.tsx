"use client";
import {Product} from "@/generated/prisma/client";
import Image from "next/image";
import React from "react";
import {Card, CardContent, CardFooter} from "../ui/card";
import {Star} from "lucide-react";
import {Badge} from "../ui/badge";
import Link from "next/link";
import AddToCart from "../cart/add-to-cart";

interface AllProductProps {
  products: Product[];
  userId?: string | undefined;
  quantityCount?: number;
}
function AllProduct({products, userId, quantityCount}: AllProductProps) {
  const isNewProduct = (date: Date) => {
    const today = new Date();
    const createdDate = new Date(date);
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDay <= 7;
  };
  return (
    <div className="py-8">
      <div className="grid grid-cols-2 min-[540px]:grid-cols-3  lg:grid-cols-5 gap-2 md:gap-6">
        {products.map((item) => (
          <Card
            key={item.id}
            className="group relative flex flex-col overflow-hidden border-slate-200 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative aspect-square overflow-hidden bg-slate-100">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"></div>
              {isNewProduct(item.createdAt) && (
                <Badge className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-600">
                  New Arrival
                </Badge>
              )}
            </div>

            <CardContent className="p-4 flex-1">
              <Link href={`/products/${item.id}/preview`}>
                <div className="flex items-center gap-1 mb-1 text-yellow-500">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[10px] text-slate-500 font-medium">
                    (4.8)
                  </span>
                </div>

                <h3 className="font-semibold text-slate-800 line-clamp-2 leading-snug min-h-10">
                  {item.title}
                </h3>

                <div className="mt-3 flex flex-col">
                  <span className="text-lg font-bold text-blue-600">
                    $ {item.price.toLocaleString("USD")}
                  </span>
                </div>
              </Link>
            </CardContent>

            <CardFooter>
              <AddToCart
                userId={userId as string}
                productId={item.id}
                quantity={quantityCount as number}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AllProduct;
