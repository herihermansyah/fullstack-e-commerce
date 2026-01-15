import {addToCart, resetCart, updateCart} from "@/feature/cart/action";
import {createOrder} from "@/feature/orders/action/createOrder.action";
import {Order} from "@/generated/prisma/client";
import {create} from "zustand";

interface CartStore {
  totalItems: number;
  loadingId: string | null;
  setTotalItems: (count: number) => void;
  add: (userId: string, productId: string, quantity: number) => Promise<void>;
  update: (cartItemId: string, type: "plus" | "minus") => Promise<void>;
  reset: (userId: string) => Promise<void>;
  checkOut: (
    userId: string,
    addressId: string,
    paymentMethodId: string
  ) => Promise<Order | undefined>;
}

export const useCartStore = create<CartStore>((set) => ({
  loadingId: null,
  totalItems: 0,

  setTotalItems: (count) => set({totalItems: count}),

  checkOut: async (userId, addressId, paymentMethodId) => {
    set({loadingId: "checkOut"});
    try {
      const order = await createOrder(userId, addressId, paymentMethodId);
      set({totalItems: 0, loadingId: null});
      return order;
    } catch {
      set({loadingId: null});
    }
  },

  add: async (userId, productId, quantity) => {
    set({loadingId: productId});
    const newTotal = await addToCart(userId, productId, quantity);
    set({totalItems: newTotal, loadingId: null});
  },

  update: async (cartItemId, type) => {
    set({loadingId: cartItemId});
    const newTotal = await updateCart(cartItemId, type);
    set({totalItems: newTotal, loadingId: null});
  },

  reset: async (userId) => {
    set({loadingId: "reset"});
    await resetCart(userId);
    set({loadingId: null});
  },
}));
