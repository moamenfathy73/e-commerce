import React from "react";
import getAllPrands from "@/apis/allPrands";
import Image from "next/image";
import Link from "next/link";

const Brand = async () => {
  const data = await getAllPrands();
  console.log(data);

  return (
    <section className="px-5 mt-[450px] md:mt-28 md:px-0 my-10 w-full md:w-[80%] mx-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-6">Our Brands</h2>
      <div className="flex flex-wrap">
        {data.map((brand) => (
          <div
            key={brand._id}
            className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-3"
          >
           <Link href={`/specificBrand/${brand._id}`}>
              <div className="border rounded-lg shadow p-3 flex flex-col items-center cursor-pointer hover:shadow-lg transition">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={150}
                  height={150}
                  className="object-contain w-full h-[150px]"
                />
                <p className="mt-3 font-semibold">{brand.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brand;
