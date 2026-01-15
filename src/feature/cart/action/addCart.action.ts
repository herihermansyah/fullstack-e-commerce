"use server";

import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {getTotalCartItem} from "./getTotalCart.action.";

export async function getOrCreateCart(userId: string) {
  return await prisma.cart.upsert({
    where: {userId},
    update: {},
    create: {userId},
  });
}

export async function addToCart(
  userId: string,
  productId: string,
  quantity: number
) {
  const product = await prisma.product.findUnique({
    where: {id: productId},
    select: {
      price: true,
      minimumOrderQuantity: true,
    },
  });

  if (!product) throw new Error("product not found");
  const finalQuantity = quantity ?? product.minimumOrderQuantity;

  const cart = await getOrCreateCart(userId);

  await prisma.cartItem.upsert({
    where: {cartId_productId: {cartId: cart.id, productId}},
    update: {quantity: {increment: finalQuantity}},
    create: {
      cartId: cart.id,
      productId,
      quantity: finalQuantity,
      priceAtAdd: product.price,
    },
  });
  revalidatePath("/cart");

  return await getTotalCartItem(userId);
}
