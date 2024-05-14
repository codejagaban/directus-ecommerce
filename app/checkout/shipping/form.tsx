"use client";

import { CartContext } from "@/app/context/cart-context";
import { useContext } from "react";


export default function ShippingForm() {
  const cart = useContext(CartContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const shippingInfo = Object.fromEntries(formData.entries());
    const orderData = {
      email: shippingInfo.email,
      first_name: shippingInfo.firstName,
      last_name: shippingInfo.lastName,
      shipping_address: shippingInfo.shippingAddress,
      total_amount: cart.getCartTotal(),
      products: cart.cartItems,
    };
    try {
      console.log({orderData})
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const payment = await response.json();
        window.location.href = payment.url;
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input type="email" name="email"  defaultValue="hello@example.com" />
      </label>
      <label>
        First Name
        <input type="text" name="firstName" defaultValue="Jamin" />
      </label>
      <label>
        Last Name
        <input type="text" name="lastName" defaultValue="Doe" />
      </label>
      <label>
        Shipping Address
        <input type="text" name="shippingAddress" defaultValue="From the Space" />
      </label>
      <button type="submit">Proceed to Payment</button>
    </form>
  )
}