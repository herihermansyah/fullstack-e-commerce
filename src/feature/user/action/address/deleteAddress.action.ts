"use server";

import {Prisma} from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export async function deleteAddress(addressId: string) {
  try {
    await prisma.address.delete({
      where: {id: addressId},
    });

    revalidatePath("/admin/profile", "layout");

    return {success: true};
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return {success: false, error: "USED"};
      }
      if (error.code === "P2025") {
        return {success: false, error: "NOT_FOUND"};
      }
    }

    return {success: false, error: "SYSTEM"};
  }
}
