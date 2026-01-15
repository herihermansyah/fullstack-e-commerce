"use server";

import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {getTotalCartItem} from "./getTotalCart.action.";

export async function updateCart(cartItemId: string, type: "plus" | "minus") {
  const item = await prisma.cartItem.findUnique({
    where: {id: cartItemId},
    include: {
      cart: true,
      product: {
        select: {
          minimumOrderQuantity: true,
        },
      },
    },
  });
  if (!item) return 0;

  const moq = item.product.minimumOrderQuantity;

  if (type === "minus") {
    if (item.quantity <= moq) {
      await prisma.cartItem.delete({where: {id: cartItemId}});
    } else {
      await prisma.cartItem.update({
        where: {id: cartItemId},
        data: {quantity: {decrement: 1}},
      });
    }
  } else {
    await prisma.cartItem.update({
      where: {id: cartItemId},
      data: {quantity: {increment: 1}},
    });
  }
  revalidatePath("/cart");
  return await getTotalCartItem(item.cart.userId);
}
