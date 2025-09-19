"use client";

import React from "react";
import banner2 from "./../../assets/grocery-banner-2.jpeg";
import banner1 from "./../../assets/grocery-banner.png";
import slide1 from "./../../assets/slider-image-1.jpeg";
import slide2 from "./../../assets/slider-image-2.jpeg";
import slide3 from "./../../assets/slider-image-3.jpeg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MainSlider = () => {
  return (
    <div className="mb-10 mt-[420px] md:mt-24 flex flex-col lg:flex-row gap-4">
      {/* Swiper Section */}
      <div className="w-full lg:w-2/3 relative">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletClass:
              "swiper-pagination-bullet bg-white opacity-70 w-3 h-3 rounded-full",
            bulletActiveClass:
              "swiper-pagination-bullet-active bg-green-500 opacity-100",
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="rounded-xl shadow overflow-hidden"
        >
          <SwiperSlide>
            <Image
              className="object-cover w-full h-[400px]"
              src={slide1}
              alt="Fresh products slide 1"
              priority
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              className="object-cover w-full h-[400px]"
              src={slide2}
              alt="Fresh products slide 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              className="object-cover w-full h-[400px]"
              src={slide3}
              alt="Fresh products slide 3"
            />
          </SwiperSlide>
        </Swiper>

      </div>

  
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <Image
          className="object-cover w-full h-[200px] rounded-xl shadow"
          src={banner1}
          alt="Special grocery banner 1"
        />
        <Image
          className="object-cover w-full h-[200px] rounded-xl shadow"
          src={banner2}
          alt="Special grocery banner 2"
        />
      </div>
    </div>
  );
};

export default MainSlider;
