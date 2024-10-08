"use client";
import { ProductEntity } from "feeef";
import React, { createContext, useState } from "react";
interface LocalOrderItem {
  product: ProductEntity;
  variants: string[];
  quantity: number;
}

interface CartContextType {
  cartItems: LocalOrderItem[];
  addToCart: (item: LocalOrderItem) => void;
  removeFromCart: (index: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {
    throw new Error(
      "CartProvider not found. Make sure to wrap your components with CartProvider."
    );
  },
  removeFromCart: () => {
    console.warn(
      "removeFromCart function is not implemented in the default context value."
    );
  },
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<LocalOrderItem[]>(() => {
    const cartString = localStorage.getItem("cart");
    return cartString ? JSON.parse(cartString) : [];
  });

  const addToCart = (item: LocalOrderItem) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };
  const removeFromCart = (index: number) => {
    const array = [...cartItems];
    array.splice(index, 1);
    setCartItems(array);
    localStorage.setItem("cart", JSON.stringify(array));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
