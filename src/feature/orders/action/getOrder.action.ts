"use server";

import prisma from "@/lib/prisma";

export async function getOrders() {
  return await prisma.order.findMany({
    include: {
      address: true,
      items: true,
      user: true,
    },
  });
}
