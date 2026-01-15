"use server";

import prisma from "@/lib/prisma";
import {addBanksSchema} from "../../schema/userSchema";
import {revalidatePath} from "next/cache";

export async function addBanks(id: string, formData: FormData) {
  const rowData = Object.fromEntries(formData.entries());
  const parsed = addBanksSchema.safeParse(rowData);

  if (!parsed.success) {
    return {
      messages: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.paymentMethod.create({
      data: {
        ...parsed.data,
        userId: id,
      },
    });

    revalidatePath(`/admin/profile/${id}/paymentmethods`);
    return {success: true};
  } catch {
    return {error: "system failure"};
  }
}


