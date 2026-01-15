"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function resetCart(userId: string) {
  const cart = await prisma.cart.findUnique({where: {userId: userId}});
  if (cart) {
    await prisma.cartItem.deleteMany({
      where: {cartId: cart.id},
    });
  }
  revalidatePath("/cart");
}