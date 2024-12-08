import React from 'react';
import { FiCheck } from 'react-icons/fi';
import Link from 'next/link';

const PricingPlan = () => {
  return (
    <div className="mx-auto px-6 md:px-[4rem] py-10 md:py-14 bg-[#f8fcfd] main">
      <div className="text-center ">
        <div className="section-heading section-heading-seven" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">Pricing Plan</h2>
          <p className="text-gray-400 mt-4"> Choose the best plan that fits your needs and budget. Get more value with our flexible pricing options</p>
        </div>
      </div>
   
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20" data-aos="fade-up">
       
            <div className="bg-white w-auto py-8 px-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-center mb-6">
           
          </div>
          <div className=" text-center mb-6">
            <h5 className="text-4xl font-bold text-indigo-600">Basic</h5>
          
          </div>
          <div className=" mb-6">
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <FiCheck className="mr-3 text-indigo-600" />
                3 Essential Services Included
              </li>
              <li className="flex items-center text-gray-700">
                <FiCheck className="mr-3 text-indigo-600" />
                Affordable & Cost-Effective
              </li>
              <li className="flex items-center text-gray-700">
                <FiCheck className="mr-3 text-indigo-600" />
                Available on weekends and evenings with prior scheduling.
              </li>
              <li className="flex items-center text-gray-700">
                <FiCheck className="mr-3 text-indigo-600" />
                Individuals, small families, and those needing basic upkeep
              </li>
              <li className="flex items-center text-gray-700">
                <FiCheck className="mr-3 text-indigo-600" />
                6 month Validity with Service Rollovers
              </li>
             
            </ul>
          </div>
          <div className="text-center">
           <Link href="/combo-pack/basic">
           <button  className="bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white border border-indigo-600 font-semibold px-6 py-3 rounded-md shadow hover:shadow-lg transition-shadow duration-300">
              Choose Plan
            </button>
           </Link>
          </div>
        </div>
       
        <div className="   bg-indigo-600 text-white py-8 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 relative transform lg:scale-105 lg:translate-y-[-10px]">
          <div className="price-block absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl-lg">
            <span className="text-sm font-bold">MOST POPULAR</span>
          </div>
          <div className="flex justify-center mb-6">
           
          </div>
          <div className="text-center mb-6">
            <h5 className="text-4xl font-bold">Standard</h5>
          
          </div>
          <div className=" mb-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <FiCheck className="mr-3" />
                5 Comprehensive Services Included
              </li>
              <li className="flex items-center">
                <FiCheck className="mr-3" />
                Best Balance of Value and Coverage
              </li>
              <li className="flex items-center">
                <FiCheck className="mr-3" />
                Medium-sized homes, rental properties, or customers looking for regular maintenance.
              </li>
              <li className="flex items-center">
                <FiCheck className="mr-3" />
                Available 5 days a week, with priority scheduling options for regular customers.
              </li>
              <li className="flex items-center">
                <FiCheck className="mr-3" />
                1 Years Service Validity
              </li>
            </ul>
          </div>
          <div className="text-center">
          <Link href="/combo-pack/standard">
          <button  className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-md shadow hover:shadow-lg transition-shadow duration-300">
              Choose Plan
            </button>
          </Link>
           
          </div>
        </div>
  
        <div className="bg-white py-8 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="flex justify-center mb-6">
          
          </div>
          <div className=" text-center mb-6">
            <h5 className="text-4xl font-bold text-indigo-600">Premium</h5>
           
          </div>
          <div className=" mb-6">
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <FiCheck className="mr-3 text-indigo-600" />
                7 All-Inclusive Services Included
              </li>
              <li className="flex items-center text-gray-700">
                <FiCheck className="mr-3 text-indigo-600" />
                Ultimate Plan with Maximum Benefits
              </li>
              <li className="flex items-center text-gray-700">
                <FiCheck className="mr-3 text-indigo-600" />
                Large families, estates, or individuals seeking comprehensive property management
              </li>
              <li className="flex items-center text-gray-700">
                <FiCheck className="mr-3 text-indigo-600" />
                Available 24/7 with emergency support and priority scheduling for all requests
              </li>
              <li className="flex items-center text-gray-700">
                <FiCheck className="mr-3 text-indigo-600" />
                2 Years Service Validity
              </li>
            </ul>
          </div>
          <div className="text-center">
          <Link href="/combo-pack/premium"> 
           <button  className="bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white border border-indigo-600 font-semibold px-6 py-3 rounded-md shadow hover:shadow-lg transition-shadow duration-300">
              Choose Plan
            </button>
            </Link>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
