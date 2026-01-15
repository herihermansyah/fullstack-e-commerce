"use server";

import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export async function deleteBank(id: string) {
  try {
    await prisma.paymentMethod.delete({
      where: {id},
    });
    revalidatePath(`/admin/profile/${id}/preview`);
    return {success: true};
  } catch {
    return {error: "system failure"};
  }
}
