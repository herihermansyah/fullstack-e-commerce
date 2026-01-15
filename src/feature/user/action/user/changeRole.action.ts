"use server"

import {auth} from "@/auth";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export async function changeRole(id: string) {
  try {
    const session = await auth();

    if (session?.user.id === id) {
      return {error: "you cannot change your own role!"};
    }

    const currentUser = await prisma.user.findUnique({
      where: {id},
      select: {
        role: true,
      },
    });

    if (!currentUser) {
      return {error: "user not found"};
    }

    const newRole = currentUser.role === "ADMIN" ? "USER" : "ADMIN";
    await prisma.user.update({
      where: {id: id},
      data: {
        role: newRole,
      },
    });

    revalidatePath("/admin/usersdata");
    return {success: true};
  } catch {
    return {error: "system error"};
  }
}
