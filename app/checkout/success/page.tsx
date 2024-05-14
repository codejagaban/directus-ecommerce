"use client";
import  { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "@/app/context/cart-context";

interface SuccessPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const { orderNo } = searchParams || {};
  const router = useRouter();
  const cart = useContext(CartContext);

  useEffect(() => {
    console.log("Clearing cart");
    if (typeof window !== 'undefined') {
      cart.clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!orderNo) {
    router.push("/checkout");
    return null;
  }
  return (
    <section>
      <h1>Congratulations! Your Order was successfully placed, your Order No is: {orderNo}</h1>
    </section>
  );
}
