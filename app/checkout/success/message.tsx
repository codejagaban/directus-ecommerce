"use client";

import { CartContext } from "@/app/context/cart-context";
import { useContext, useEffect } from "react";


export default function SuccessMessage({ orderNo }: { orderNo: string }) {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    console.log("Clearing cart");
      clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section>
      <h1>Congratulations! Your Order was successfully placed, your Order No is: {orderNo}</h1>
    </section>
  );
}