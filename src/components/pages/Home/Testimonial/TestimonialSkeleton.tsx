"use client";
import React from 'react';

const TestimonialSkeleton: React.FC = () => {
  return (
    <div className=" px-6 md:px-[6rem] py-10 md:py-14 relative main" >
      <div className="text-center mb-16">
        <div className="section-heading">
          <h2 className="text-4xl font-bold text-gray-900"> Hear From Our Valued Clients</h2>
          <p className="text-gray-600 mt-4 text-sm">
            See how our clients benefit from our services through their reviews.
          </p>
        </div>
      </div>
      <div className="relative px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="w-10 h-10 bg-gray-300 rounded-full "></div>
          <div className="w-10 h-10 bg-gray-300 rounded-full "></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((_, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg border shadow-md  flex flex-col items-center"
            >
              <div className="h-24 w-24 bg-gray-300 rounded-full mb-4"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded mb-4"></div>
              <div className="h-3 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSkeleton;
