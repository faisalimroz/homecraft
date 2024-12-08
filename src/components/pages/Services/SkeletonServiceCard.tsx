import React from "react";

const SkeletonServiceCard = () => {
  return (
    <div className="bg-white border px-3 rounded-lg overflow-hidden w-full mx-auto mb-3 ">
      <div className="flex flex-col md:flex-row py-2">
    
        <div className="relative w-full md:w-1/3">
          <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
          <div className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full shadow-md">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          </div>
        </div>

    
        <div className="px-0 md:px-8 py-4 md:py-0 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <div className="w-2/3 h-6 bg-gray-300 rounded-md mt-2"></div>
              <div className="w-1/3 h-8 bg-gray-200 rounded-md"></div>
            </div>
            <div className="mt-4 w-1/2 h-4 bg-gray-300 rounded-md"></div>
          </div>

          <div className="mt-2 flex items-center">
            <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
          </div>

          <div className="mt-2 flex justify-between items-center">
            <div className="w-1/4 h-6 bg-gray-300 rounded-md"></div>
            <div className="w-24 h-8 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonServiceCard;
