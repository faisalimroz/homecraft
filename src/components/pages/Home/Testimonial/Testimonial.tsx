"use client";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import AOS from "aos";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import TestimonialSkeleton from "./TestimonialSkeleton";
import { useReviewsQuery } from "@/redux/api/reviewApi";

// Default fallback image for missing profile pictures
const DEFAULT_AVATAR = "/assets/default-avatar.jpg";

const Testimonial: React.FC = () => {
  const [swiper, setSwiper] = useState<any | null>(null);
  const { data, error, isLoading } = useReviewsQuery(undefined);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSwiper = (swiper: any) => setSwiper(swiper);

  const handlePrevious = () => swiper?.slidePrev();
  const handleNext = () => swiper?.slideNext();

 
  const testimonials =
    data?.data?.map((review: any) => ({
      id: review.id,
      image: review.user.profileImg?.[0] || DEFAULT_AVATAR,
      text: review.comment,
      name: `${review.user.fName} ${review.user.lName}`,
      rating: review.rating,
    })) || [];

  if (isLoading) return <TestimonialSkeleton />;

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p className="text-lg font-semibold">Failed to load testimonials. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-[6rem] py-10 md:py-14 relative main" data-aos="fade-up">
      <div className="text-center mb-16">
        <div className="section-heading">
          <h2 className="text-4xl font-bold text-gray-900">Hear From Our Valued Clients</h2>
          <p className="text-gray-600 mt-4 text-sm">
            See how our clients benefit from our services through their reviews.
          </p>
        </div>
      </div>

      <div className="relative px-4">
        <Swiper
          onSwiper={handleSwiper}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1, spaceBetween: 10 },
            992: { slidesPerView: 2, spaceBetween: 10 },
            1024: { slidesPerView: 2, spaceBetween: 10 },
          }}
        >
          {testimonials.map((testimonial:any) => (
            <SwiperSlide
              key={testimonial.id || Math.random()}
              className="bg-white p-6 rounded-lg border"
            >
           <div className=" md:h-[230px]">   <div className="flex justify-center mb-4 relative">
                <div className="image-half-bg absolute top-0 left-0 w-full h-full bg-[#f8fcfd] rounded-t-lg"></div>
                <Image
                  src={testimonial.image}
                  alt={`Image of ${testimonial.name}`}
                  className="rounded-full w-24 h-24 border-4 border-indigo-100 relative z-10"
                  width={72}
                  height={72}
                />
              </div>
              <div className="text-center">
                <ReactStars
                  count={5}
                  value={testimonial.rating}
                  size={24}
                  isHalf={true}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p className="text-gray-700 my-4">{testimonial.text}</p>
                <h5 className="text-xl font-bold text-indigo-700">{testimonial.name}</h5>
              </div></div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="rounded-full text-indigo-600 bg-white hover:bg-indigo-600 hover:text-white p-3 shadow-lg hover:shadow-xl border-transparent hover:border-indigo-600 border absolute top-1/2 left-[-1rem] md:left-[-2.5rem] transform -translate-y-1/2 z-20"
          onClick={handlePrevious}
        >
          <IoIosArrowBack className="w-5 h-5" />
        </button>
        <button
          className="rounded-full text-indigo-600 bg-white hover:bg-indigo-600 hover:text-white p-3 shadow-lg hover:shadow-xl border-transparent hover:border-[#4f46e5] border absolute top-1/2 right-[-1rem] md:right-[-2.5rem] transform -translate-y-1/2 z-20"
          onClick={handleNext}
        >
          <IoIosArrowForward className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Testimonial;
