import React from "react";

const ServiceSkeletonCard: React.FC = () => {
  return (
    <div className="bg-gray-200 rounded-lg shadow-md h-[400px]">
      <div className="bg-gray-300 h-[240px] rounded-t-md"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSkeletonCard;
