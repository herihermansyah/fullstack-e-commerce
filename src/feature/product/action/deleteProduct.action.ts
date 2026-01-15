"use server";

import prisma from "@/lib/prisma";
import {supabase} from "@/lib/supabase";
import {revalidatePath} from "next/cache";

export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {id},
      select: {thumbnail: true, images: true},
    });

    if (!product) {
      return {error: "product not found"};
    }

    if (product.images && product.images.length > 0) {
      const fileToRemove = product.images.map((url) => {
        const parts = url.split("/");
        return parts.pop() as string;
      });

      const {error: storageError} = await supabase.storage
        .from("products")
        .remove(fileToRemove);

      if (storageError) {
        throw new Error("failed to delete the product");
      }
    }

    await prisma.product.delete({
      where: {id},
    });

    revalidatePath("/admin/productlist");
    return {success: true};
  } catch {
    return {error: "system failure"};
  }
}
