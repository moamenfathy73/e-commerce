"use client";

import React, { useContext } from "react";
import Loading from "@/app/loading";
import { wishlistContext } from "@/Context/WishlistContext";

import Image from "next/image";
import Link from "next/link";
import AddBtnCart from "@/app/_components/AddBtnCart/AddBtnCart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Product } from "@/types/product.type";

const Wishlist = () => {
const context = useContext(wishlistContext);
if (!context) return null;
const { wishlist, isLoading, isInWishlist } = context;

  // if (isLoading) {
  //   return <Loading />;
  // }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6 text-center ">
        <h1 className="text-4xl font-bold text-red-500">
          💔 Your Wishlist is Empty!
        </h1>
        <p className="text-gray-500 text-lg">
          Looks like you haven’t added any products yet.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Go Shopping 🛒
        </Link>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto py-12 mt-[400px] md:mt-24">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        My Wishlist ❤️
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlist.map((product :Product, index: number) => {
          const inWishlist = isInWishlist(product._id);

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col"
            >
              <Card className="p-2 gap-2 flex flex-col justify-between shadow hover:shadow-xl transition rounded-xl">
              
                <Link href={`/productDetails/${product.id}`}>
                  <CardHeader className="px-0">
                    <Image
                      width={500}
                      height={500}
                      src={product.imageCover }
                       alt={product.title ? product.title : "Product image"}
                      className="rounded-lg object-cover h-60 w-full"
                    />
                  </CardHeader>

                  <CardContent className="px-0">
                    <p className="font-bold text-green-500 mb-2 text-sm">
                      {product.category?.name}
                    </p>
                    <p className="line-clamp-1 text-gray-800 font-medium">
                      {product.title}
                    </p>
                  </CardContent>

                  <CardFooter className="px-0 mb-2">
                    <div className="w-full flex justify-between items-center text-sm text-gray-600">
                      <p className="font-semibold">{product.price} EGP</p>
                      <p className="flex items-center gap-1">
                        {product.ratingsAverage}
                        <i className="fa-solid fa-star text-yellow-400"></i>
                      </p>
                    </div>
                  </CardFooter>
                </Link>

               
                <div className="flex items-center justify-between mt-2">
                  <AddBtnCart id={product._id} />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
