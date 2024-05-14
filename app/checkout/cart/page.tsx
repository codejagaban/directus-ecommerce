"use client";

import { CartContext } from "@/app/context/cart-context";
import Link from "next/link";
import { useContext } from "react";

export default function CheckoutCartPage() {
  const cart = useContext(CartContext);
  return (
    <section>
      <div>
        <h2>Cart</h2>
        <ul>
          {cart.cartItems.map((cartItem) => (
            <li key={cartItem.id}>
              <div>
                <span>{cartItem.name}</span>
                <span> ${cartItem.price} </span>
                <button onClick={() => cart.removeFromCart(cartItem)}>
                  {" "}
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        {cart.cartItems.length > 0 ? (
          <div>
            <div>Total: {cart.getCartTotal()}</div>
            <Link href="/checkout/shipping">Proceed to Shipping</Link>
            <button onClick={() => cart.clearCart()}>Clear Cart</button>
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </section>
  );
}
