"use client";

import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cartContext } from "@/Context/CartContext";
import { wishlistContext } from "@/Context/WishlistContext";

const AddBtnCart = ({ id }: { id: string }) => {

  const cart = useContext(cartContext);
  const likes = useContext(wishlistContext);

  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  if (!cart || !likes) return null;

  const { addProductToCart } = cart;
  const { toggleWishlistItem, isInWishlist } = likes;




  async function handleAddToCart() {
    if (loadingCart) return;
    setLoadingCart(true);

    try {
      const data = await addProductToCart(id);
      

      if (data?.status === "success") {
        toast.success(data.message, { position: "top-center", duration: 1000 });
      } else {
        toast.error("There was an error adding the item to the cart.");
      }
    } catch (error ) {
      toast.error("Something went wrong while adding to cart.");
    } finally {
      setLoadingCart(false);
    }
  }

  async function handleToggleWishlist() {
    if (loadingWishlist) return;
    setLoadingWishlist(true);

    try {
      const result = await toggleWishlistItem(id);

      if (result === "added") {
        toast.success("Added to wishlist ❤️", {
          position: "top-center",
          duration: 1000,
        });
      } else {
        toast.error("Removed from wishlist 💔", {
          position: "top-center",
          duration: 1000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong while updating wishlist.");
    } finally {
      setLoadingWishlist(false);
    }
  }

  const inWishlist = isInWishlist(id);

  return (
    <div className="flex items-center mt-2 gap-1">
      <Button
        onClick={handleAddToCart}
        disabled={loadingCart}
        className="flex-1 cursor-pointer bg-green-600 hover:bg-green-700 font-medium py-2"
      >
        {loadingCart ? "Adding..." : "Add To Cart +"}
      </Button>

      <Button
        onClick={handleToggleWishlist}
        disabled={loadingWishlist}
        variant="outline"
        className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-colors duration-300 cursor-pointer ${
          inWishlist ? "border-red-500 bg-red-50" : ""
        }`}
      >
        <i
          className={`fa-solid fa-heart text-xl ${
            inWishlist ? "text-red-500" : "text-gray-400 hover:text-red-400"
          }`}
        />
      </Button>
    </div>
  );
};

export default AddBtnCart;
