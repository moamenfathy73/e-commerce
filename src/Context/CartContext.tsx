import { getUserCardAction } from "@/CartActions/getUserCard";

import React, { createContext, useEffect, useState } from "react";
import { AddToCart } from "@/CartActions/addToCart";
import { removeCartItemAction } from "@/CartActions/removeCart";
import { updateCartAction } from "@/CartActions/updateCart";
import { clearCartAction } from "@/CartActions/clearCart";


export const cartContext = createContext({});

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numOfCartItem, setNumOfCartItem] = useState(0);
  const [totalCartPrrise, setTotalCartPrrise] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState("");
  

  async function addProductToCart(id: string) {
    try {
      const data = await AddToCart(id);
      getUserCart();

      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }



  async function removeCartItem(id: string) {
    try {
      const data = await removeCartItemAction(id);

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
      const data = await updateCartAction(id, count);

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
      const data = await clearCartAction();

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
      const data = await getUserCardAction();

      setNumOfCartItem(data.numOfCartItems);
      setTotalCartPrrise(data.data.totalCartPrice);
      setProducts(data.data.products);
      setCartId(data.cartId);

      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(function () {
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
