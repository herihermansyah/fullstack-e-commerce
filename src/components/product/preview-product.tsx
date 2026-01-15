"use client";

import {Prisma} from "@/generated/prisma/client";
import Image from "next/image";
import React, {useState} from "react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Star, RotateCcw, Minus, Plus, ShieldCheck} from "lucide-react";
import AddToCart from "../cart/add-to-cart";

type ProductType = Prisma.ProductGetPayload<{
  include: {
    category: true;
  };
}>;

interface PreviewProductProps {
  product: ProductType;
  userId?: string | undefined;
}

function PreviewProduct({product, userId}: PreviewProductProps) {
  const [selectedImage, setSelectedImage] = useState(
    product.thumbnail || product.images[0]
  );
  const [quantity, setQuantity] = useState(product.minimumOrderQuantity || 1);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 bg-white rounded-xl">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              className="object-contain p-4 transition-all duration-300"
              priority
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === img
                    ? "border-blue-600 ring-2 ring-blue-100"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.title}-${index}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-5">
          <div className="space-y-2">
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-600 hover:bg-blue-50"
            >
              {product.category.name}
            </Badge>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="font-bold text-slate-700">
                  {product.rating}
                </span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-slate-500">
                Stock:{" "}
                <span className="text-slate-900 font-medium">
                  {product.stock}
                </span>
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-3xl font-black text-blue-600">
              $ {product.price.toLocaleString()}
            </p>
            <p className="text-xs text-slate-400 italic">
              Price does not include shipping costs.
            </p>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-800">
              Product Description
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-4 hover:line-clamp-none transition-all cursor-pointer">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <RotateCcw size={16} className="text-blue-500" />
              <span>{product.returnPolicy}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={16} className="text-green-500" />
              <span>Original Product</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.max(product.minimumOrderQuantity, q - 1)
                    )
                  }
                >
                  <Minus size={14} />
                </Button>
                <span className="w-10 text-center text-sm font-bold">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <AddToCart
                productId={product.id}
                userId={userId as string}
                quantity={quantity}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PreviewProduct;
