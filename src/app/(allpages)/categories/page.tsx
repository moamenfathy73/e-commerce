import React from "react";

import getAllCategories from "@/apis/allCategories";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";

const Categories = async () => {
  const data = await getAllCategories();

  console.log(data);

  return (
    <section className="px-5 md:px-0 mt-[450px] md:mt-28 w-full md:w-[80%] mx-auto">

        <h2 className="text-3xl font-extrabold text-center mb-10 text-green-600">
        Categories
      </h2>
      <div className="flex flex-wrap">
        {data.map((category, idx) => (
          <div
            key={idx}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3"
          >
            <Card className="p-2 gap-2">
              <Link href={`/subCategory/${category._id}`}>
              <CardHeader className="px-0">
                <div className="w-full h-[300px] relative">
                  <Image
                    src={category.image}                              
                    alt={category.name}
                    width={200}
                    height={200}
                    className=" h-full w-full object-cover"
                  />
                </div>
              </CardHeader>

              <CardContent className="px-0">
                <p className="font-bold text-green-500 mb-3">{category.name}</p>
              </CardContent>
               </Link>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
