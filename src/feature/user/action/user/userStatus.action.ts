"use server";

import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export async function setUserStatus(userId: string, currentStatus: boolean) {
  try {
    await prisma.user.update({
      where: {id: userId},
      data: {
        isActive: !currentStatus,
      },
    });

    revalidatePath("/admin/usersdata");

    return {success: true};
  } catch {
    return {
      error: "system error",
    };
  }
}
