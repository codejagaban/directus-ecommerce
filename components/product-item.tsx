"use client";
import { CartContext } from "@/app/context/cart-context";
import { ProductTypes } from "@/types";
import Image from "next/image";
import { useContext } from "react";

export default function ProductItem({
  id,
  name,
  image,
  price,
}: ProductTypes) {
  const cart = useContext(CartContext);
  const imageUrl = `http://localhost:8055/assets/${image}`;
  return (
    <div>
      <Image
        src={imageUrl}
        width={200}
        height={250}
        alt={name}
      />
      <h2>{name}</h2>
      {/* <div dangerouslySetInnerHTML={{ __html: description }} /> */}
      <p>
        {price}
        <button onClick={() => cart.addToCart({id, name, price, image: imageUrl})}>Add to Cart</button>
      </p>
    </div>
  );
}
