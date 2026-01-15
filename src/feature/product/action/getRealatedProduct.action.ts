"use server";

import prisma from "@/lib/prisma";

export async function getRelatedProduct(
  categoryId: string,
  currenProduct: string
) {
  return await prisma.product.findMany({
    where: {
      categoryId: categoryId,
      NOT: {
        id: currenProduct,
      },
    },
  });
}
