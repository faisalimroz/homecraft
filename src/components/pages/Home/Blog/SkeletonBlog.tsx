import { usePathname } from 'next/navigation';
import React from 'react';

const SkeletonBlog = () => {
    const pathname = usePathname();
  return (
   <div className='mx-auto px-6 md:px-[4rem] py-10 md:py-14 bg-[#f8fcfd] main'>
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
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 ">
          <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      ))}
    </div>
   </div>
  );
};

export default SkeletonBlog;

