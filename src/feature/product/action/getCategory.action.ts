"use server";

import prisma from "@/lib/prisma";

export async function getCategory() {
  return prisma.category.findMany();
}
