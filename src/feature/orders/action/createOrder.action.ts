"use server";

import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export async function createOrder(
  userId: string,
  addressId: string,
  paymentMethodId: string
) {
  const cart = await prisma.cart.findUnique({
    where: {userId},
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) throw new Error("empty shopping cart");

  const subTotal = cart.items.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);

  const shippingCost = 0;
  const totalAmount = subTotal + shippingCost;

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        userId,
        addressId,
        shippingCost,
        totalAmount,
        status: "PENDING",
        paymentStatus: "UNPAID",
        subtotal: subTotal,
        paymentMethod: paymentMethodId,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            productName: item.product.title, 
            productImage: item.product.thumbnail || item.product.images[0], 
            quantity: item.quantity,
            price: item.product.price, 
          })),
        },
      },
    });
    await tx.cartItem.deleteMany({
      where: {cartId: cart.id},
    });
    return newOrder;
  });
  revalidatePath("/cart");
  return order;
}
