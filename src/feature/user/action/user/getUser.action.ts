"use server";

import prisma from "@/lib/prisma";

export async function getUser() {
  return prisma.user.findMany({});
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: {id},
    include: {
      addresses: true,
      payment_methods: true,
    },
  });
}
