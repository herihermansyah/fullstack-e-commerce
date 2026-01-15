"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import React, {useState, useTransition} from "react";
import {createProduct} from "../../action/createProduct.action";
import z from "zod";
import {productSchema} from "../../schema/productSchemas";
import {SelectCategory} from "../select-category";
import {SelectReturnPolicy} from "../select-return-policy";
import Image from "next/image";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

type FormError = z.inferFlattenedErrors<typeof productSchema>["fieldErrors"];

interface FormAddProducts {
  category: {id: string; name: string}[];
}

function FormAddProduct({category}: FormAddProducts) {
  const [error, setError] = useState<FormError | undefined>(undefined);
  const [preview, setPreview] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleAddProduct = (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await createProduct(formData);
        if (result.messages) {
          setError(result.messages);
          toast.error("failed to add product");
          return;
        }

        toast.success("product added successfully");
        router.push("/admin/listproduct");
      } catch {
        toast.error("system error failure");
      }
    });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const MAX_SIZE = 200 * 1024;

    const isTooLarge = fileArray.some((file) => file.size > MAX_SIZE);

    if (isTooLarge) {
      toast.error("One of the images is over 200kb in size.");
      e.target.value = "";
      setPreview([]);
      return;
    }

    if (fileArray.length > 5) {
      toast.warning("maximum 5 images");
      e.target.value = "";
      setPreview([]);
      return;
    }
    const newPreview = fileArray.map((file) => URL.createObjectURL(file));
    setPreview(newPreview);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>form add product</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-2" action={handleAddProduct}>
          <Input name="title" type="text" max=" " placeholder="title" />
          {error?.title && (
            <p className="text-sm text-red-500">{error.title}</p>
          )}
          <Textarea
            name="description"
            placeholder="product description"
            required
            className="h-40"
          />
          {error?.description && (
            <p className="text-sm text-red-500">{error.description}</p>
          )}
          <Input name="price" type="number" placeholder="price" />
          {error?.price && (
            <p className="text-sm text-red-500">{error.price}</p>
          )}
          <Input name="stock" type="number" placeholder="stock" />
          {error?.stock && (
            <p className="text-sm text-red-500">{error.stock}</p>
          )}
          <Input
            name="minimumOrderQuantity"
            type="number"
            placeholder="minimum order"
          />
          {error?.minimumOrderQuantity && (
            <p className="text-sm text-red-500">{error.minimumOrderQuantity}</p>
          )}
          <Input name="rating" type="number" placeholder="rating" step="0.1" />
          {error?.rating && (
            <p className="text-sm text-red-500">{error.rating}</p>
          )}
          <SelectReturnPolicy />
          {error?.returnPolicy && (
            <p className="text-sm text-red-500">{error.returnPolicy}</p>
          )}
          <SelectCategory category={category} />
          {error?.categoryId && (
            <p className="text-sm text-red-500">{error.categoryId}</p>
          )}
          <div>
            <Input
              onChange={handleChangeImage}
              name="products"
              type="file"
              accept="image/*"
              multiple
              className="w-100"
            />
            <span className="ml-1 capitalize whitespace-nowrap text-sm text-red-500">
              * select a maximum of 5 images
            </span>
            <div className="flex mt-2 items-center gap-2">
              {preview.length > 0 &&
                preview.map((src, index) => (
                  <div key={index}>
                    <Image
                      src={src}
                      alt={`preview-${index}`}
                      width={50}
                      height={50}
                      className="aspect-square object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>

          <Button disabled={isPending} type="submit">
            {isPending ? "Loading..." : "Add Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default FormAddProduct;
