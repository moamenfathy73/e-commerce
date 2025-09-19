"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product.type";
import AddBtnCart from "../AddBtnCart/AddBtnCart";
import { motion } from "framer-motion";

const HomeCArd = ({ product }: { product: Product }) => {
  return (
    <motion.div
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(0,0,0,0.2)" }}
    >
      <Card className="p-2 gap-2">
        <Link href={`/productDetails/${product.id}`}>
          <CardHeader className="px-0">
            <motion.div
              className="overflow-hidden rounded-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                width={500}
                height={500}
                src={product.imageCover}
                alt={product.title}
                className="object-cover w-full h-60"
              />
            </motion.div>
          </CardHeader>

          <CardContent className="px-0">
            <p className="font-bold text-green-500 mb-3">{product.category.name}</p>
            <p className="line-clamp-1">{product.title}</p>
          </CardContent>

          <CardFooter className="px-0">
            <div className="w-full flex justify-between items-center">
              <p>{product.price} EGP</p>
              <p>
                {product.ratingsAverage}{" "}
                <i className="fa-solid fa-star text-yellow-300"></i>
              </p>
            </div>
          </CardFooter>
        </Link>

        <AddBtnCart id={product.id} />
      </Card>
    </motion.div>
  );
};

export default HomeCArd;
