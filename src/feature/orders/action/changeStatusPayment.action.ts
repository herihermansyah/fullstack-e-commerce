"use server";

import prisma from "@/lib/prisma";

export async function changePaymentStatus(id: string, status: string) {
  try {
    await prisma.order.update({
      where: {id},
      data: {
        paymentStatus: status,
      },
    });
    return {success: true};
  } catch {
    return {success: false};
  }
}
