import React from 'react';

const FaqSkeleton = () => {
  return (
    <div className="border rounded-lg mb-4 overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default FaqSkeleton;

