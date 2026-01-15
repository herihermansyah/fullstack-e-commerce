"use server";

import prisma from "@/lib/prisma";
import {editInformationSchema} from "../../schema/userSchema";
import {revalidatePath} from "next/cache";

export async function editInformation(formData: FormData, id: string) {
  if (!id) return {error: "invalid identity"};
  const rowData = Object.fromEntries(formData.entries());
  const parsed = editInformationSchema.safeParse(rowData);

  if (!parsed.success) {
    return {
      messages: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.user.update({
      where: {id},
      data: parsed.data,
    });
    revalidatePath(`/admin/profile/${id}/editInformation`);
    return {success: true};
  } catch {
    return {error: "system error"};
  }
}

export async function getUserIdEdit(id: string) {
  if (!id) return null;
  return await prisma.user.findUnique({
    where: {id: id},
    select: {
      firstName: true,
      lastName: true,
      maidenName: true,
      birthDate: true,
      phone: true,
    },
  });
}
