import React from "react";
import getSpecificBrand from "@/apis/getSpecificBrand";
import Image from "next/image";


const SpecificBrand = async ({ params }: { params: { id: string } }) => {
  const brand= await getSpecificBrand(params.id);



  return (
    <section className="px-5  mt-[450px] md:mt-28 md:px-0  w-full md:w-[80%] mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-6">{brand.name}</h1>

      <Image
        src={brand.image}
        alt={brand.name}
        width={240}
        height={240}
        className="w-60 h-60 object-contain"
      />

      <p className="mt-4 text-gray-500">Slug: {brand.slug}</p>
      <p className="text-gray-400 text-sm">Created: {brand.createdAt}</p>
    </section>
  );
};

export default SpecificBrand;
