"use client";

import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext<CartContextType>({cartItems: [], addToCart: () => {}, removeFromCart: () => {}, clearCart: () => {}, getCartTotal: () => 0})

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};

type CartProviderProps = {
  children: React.ReactNode;
}

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
};


export function CartProvider({ children }: CartProviderProps) {
  
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    }
    return [];
  });

  const addToCart = (item: CartItem) => {

    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (!!existingItemIndex) {
      setCartItems([...cartItems, { ...item}]);
    }
  };

  const removeFromCart = (item: CartItem) => {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.price), 0);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('cartItems');
      if (data) {
        setCartItems(JSON.parse(data));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);


  return (
    <CartContext.Provider
    value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );

};
