"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide, Swiper as SwiperType } from "swiper/react";
import "swiper/css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// Define the type for the images prop
interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [swiper, setSwiper] = useState<any | null>(null);

  const handleSwiper = (swiper: any) => {
    setSwiper(swiper);
  };

  const handlePrevious = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  return (
    <div className="mx-auto py-4">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-2xl font-semibold">Gallery</h5>
        <div className="flex space-x-2">
          <button
            className="rounded-full text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white p-3 shadow-lg hover:shadow-xl"
            onClick={handlePrevious}
          >
            <IoIosArrowBack className="w-5 h-5" />
          </button>
          <button
            className="rounded-full text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white p-3 shadow-lg hover:shadow-xl"
            onClick={handleNext}
          >
            <IoIosArrowForward className="w-5 h-5" />
          </button>
        </div>
      </div>
      <Swiper
        onSwiper={handleSwiper}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-full h-64 object-cover rounded"
              src={image}
              alt={`Gallery image ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
