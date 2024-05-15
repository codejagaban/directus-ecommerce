"use client";

import { CartContext } from "@/app/context/cart-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Link from 'next/link'

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [isClient, setIsClient] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search") as string;
    console.log(searchQuery);
    router.push(`/search?query=${searchQuery}`)

  };

  const cart = useContext(CartContext);
  useEffect(() => {
    setIsClient(true)
  }, [])
   return isClient &&  (
    <div>
      <div>

        <span><Link href="/">Home</Link></span>
        <span>  Cart: <Link href="/checkout/cart"> {cart.cartItems.length} items in cart</Link></span>
      </div>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for products..."
        name="search"
        defaultValue={searchParams.get('query') || ''}
      />
      <button type="submit">Search</button>
      </form>
    </div>
  );
}
