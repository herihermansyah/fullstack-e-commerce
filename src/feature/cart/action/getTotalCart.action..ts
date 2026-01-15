"use server"

import prisma from "@/lib/prisma";

export async function getTotalCartItem(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: {userId},
    include: {
      items: {
        select: {quantity: true},
      },
    },
  });

  return cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
}