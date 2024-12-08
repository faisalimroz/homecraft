"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import "aos/dist/aos.css";
import { FaCheckCircle } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiArrowRightCircle } from "react-icons/fi";
import { useProvidersQuery } from "@/redux/api/providerApi";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import Link from "next/link";
import ProviderSkeleton from "./ProviderSkeleton";

const TopProviders = () => {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useProvidersQuery(undefined);
  const providersPerPage = 8;
  const providers = data?.data || [];

  const displayedProviders =
    pathname === "/"
      ? providers.slice(-4)
      : providers.slice(
          (currentPage - 1) * providersPerPage,
          currentPage * providersPerPage
        );

  const totalPages = Math.ceil(providers.length / providersPerPage);

  return (
    <section className="px-6 md:px-[4rem] bg-white py-14 main">
      <div>
        {pathname !== "/providers" && (
          <div className="section-heading mb-8">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-1/2" data-aos="fade-up">
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  Top Providers
                </h2>
                <p className="text-gray-400 mt-4">
                  Discover the best providers offering top-rated services for
                  all your needs.
                </p>
              </div>
              <div className="w-full md:w-1/2 text-right" data-aos="fade-up">
                {displayedProviders?.length > 3 && (
                  <Link href="/providers">
                    <button className="text-indigo-600 border border-indigo-600 inline-flex items-center bg-white px-4 py-2 rounded-md hover:bg-indigo-600 hover:text-white transition duration-300">
                      View All
                      <FiArrowRightCircle className="ml-2" size={20} />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProviderSkeleton key={index} />
            ))}
          </div>
        ) : displayedProviders.length === 0 ? (
          <div className="text-center mt-8">
            <p className="text-lg text-gray-500">
              No providers available at the moment.
            </p>
          </div>
        ) : (
          <>
            <div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8 "data-aos="fade-up"
            >
              {displayedProviders?.map((provider: any, index: number) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                >
                  <div className="p-4">
                    <Image
                      src={provider?.profileImg[0]}
                      height={195}
                      width={220}
                      alt="Provider"
                      className="w-full h-54 object-cover rounded-md"
                    />
                  </div>

                  <div className="px-4 pb-4 flex flex-col justify-between flex-1">
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold text-gray-800 flex items-center">
                          <a
                            href={`/provider-details/${provider?.id}`}
                            className="hover:underline text-indigo-600"
                          >
                            {provider?.fName} {provider?.lName}
                          </a>
                          <FaCheckCircle className="text-green-500 ml-2" />
                        </h4>
                        <span className="text-gray-600 text-md">
                          {provider?.category?.categoryName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-500 h-[1.2em] w-[1.2em]" />
                        <span className="text-gray-500 ml-2">
                          ({provider?.totalReviews})
                        </span>
                      </div>
                      <Link href={`/provider-details/${provider.id}`}>
                        <button className="ml-4 text-indigo-600 py-2 px-4 rounded-md border border-indigo-600 hover:bg-indigo-600 bg-white hover:text-white duration-300">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pathname === "/providers" && providers.length > 3 && (
              <div className="flex justify-center mt-8">
                <button
                  className={`inline-flex items-center px-4 py-2 mx-1 rounded-lg transition-colors ${
                    currentPage === 1
                      ? "text-gray-500 cursor-not-allowed text-sm"
                      : "text-gray-700 hover:from-blue-500 hover:to-blue-700 text-sm font-bold hover:text-[#4f46e5]"
                  }`}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FiArrowLeft className="mr-1" /> PREV
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 mx-1 rounded-lg transition-colors ${
                      currentPage === index + 1
                        ? "bg-[#4f46e5] text-white"
                        : "bg-[#f8fcfd] border border-gray-300 text-gray-800 hover:bg-[#4f46e5] text-sm hover:text-white"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className={`inline-flex items-center px-4 py-2 mx-1 rounded-lg transition-colors ${
                    currentPage === totalPages
                      ? "text-gray-500 cursor-not-allowed text-sm"
                      : "text-gray-700 text-sm font-bold hover:text-[#4f46e5]"
                  }`}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  NEXT <FiArrowRight className="ml-1" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TopProviders;
