"use server";

import prisma from "@/lib/prisma";
import {categorySchema} from "../schema/productSchemas";
import {revalidatePath} from "next/cache";

export async function createCategory(formData: FormData) {
  const rowData = Object.fromEntries(formData.entries());
  const parsed = categorySchema.safeParse(rowData);

  if (!parsed.success) {
    return {
      messages: parsed.error.flatten().fieldErrors,
    };
  }

  const {name, slug} = parsed.data;

  try {
    await prisma.category.create({
      data: {
        name,
        slug,
      },
    });

    revalidatePath("/admin/");
    return {success: true};
  } catch {
    return {error: "failed add category"};
  }
}
