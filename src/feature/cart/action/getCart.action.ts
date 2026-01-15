"use server";

import prisma from "@/lib/prisma";

export async function getCart(userId: string) {
  return await prisma.cart.findUnique({
    where: {userId: userId},
    include: {
      items: {
        include: {
          product: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

