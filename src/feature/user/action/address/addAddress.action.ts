"use server";

import prisma from "@/lib/prisma";
import {addAddressSchema} from "../../schema/userSchema";
import {revalidatePath} from "next/cache";

export async function addAddress(id: string, formData: FormData) {
  const rowData = Object.fromEntries(formData.entries());
  const parsed = addAddressSchema.safeParse(rowData);

  if (!parsed.success) {
    return {
      messages: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.address.create({
      data: {
        ...parsed.data,
        userId: id,
      },
    });

    revalidatePath(`/admin/profile/${id}/addAddress`);
    return {success: true};
  } catch {
    return {error: "system failure"};
  }
}


