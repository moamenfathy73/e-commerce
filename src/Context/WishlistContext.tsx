import React, { createContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/types/product.type";
import { AddToWishlist } from "@/WishlistAction/addToWishlist";
import { getUserWishlistAction } from "@/WishlistAction/getUserWishlist";
import { removeFromWishlistAction } from "@/WishlistAction/removeWishlist";

interface WishlistContextType {
  isLoading: boolean;
  wishlist: Product[];
  numOfWishlistItems: number;
  wishlistId: string;
  addToWishlist: (id: string) => Promise<any>;
  removeFromWishlist: (id: string) => Promise<any>;
  isInWishlist: (id: string) => boolean;
  toggleWishlistItem: (id: string) => Promise<"added" | "removed">;
}

export const wishlistContext = createContext<WishlistContextType | null>(null);

const WishlistContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [wishlistId, setWishlistId] = useState("");

  async function addToWishlist(id: string) {
    try {
      const data = await AddToWishlist(id);
      getUserWishlist();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromWishlist(id: string) {
    try {
      const data = await removeFromWishlistAction(id);
      setWishlist(data.data);
      setWishlistId(data.wishlistId);
      setNumOfWishlistItems(data.count);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserWishlist() {
    setIsLoading(true);
    try {
      const data = await getUserWishlistAction();
      setWishlist(data.data);
      setWishlistId(data.wishlistId);
      setNumOfWishlistItems(data.count);
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

  useEffect(() => {
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
