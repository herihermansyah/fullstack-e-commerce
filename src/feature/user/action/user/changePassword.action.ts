"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {revalidatePath} from "next/cache";

export async function changePassword(id: string, formData: FormData) {
  const oldPassword = formData.get("oldPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const user = await prisma.user.findUnique({
    where: {id},
    select: {password: true},
  });

  if (!user || !user.password) {
    throw new Error("user not found");
  }

  const isMatchPassword = await bcrypt.compare(oldPassword, user.password);
  if (!isMatchPassword) {
    throw new Error("Old password is incorrect.");
  }

  const newHashPassword = await bcrypt.hash(newPassword, 10);

  try {
    await prisma.user.update({
      where: {id},
      data: {
        password: newHashPassword,
      },
    });

    revalidatePath(`/admin/profile/${id}/preview`);
    return {success: true};
  } catch {
    return {error: "system error"};
  }
}
