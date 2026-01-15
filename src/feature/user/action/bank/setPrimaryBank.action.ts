"use server";

import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export async function setPrimaryBank(bankId: string, userId: string) {
  try {
    await prisma.$transaction([
      prisma.paymentMethod.updateMany({
        where: {userId: userId, isDefault: true},
        data: {
          isDefault: false,
        },
      }),
      prisma.paymentMethod.update({
        where: {id: bankId},
        data: {
          isDefault: true,
        },
      }),
    ]);

    revalidatePath(`/admin/profile/${userId}`);
    return {success: true};
  } catch {
    return {error: "system failure"};
  }
}
