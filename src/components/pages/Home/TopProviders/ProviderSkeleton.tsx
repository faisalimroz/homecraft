import React from "react";

const ProviderSkeleton = () => (
  <div className="bg-gray-100 shadow rounded-lg h-full flex flex-col">
    <div className="h-44 bg-gray-200 rounded-t-md"></div>
    <div className="px-4 py-4 flex-1">
      <div className="h-5 bg-gray-300 rounded-md w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded-md w-1/2 mb-4"></div>
      <div className="mt-auto">
        <div className="h-4 bg-gray-300 rounded-md w-1/3 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded-md w-full"></div>
      </div>
    </div>
  </div>
);

export default ProviderSkeleton;
