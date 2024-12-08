"use client";
import { useFavourites } from "@/redux/hook";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaImages, FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const ServiceGallery = ({ data }: any) => {
  const { isServiceFavourite, handleFavouriteClick } = useFavourites();
  const service = data?.data;
  const [showSlider, setShowSlider] = useState(false);
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSeeAllPhotos = (photos: string[]) => {
    setSliderImages(photos);
    setCurrentIndex(0);
    setShowSlider(true);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length);
  };

  if (!service) {
    return <div>No service data available.</div>;
  }

  return (
   <>
     <Toaster position="top-center" reverseOrder={false} />
    <section className="w-full">
      <div className="mx-auto px-6 md:px-[6rem] py-4 w-full">
        <h2 className="text-4xl font-semibold mb-4">{service.serviceName}</h2>
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-6">
            <div>
              <span className="bg-[#f8fcfd] text-blue-600 py-2 px-3">{service.category.categoryName}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FiMapPin className="text-md mr-2" />
              {service.location}
            </div>
          </div>
          <div
  className="flex items-center justify-center cursor-pointer border rounded-full text-black hover:text-white bg-white  w-14 h-14 "
  onClick={() => handleFavouriteClick(service)}
>
  {isServiceFavourite(service.id) ? (
    <FaHeart className="text-indigo-600 " size={20} />
  ) : (
    <FaRegHeart className="text-gray-500 " size={20}/>
  )}
</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
          <div className="col-span-1 sm:col-span-1 md:col-span-2 rounded-lg w-full">
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
              <div className="relative rounded-l-lg overflow-hidden">
                <img
                  src={service.serviceImg[0]}
                  alt={service.serviceName}
                  className="w-full h-auto md:h-[455px] object-cover rounded-lg"
                />
                <div>
                  <button
                    onClick={() => handleSeeAllPhotos(service.serviceImg)}
                    className="absolute bottom-4 md:bottom-16 left-4 py-2 md:py-3 px-3 md:px-5 bg-white text-black text-center rounded-lg hover:bg-blue-700 flex items-center hover:text-white"
                  >
                    <FaImages className="mr-2" /> See All Photos
                  </button>
                </div>
              </div>
              <div className="grid md:grid-rows-2 gap-2 w-full">
                <div className="relative overflow-hidden">
                  <img
                    src={service.serviceImg[1]}
                    alt={service.serviceName}
                    className="w-full h-auto md:h-[250px] object-cover rounded-lg "
                  />
                  <button
                    onClick={() => handleSeeAllPhotos(service.serviceImg)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="bg-white p-5 rounded-full text-black">
                     <MdOutlineRemoveRedEye />
                    </div>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.serviceImg[2]}
                      alt={service.serviceName}
                      className="w-full h-auto md:h-[200px] object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleSeeAllPhotos(service.serviceImg)}
                      className="absolute md:h-[200px] inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="bg-white p-5 rounded-full text-black">
                      <MdOutlineRemoveRedEye />
                      </div>
                    </button>
                  </div>
                  <div className="relative overflow-hidden">
                    <img
                      src={service.serviceImg[3]}
                      alt={service.serviceName}
                      className="w-full h-auto md:h-[200px] object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleSeeAllPhotos(service.serviceImg)}
                      className="absolute md:h-[200px] inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="bg-white p-5 rounded-full text-black">
                      <MdOutlineRemoveRedEye />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showSlider && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <button
              className="fixed top-4 right-4 text-white text-2xl md:text-3xl hover:text-gray-300 transition-colors duration-300"
              onClick={() => setShowSlider(false)}
            >
              &times;
            </button>
            <button
              className="fixed left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl md:text-3xl hover:text-gray-300 transition-colors duration-300"
              onClick={handlePrev}
            >
              &#8592;
            </button>
            <button
              className="fixed right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl md:text-3xl hover:text-gray-300 transition-colors duration-300"
              onClick={handleNext}
            >
              &#8594;
            </button>
            <div className="relative w-11/12 md:w-3/4 h-3/4">
              <div className="absolute inset-0 overflow-y-auto flex justify-center items-center px-8 md:px-0">
                <img
                  src={sliderImages[currentIndex]}
                  alt={`Slider ${currentIndex}`}
                  className="w-full h-auto object-contain mb-4"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
   </>
  );
};

export default ServiceGallery;
