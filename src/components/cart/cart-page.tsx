import {auth} from "@/auth";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {getCart} from "@/feature/cart/action";
import CartItemRow from "./cart-item-row";
import CartSummary from "./cart-summary";
import prisma from "@/lib/prisma";

export default async function CartPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const [cart, addresses, payment] = await Promise.all([
    getCart(userId as string),
    prisma.address.findMany({
      where: {userId},
    }),

    prisma.paymentMethod.findMany({
      where: {userId},
    }),
  ]);

  const primaryAddress = addresses.find((a) => a.isPrimary) || addresses[0];
  const primaryPayment = payment.find((p) => p.isDefault) || payment[0];

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-semibold">Your shopping cart is empty...</h2>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LIST ITEMS (left) */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>

        {/* SUMMARY (right) */}
        <CartSummary
          userId={userId as string}
          subTotal={subtotal.toLocaleString()}
          address={primaryAddress}
          paymentMethods={primaryPayment}
        />
      </div>
    </div>
  );
}
