"use server";

import prisma from "@/lib/prisma";

export async function getOrderById(id: string) {
  return await prisma.order.findUnique({
    where: {id},
    include: {
      address: true,
      items: true,
    },
  });
}
