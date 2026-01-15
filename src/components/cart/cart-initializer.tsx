"use client";

import {useCartStore} from "@/store/use-cart-store";
import {useEffect, useRef} from "react";

export function CartInitializer({initialCount}: {initialCount: number}) {
  const setTotoalItems = useCartStore((s) => s.setTotalItems);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      setTotoalItems(initialCount);
      initialized.current = true;
    }
  }, [initialCount, setTotoalItems]);

  return null;
}
