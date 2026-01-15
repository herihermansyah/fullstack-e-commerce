"use server";

import { auth } from "@/auth";
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

export async function getMyOrders() {
  const session = await auth();
  
  // Proteksi dasar: harus login
  if (!session?.user?.id) return [];

  return await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      address: true,
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });
}