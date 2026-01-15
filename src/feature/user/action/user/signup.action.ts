"use server";

import prisma from "@/lib/prisma";
import {signUpSchema} from "../../schema/userSchema";
import bcrypt from "bcryptjs";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function signUpAction(formData: FormData) {
  const rowData = Object.fromEntries(formData.entries());
  const parsed = signUpSchema.safeParse(rowData);

  if (!parsed.success) {
    return {
      messages: parsed.error.flatten().fieldErrors,
    };
  }

  const {username, email, password} = parsed.data;

  const exist = await prisma.user.findFirst({
    where: {
      OR: [{email: email}, {username: username}],
    },
  });

  if (exist) {
    return {
      messages: {
        ...(exist.email === email && {email: ["email is registered"]}),
        ...(exist.username === username && {
          username: ["Username is already in use"],
        }),
      },
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      role: "USER",
      username,
      email,
      password: hashPassword,
    },
  });

  revalidatePath("/signup");
  redirect("/login");
}
