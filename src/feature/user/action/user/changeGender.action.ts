"use server";

import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {Gender} from "@/generated/prisma/enums";

export async function changeGender(id: string, gender: Gender) {
  try {
    await prisma.user.update({
      where: {id},
      data: {
        gender: gender,
      },
    });
    revalidatePath(`/admin/profile/${id}/preview`);
    return {success: true};
  } catch {
    return {error: "system error"};
  }
}
