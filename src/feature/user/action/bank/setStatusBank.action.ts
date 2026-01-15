"use server";

import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export async function setStatusBank(id: string, statusBank: boolean) {
  try {
    await prisma.paymentMethod.update({
      where: {id: id},
      data: {
        isActive: !statusBank,
      },
    });
    revalidatePath(`/admin/profile/${id}`);
    return {success: true};
  } catch {
    return {error: "system failure"};
  }
}
