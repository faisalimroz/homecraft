"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useBlogsQuery } from "@/redux/api/blogApi";
import BlogCard from "./BlogCard/BlogCard";
import { Swiper, SwiperSlide, Swiper as SwiperType } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import SkeletonBlog from "./SkeletonBlog";
const Main = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const categoryId:any = searchParams.get("categoryId");
  const month = searchParams.get("month");
  const year = searchParams.get("year");
 

  const blogsPerPage = 3;

  const { data, isLoading } = useBlogsQuery({ categoryId, month: month ? parseInt(month, 10) : undefined, year: year ? parseInt(year, 10) : undefined });

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, month, year]);

  const blogs = data?.data;
 
  const displayedBlogs =
    pathname === "/"
      ? blogs
      : blogs?.slice(
          (currentPage - 1) * blogsPerPage,
          currentPage * blogsPerPage
        );

  
  const totalPages = Math.ceil(blogs?.length / blogsPerPage);

  if(isLoading){
    return  <SkeletonBlog/>
  }

  return (
    <>
    <div className="mx-auto px-6 md:px-[4rem] py-10 md:py-14 bg-[#f8fcfd] main">
      {pathname !== "/blogs" && (
        <div className="text-center mb-8">
          <div
           
            data-aos="fade-up"
          >
            <h2 className="text-3xl font-semibold">Our Recent Blog</h2>
            <p className="text-gray-400 mt-4">Discover useful guides and expert advice to help you maintain and enhance your living spaces</p>
          </div>
        </div>
      )}
       {pathname === "/" ? (
        <Swiper
          modules={[Pagination]}
          pagination
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
          {displayedBlogs?.map((blog: any) => (
            <SwiperSlide key={blog?.id}>
              <BlogCard blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedBlogs?.map((blog: any) => (
            <BlogCard key={blog?.id} blog={blog} isLoading={isLoading} />
          ))}
        </div>
      )}

      {pathname === "/blogs" && (
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
    </div>
    </>
  );
};

export default Main;
