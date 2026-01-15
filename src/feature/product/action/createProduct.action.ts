"use server";

import prisma from "@/lib/prisma";
import {productSchema} from "../schema/productSchemas";
import {supabase} from "@/lib/supabase";
import {revalidatePath} from "next/cache";

export async function createProduct(formData: FormData) {
  const rowData = Object.fromEntries(formData.entries());
  const parsed = productSchema.safeParse(rowData);
  const imageFile = formData.getAll("products") as File[];

  if (!parsed.success) {
    return {
      messages: parsed.error.flatten().fieldErrors,
    };
  }

  const {
    title,
    description,
    price,
    stock,
    minimumOrderQuantity,
    rating,
    returnPolicy,
    categoryId,
  } = parsed.data;

  try {
    let uploadedUrls: string[] = [];

    if (imageFile.length > 0 && imageFile[0].size > 0) {
      const uploadPromise = imageFile.map(async (file) => {
        const ext = file.name.split("/").pop();
        const fileName = `${crypto.randomUUID()}.${ext}`;
        const {error} = await supabase.storage
          .from("products")
          .upload(fileName, file);

        if (error) throw new URL("failed to upload image");

        const {
          data: {publicUrl},
        } = supabase.storage.from("products").getPublicUrl(fileName);
        return publicUrl;
      });
      uploadedUrls = await Promise.all(uploadPromise);
    }

    await prisma.product.create({
      data: {
        title,
        description,
        price,
        stock,
        minimumOrderQuantity,
        rating,
        returnPolicy,
        thumbnail: uploadedUrls[0],
        images: uploadedUrls,
        categoryId,
      },
    });
    revalidatePath("/admin/addproduct");
    return {success: true};
  } catch {
    revalidatePath("/admin/addproduct");
    return {error: "a system error occurred"};
  }
}
