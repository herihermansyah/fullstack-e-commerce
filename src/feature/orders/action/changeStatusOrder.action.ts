"use server";

import {OrderStatus} from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";

export async function changeStatusOrder(id: string, status: OrderStatus) {
  try {
    await prisma.order.update({
      where: {id},
      data: {
        status: status,
      },
    });
    return {success: true};
  } catch {
    return {success: false};
  }
}
