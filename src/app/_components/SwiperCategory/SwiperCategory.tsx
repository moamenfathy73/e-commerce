"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { category } from "@/types/category.type";

const SwiperCategory = ({ categories }: { categories: category[] }) => {
  return (
    <div className="my-10">
      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        pagination={{
          clickable: true,
          el: ".custom-pagination",   
        }}
        modules={[Pagination]}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {categories.map((category, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col items-center">
              <div className="w-full h-[200px] lg:h-[250px] rounded-xl shadow-md overflow-hidden">
                <Image
                  width={200}
                  height={200}
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-3 text-center font-medium text-gray-700">
                {category.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      
      <div className="custom-pagination flex justify-center mt-4"></div>

    </div>
  );
};

export default SwiperCategory;
