"use server";

import prisma from "@/lib/prisma";

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: {id},
    include: {
      category: true,
    },
  });
}
