"use client";

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { AddToWishlist } from "@/WishlistAction/addToWishlist";
import { getUserWishlistAction } from "@/WishlistAction/getUserWishlist";
import { removeFromWishlistAction } from "@/WishlistAction/removeWishlist";




export const wishlistContext = createContext({});

const WishlistContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [wishlistId, setWishlistId] = useState("");

async function addToWishlist(id: string) {
    try {
      const data = await AddToWishlist(id);
       getUserWishlist();

      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }


  



  async function removeFromWishlist(id: string) {
    try {
      const data = await removeFromWishlistAction(id);

    setNumOfWishlistItems(data.count);
    console.log("Wishlist fetched:", data.data.length);

    setWishlist(data.data);
    setWishlistId(data.wishlistId);
    setNumOfWishlistItems(data.count);
    console.log(data);


      return data;
    } catch (error) {
      console.log(error);
    }
  }




 async function getUserWishlist() {
  setIsLoading(true);

  try {
    const data = await getUserWishlistAction();

    setNumOfWishlistItems(data.count);
    setWishlist(data.data);
    setWishlistId(data.wishlistId);

   
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
}

async function toggleWishlistItem(id: string) {
  if (isInWishlist(id)) {
    await removeFromWishlistAction(id);
    await getUserWishlist(); 
    return "removed";
  } else {
    await AddToWishlist(id);
    await getUserWishlist(); 
    return "added";
  }
}





function isInWishlist(id: string) {
  return wishlist.some(item => item._id === id);
}




    useEffect(function () {
    getUserWishlist();
  }, []);




  return (
    <wishlistContext.Provider
      value={{
        isLoading,
        wishlist,
        numOfWishlistItems,
        wishlistId,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlistItem
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
};

export default WishlistContextProvider;
