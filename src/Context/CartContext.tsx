"use client";
import { getUserCardAction } from "@/CartActions/getUserCard";
import React, { createContext, useEffect, useState } from "react";
import { AddToCart } from "@/CartActions/addToCart";
import { removeCartItemAction } from "@/CartActions/removeCart";
import { updateCartAction } from "@/CartActions/updateCart";
import { clearCartAction } from "@/CartActions/clearCart";

interface CartProduct {
  product: {
    id: string;
    title: string;
    imageCover?: string;
    price?: number;
  
  };
  count: number;
  price: number;
}


interface CartResponse {
  message: string;
  status: string;
  numOfCartItems: number;
  data: {
    totalCartPrice: number;
    products: CartProduct[];
  };
  cartId?: string;
}


interface CartContextType {
  isLoading: boolean;
  products: CartProduct[];
  totalCartPrrise: number;
  numOfCartItem: number;
  cartId: string;
  addProductToCart: (id: string) => Promise<CartResponse | undefined>;
  removeCartItem: (id: string) => Promise<CartResponse | undefined>;
  updateCart: (id: string, count: number) => Promise<CartResponse | undefined>;
  clearCart: () => Promise<void>;
  afterPayment: () => void;
}

// 🟢 context
export const cartContext = createContext<CartContextType | null>(null);

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numOfCartItem, setNumOfCartItem] = useState(0);
  const [totalCartPrrise, setTotalCartPrrise] = useState(0);
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState("");

  async function addProductToCart(id: string) {
    try {
      const data: CartResponse = await AddToCart(id);
      getUserCart();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function removeCartItem(id: string) {
    try {
      const data: CartResponse = await removeCartItemAction(id);
      setNumOfCartItem(data.numOfCartItems);
      setTotalCartPrrise(data.data.totalCartPrice);
      setProducts(data.data.products);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCart(id: string, count: number) {
    try {
      const data: CartResponse = await updateCartAction(id, count);
      setNumOfCartItem(data.numOfCartItems);
      setTotalCartPrrise(data.data.totalCartPrice);
      setProducts(data.data.products);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function clearCart() {
    try {
      await clearCartAction();
      setNumOfCartItem(0);
      setTotalCartPrrise(0);
      setProducts([]);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserCart() {
    setIsLoading(true);
    try {
      const data: CartResponse = await getUserCardAction();
      setNumOfCartItem(data.numOfCartItems);
      setTotalCartPrrise(data.data.totalCartPrice);
      setProducts(data.data.products);
      if (data.cartId) setCartId(data.cartId);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  function afterPayment() {
    setNumOfCartItem(0);
    setTotalCartPrrise(0);
    setProducts([]);
    setCartId("");
  }

  return (
    <cartContext.Provider
      value={{
        isLoading,
        products,
        totalCartPrrise,
        numOfCartItem,
        addProductToCart,
        removeCartItem,
        updateCart,
        clearCart,
        cartId,
        afterPayment,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
