"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function setPrimaryAddress(addressId: string, userId: string) {
  try {
    await prisma.$transaction([
      prisma.address.updateMany({
        where: {userId: userId, isPrimary: true},
        data: {
          isPrimary: false,
        },
      }),
      prisma.address.update({
        where: {id: addressId},
        data: {
          isPrimary: true,
        },
      }),
    ]);
    revalidatePath(`/admin/profile/${addressId}/preview`);
    return {success: true};
  } catch {
    return {error: "failure system"};
  }
}
