"use client";
import { useServicesQuery } from "@/redux/api/servicesApi";
import React, { Suspense, useEffect, useState } from "react";
import { FaChevronDown, FaHeart, FaMapMarkerAlt, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import Loader from "../../UI/Loader";
import { useCategoriesNameQuery } from "@/redux/api/categoryApi";
import { useDebounced, useFavourites } from "@/redux/hook";
import { useSearchParams } from "next/navigation";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Rating from "../../UI/Rating";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import Pagination from "../../UI/Pagination";
import SkeletonServiceCard from "./SkeletonServiceCard";


const ServicesPage = () => {
  const query: Record<string, any> = {};
  const [sliderValue, setSliderValue] = useState(0);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locationTerm, setLocationTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'asc' | 'desc'>('asc');
  const [ratingCounts, setRatingCounts] = useState<Record<number, number>>({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { isServiceFavourite, handleFavouriteClick } = useFavourites();

 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option: 'asc' | 'desc') => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };
  
  useEffect(() => {
    if (categoryId) {
      setSelectedCategories([categoryId]);
    }
  }, [categoryId]);

  query["limit"] = size;
  query["page"] = page;
 
  query["sortOrder"] = selectedOption; 
  query["sortBy"] = "regularPrice"; 
  

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  const debouncedLocationTerm = useDebounced({
    searchQuery: locationTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  if (!!debouncedLocationTerm) {
    query["location"] = debouncedLocationTerm;
  }

  if (selectedCategories.length > 0) {
    query["category"] = selectedCategories;
  }

  if (typeof selectedRating === "number") {
    query["rating"] = selectedRating;
  }

  const servicesPerPage = 4

  const { data, isLoading } = useServicesQuery({
    ...query,
    ...selectedFilters,
    price_gte: sliderValue,
  });


  const services = data?.data?.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  const totalPages = Math.ceil(data?.meta?.total / servicesPerPage);


  useEffect(() => {
    if (data?.meta?.ratingCounts) {
      setRatingCounts(data.meta.ratingCounts);
    }
  }, [data]);

  const { data: categoriesData }: any = useCategoriesNameQuery(undefined);
  const categories = categoriesData?.data;

  const handleCategoryChange = (e: any) => {
    const categoryValue = e.target.value;
    const isChecked = e.target.checked;

    setSelectedCategories((prevCategories) => {
      if (isChecked) {
        return [...prevCategories, categoryValue];
      } else {
        return prevCategories.filter((category) => category !== categoryValue);
      }
    });
  };

  const handleSliderChange = (event: any) => {
    const value = event.target.value;
    setSliderValue(value);
    setSelectedFilters({ ...selectedFilters, minPrice: value });
  };

  const handleRatingFilter = (stars: number) => {
    if (selectedRating === stars) {
      setSelectedRating(null);
    } else {
      setSelectedRating(stars);
    }
  };

  const renderStars = (count: any) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= count) {
        stars.push(<FaStar key={i} className="text-[#ffbc35] ml-2" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-[#ffbc35] ml-2" />);
      }
    }
    return stars;
  };

  



  return (
   <>
     <Toaster position="top-center" reverseOrder={false} />
    <div className="md:px-[4rem] py-6">
      <section>
        <div className="flex justify-between items-center w-full mb-4 ">
          <h2 className="text-xl font-semibold text-gray-800 ml-4 md:ml-0">Filter By</h2>
          <div className="mr-4 md:mr-0">
            <button
              onClick={toggleDropdown}
              className={`text-black border border-gray-400 px-4 py-2 rounded flex items-center`}
            >
              {selectedOption === 'asc' ? 'Price Low to High' : 'Price High to Low'}
              <FaChevronDown
                className={`ml-2 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                size={14}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute  w-48 bg-white border rounded shadow-lg">
                <p
                
                  onClick={() => handleOptionClick('asc')}
                  className={`block px-4 py-2 ${selectedOption === 'asc' ? 'bg-[#6240ed] text-white' : 'text-gray-700 hover:bg-[#f8fcfd] hover:text-black'}`}
                >
                  Price Low to High
                </p>
                <p
               
                  onClick={() => handleOptionClick('desc')}
                  className={`block px-4 py-2 ${selectedOption === 'desc' ? 'bg-[#6240ed] text-white' : 'text-gray-700 hover:bg-[#f8fcfd] hover:text-black'}`}
                >
                  Price High to Low
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-x-4">
          <div className="col-span-4 md:col-span-1 mx-4 md:mx-0 rounded-md md:block">
            <div className="bg-[#f8fcfd] rounded-lg">
              <div className="p-6">
                <p className="text-lg font-semibold text-gray-800 mb-4">
                  Keyword
                </p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500 focus:shadow-outline transition duration-300 ease-in-out font-md"
                  placeholder="What are you looking for?"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {categoryId ? (
              <></>
            ) : (
              <div className="w-full py-4">
                <div className="flex flex-col rounded-md py-6 bg-[#f8fcfd]">
                  <p className="text-[#32353C] py-1 px-4 font-semibold text-lg">
                    Categories
                  </p>
                  {categories?.map((category: any) => (
                    <div
                      key={category?.id}
                      className="w-full px-5 py-2 rounded-md flex items-center"
                    >
                      <label className="cursor-pointer flex items-center">
                        <input
                          className="checkbox checkbox-md"
                          type="checkbox"
                          style={{ accentColor: "#1475c6" }}
                          onChange={handleCategoryChange}
                          value={category?.id}
                        />
                        <span className="text-sm text-gray-500 font-sm ml-2">
                          {category?.name}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={`bg-[#f8fcfd] rounded-lg py-4 ${categoryId && `mt-4`}`}>
              <div className="p-6">
                <p className="text-xl font-semibold text-gray-800 mb-4">
                  Location
                </p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500 focus:shadow-outline transition duration-300 ease-in-out font-md"
                  placeholder="Select Location"
                  onChange={(e) => setLocationTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-[#f8fcfd] rounded-lg mt-4 p-6">
              <p className="text-lg font-semibold text-gray-800 mb-4">
                Price Range
              </p>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center w-full mt-4">
                  <span className="text-gray-700 mr-4">$0</span>
                  <input
                    type="range"
                    className="w-full h-2 rounded-full bg-blue-600 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    min={0}
                    max={100}
                    value={sliderValue} 
                    onChange={handleSliderChange}
                  />
                  <span className="text-gray-700 ml-4">$100</span>
                </div>
              </div>
              <p className="text-gray-700">Selected Price: <span className="text-blue-600 font-semibold">${sliderValue}</span></p>
            </div>

            <div className="bg-[#f8fcfd] rounded-lg mt-4 p-6">
              <p className="text-lg font-semibold text-gray-800 mb-4">Rating</p>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`rating-${stars}`}
                      className="mr-2 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      checked={selectedRating === stars}
                      onChange={() => handleRatingFilter(stars)}
                    />
                    <label
                      htmlFor={`rating-${stars}`}
                      className="flex items-center text-lg"
                    >
                      {renderStars(stars)}
                      <span className="pl-10 text-gray-600 text-sm font-normal">
                        ({ratingCounts[stars] || 0})
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-3 mx-4 my-4 md:mx-0 md:my-0">
           {isLoading ? <> {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonServiceCard key={index} />
      ))} </> : <> {services?.map((service: any) => (
              <div
                key={service.id}
                className="bg-white border px-3 rounded-lg overflow-hidden w-full mx-auto mb-3"
              >
                <div className="flex flex-col md:flex-row py-2">
                  <div className="relative w-full md:w-1/3">
                    <img
                      className="w-full h-auto md:h-48 object-cover rounded-lg"
                      alt={service.serviceName}
                      src={service.serviceImg[service.serviceImg.length - 1]}
                    />
                    <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"  onClick={() => handleFavouriteClick(service)}>
                 
                          {isServiceFavourite(service.id) ? (
                            <FaHeart className="text-indigo-600" />
                          ) : (
                            <FaRegHeart className="text-gray-500" />
                          )}
                        
                    </div>
                  </div>

                  <div className="px-0 md:px-8  py-4 md:py-0 flex-1 flex flex-col justify-between">
                    <div >
                   <div className="flex justify-between">
                   <h3 className="text-xl font-semibold mt-2">
                        <a
                          href={`/service-details/${service.id}`}
                          className="text-gray-900 hover:text-blue-500 transition-colors"
                        >
                          {service.serviceName}
                        </a>
                      </h3>
                      <p
                        className="bg-[#f7f7ff] text-[#6240ed] border border-transparent hover:border-[#6240ed] px-4 py-2 rounded text-sm font-semibold hover:bg-white"
                      >
                        {service.category.categoryName}
                      </p>
                   </div>
                   
                      <p className="text-gray-600 mt-2 flex items-center text-sm">
                        <FaMapMarkerAlt className="mr-2" /> {service?.location}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center">
                     
                      <span className="text-yellow-500 flex items-center">
                      <Rating rating={service?.averageRating || 0} />  ({service?.averageRating})
                      </span>
                    </div>

                    <div className="mt-2 flex justify-between items-center">
                      <h6 className="text-lg font-bold text-gray-900">
                        ${service.regularPrice}.00{" "}
                        {service?.offeredPrice &&  
                 <span className="line-through text-gray-500 ml-2 text-sm">
                    ${service?.offeredPrice}
                  </span>}
                      </h6>
                      <a
                        href={`/service-details/${service.id}`}
                        className="text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white py-2 px-6 rounded-md "
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}</>}

{
  data?.meta?.total > 3 && <div className="flex items-center justify-end mt-10">
       
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
  />
</div>
}

      
    
        

          </div>

        </div>
      </section>
    </div>
   </>
  );
};

export default ServicesPage;
