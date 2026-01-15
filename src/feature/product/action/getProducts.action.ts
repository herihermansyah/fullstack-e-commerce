"use server";

import prisma from "@/lib/prisma";

export async function getProduct(query?: string) {
  try {
    const products = await prisma.product.findMany({
      where: query
        ? {
            OR: [
              {
                title: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    });

    return products;
  } catch {
    return [];
  }
}
