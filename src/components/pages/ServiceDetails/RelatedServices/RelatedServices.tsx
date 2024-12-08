"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRelatedServiceQuery } from "@/redux/api/servicesApi";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { useFavourites } from "@/redux/hook";
import Rating from "@/components/UI/Rating";

interface RelatedServicesProps {
  categoryId: string;
  serviceId: string;
}

const RelatedServices: React.FC<RelatedServicesProps> = ({
  categoryId,
  serviceId,
}) => {
  const [swiper, setSwiper] = useState<any | null>(null);
  const { isServiceFavourite, handleFavouriteClick } = useFavourites();
  const { data } = useRelatedServiceQuery({ categoryId, serviceId });
  const services = data?.data;

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
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-8">
        <div className="section-heading mb-8">
          <div className="flex flex-wrap items-center">
            {services?.length ? (
              <div className="w-full md:w-1/2">
                <h5 className="text-2xl font-semibold mb-4">
                  Related Services
                </h5>
              </div>
            ) : (
              <></>
            )}

            {services?.length > 2 && (
              <div className="w-full md:w-1/2 text-right hidden md:block">
                <div className="inline-flex items-center space-x-4">
                  <button
                    className="rounded-full bg-[#4c40ed] hover:bg-white text-white hover:text-[#4f46e5] p-3 shadow-lg hover:shadow-xl border-transparent hover:border-[#4f46e5] border"
                    onClick={handlePrevious}
                  >
                    <IoIosArrowBack className="w-5 h-5" />
                  </button>
                  <button
                    className="rounded-full bg-[#4c40ed] hover:bg-white text-white hover:text-[#4f46e5] p-3 shadow-lg hover:shadow-xl border-transparent hover:border-[#4f46e5] border"
                    onClick={handleNext}
                  >
                    <IoIosArrowForward className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {services?.length > 1 && (
              <div className="w-full md:w-1/2 text-right block md:hidden">
                <div className="inline-flex items-center space-x-4">
                  <button
                    className="rounded-full bg-[#4c40ed] hover:bg-white text-white hover:text-[#4f46e5] p-3 shadow-lg hover:shadow-xl border-transparent hover:border-[#4f46e5] border"
                    onClick={handlePrevious}
                  >
                    <IoIosArrowBack className="w-5 h-5" />
                  </button>
                  <button
                    className="rounded-full bg-[#4c40ed] hover:bg-white text-white hover:text-[#4f46e5] p-3 shadow-lg hover:shadow-xl border-transparent hover:border-[#4f46e5] border"
                    onClick={handleNext}
                  >
                    <IoIosArrowForward className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {services?.length === 0 ? (
          <></>
        ) : (
          <Swiper
            onSwiper={handleSwiper}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
          >
            {services?.map((service: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="border rounded-md">
                  <div className="relative">
                    <div className="image-wrapper">
                      <Image
                        className="img-fluid w-full rounded-md transition-transform duration-300 ease-in-out h-auto  md:h-[220px]"
                        alt="Service Image"
                        src={service.serviceImg[service.serviceImg.length - 1]}
                        height={218}
                        width={328}
                      />
                    </div>

                    <div className="fav-item absolute top-0 left-0 p-4 flex justify-between w-full">
                      <span className="flex items-center justify-center text-sm bg-white p-2 hover:text-white text-[#665cf0] hover:bg-[#665cf0] rounded">
                        {service?.category?.categoryName}
                      </span>
                      <div
                        className="flex items-center justify-center cursor-pointer border rounded-full text-black hover:text-white bg-white  w-10 h-10 "
                        onClick={() => handleFavouriteClick(service)}
                      >
                        {isServiceFavourite(service.id) ? (
                          <FaHeart className="text-indigo-600 " />
                        ) : (
                          <FaRegHeart className="text-gray-500 " />
                        )}
                      </div>
                    </div>
                    <div className="item-info absolute bottom-0 right-0 p-4 flex items-center justify-start w-full">
                      <a href="providers.html" className="flex items-center">
                        <img
                          src={service.provider.profileImg[0]}
                          className="avatar w-10 h-10 rounded-full"
                          alt="User"
                        />
                        <span className="ml-2 text-white">{`${service?.provider?.fName} ${service?.provider?.lName}`}</span>
                      </a>
                    </div>
                  </div>
                  <div className="service-content p-4">
                    <h3 className="title text-xl font-bold">
                      <a href="service-details.html">{service.serviceName}</a>
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-gray-500 flex items-center">
                        <FiMapPin className="mr-1" /> {service.location}
                      </p>
                      <p className="flex items-center">
                        {service?.offeredPrice ? (
                          <>
                            <h6 className="text-md font-bold">
                              {" "}
                              ${service?.offeredPrice}
                            </h6>
                            <span className="line-through text-gray-500 ml-2 text-sm">
                              ${service?.regularPrice}
                            </span>
                          </>
                        ) : (
                          <>
                            <h6 className="text-md font-bold">
                              ${service?.regularPrice}
                            </h6>
                          </>
                        )}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <Rating rating={service?.averageRating || 0} />
                        <span className="ml-2 text-gray-500">
                          ({service?.totalReviews})
                        </span>
                      </div>
                      <Link
                        href={`/service-details/${service.id}`}
                        className="bg-[#f7f7ff] text-[#6240ed] border border-transparent hover:border-[#6240ed] px-4 py-2 rounded text-sm font-semibold hover:bg-white"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default RelatedServices;
