import React from "react";
import Image from "next/image";
import {Star, ShieldCheck, RefreshCcw, Box} from "lucide-react";
import {getProductById} from "../action/getProductById.action";

import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

async function ProductDetail({id}: {id: string}) {
  const product = await getProductById(id);
  if (!product)
    return <div className="p-10 text-center">Product not found</div>;

  return (
    <main className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover transition-hover hover:scale-105 duration-500"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(0, 4).map((src, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg border overflow-hidden cursor-pointer hover:ring-2 ring-primary transition-all"
              >
                <Image src={src} alt="Gallery" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <Badge variant="secondary" className="mb-2">
              {product.category.name}
            </Badge>
            <h1 className="text-lg md:text-4xl font-bold tracking-tight text-foreground">
              {product.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="fill-current w-4 h-4" />
                <span className="font-medium text-foreground">
                  {product.rating}
                </span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-muted-foreground text-sm">
                {product.stock} items in stock
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold text-primary">
            ${product.price.toLocaleString()}
          </div>

          <Separator />

          <div className="text-muted-foreground leading-relaxed">
            <span> Description: </span>
            <p>{product.description}</p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span>Min. Order: {product.minimumOrderQuantity} unit</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCcw className="w-5 h-5 text-blue-500" />
                <span>{product.returnPolicy}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full max-w-100 grid-cols-2">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="shipping">Policy & Support</TabsTrigger>
          </TabsList>
          <Card className="mt-4">
            <CardContent className="pt-6">
              <TabsContent value="details" className="mt-0 space-y-4">
                <h3 className="font-semibold text-lg">About this product</h3>
                <p className="text-muted-foreground">{product.description}</p>
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Category: {product.category.name}
                  </span>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="mt-0">
                <div className="space-y-2">
                  <p className="font-medium">Return Policy:</p>
                  <p className="text-muted-foreground italic text-sm">
                    {product.returnPolicy}
                  </p>
                  <p className="text-sm pt-4 italic">
                    Guaranteed safe checkout and verified quality.
                  </p>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </main>
  );
}

export default ProductDetail;
