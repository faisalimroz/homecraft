"use client";

import BarChart from '@/components/dashboard/Bar-chart';
import PieChart from '@/components/dashboard/Pie-chart';
import { useOverviewQuery } from '@/redux/api/servicesApi';
import { FiBarChart, FiPieChart, FiUsers, FiShoppingCart, FiActivity, FiTool } from 'react-icons/fi';
import React from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ProviderDashboard = ({ data }: any) => {
  const totalBookings = data?.totalBookings || 0;
  const totalServices = data?.totalServices || 0;
  const totalEarning = data?.totalEarnings?.amount || 0;
  const totalPayments = data?.totalEarnings?.totalPayments || 0;
  const lastFivePayments = data?.lastFivePayments || [];
  const lastFiveBookings = data?.lastFiveBookings || [];

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-200 text-green-800";
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="px-4 py-8 overflow-x-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Services */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Services</h3>
              <p className="text-4xl font-bold text-green-600">{totalServices}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FiTool className="text-green-600 h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Bookings</h3>
              <p className="text-4xl font-bold text-blue-600">{totalBookings}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FiUsers className="text-blue-600 h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Total Earning */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Earnings</h3>
              <p className="text-4xl font-bold text-red-600">${totalEarning}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <FiPieChart className="text-red-600 h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Total Payments */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Payments</h3>
              <p className="text-4xl font-bold text-yellow-600">${totalPayments}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FiPieChart className="text-yellow-600 h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Day (Last 7 Days)</h3>
          <div className="border">
            <BarChart revenueData={data?.formattedRevenueData || []} />
          </div>
        </div>
          <div >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Payments</h3>
        <div>
          {lastFivePayments?.map((payment: any, index: number) => (
            <div
              key={payment?.id}
              className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 p-4 bg-gray-100 rounded-md relative w-full my-2"
            >
              <span className="absolute left-0 top-0 bg-green-500 text-white font-bold text-xs h-4 w-4 flex justify-center items-center rounded-tl-md">
                {index + 1}
              </span>
              <div className="flex items-center gap-4 w-full ">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
  src={payment?.booking?.user?.profileImg?.[0] || 'fallback-image-url.jpg'}
  alt="User Avatar"
  className="w-full h-full object-cover"
/>
                </div>
                
            
                <div className="flex flex-col">
                 
                    <p className="inline-block text-gray-600 capitalize text-sm hover:text-blue-500 font-bold">
                      {`${payment?.booking?.user?.fName} ${payment?.booking?.user?.lName}`}
                    </p>
               
                  <span className="text-xs font-semibold">{payment?.booking?.user?.email}</span>
                </div>
              </div>

              {/* Payment Amount */}
              <div className="flex flex-col w-full ">
                <span className="text-gray-600 capitalize text-sm">Amount</span>
                <span className="text-xs font-semibold">${payment?.amount}</span>
              </div>

              {/* Service */}
              <div className="flex flex-col w-full">
                <span className="text-gray-600 capitalize text-sm">Service</span>
                <span className="text-xs font-semibold">{payment?.booking?.service?.serviceName}</span>
              </div>

              {/* Payment Date */}
              <div className="flex flex-col w-full">
                <span className="text-gray-600 capitalize text-sm">Date</span>
                <span className="text-xs font-semibold">
                  {new Date(payment?.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              </div>

          
            </div>
          ))}
        </div>
      </div>
      </div>

    
      {/* Latest Bookings */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Bookings</h3>
        <div>
          {lastFiveBookings?.map((booking: any) => (
            <div
              key={booking?.id}
              className="bg-white rounded-2xl border p-6 flex flex-col md:flex-row items-center md:items-start w-full mb-6"
            >
              <div className="flex-shrink-0 w-full md:w-1/3 mb-6 md:mb-0 md:mr-8">
                <img
                  src={booking?.service?.serviceImg?.[booking?.service?.serviceImg?.length - 1]}
                  alt={booking?.service?.serviceName}
                  className="w-full h-48 md:h-auto rounded-2xl object-cover"
                />
              </div>
              <div className="flex-grow w-full md:w-2/3">
                <div className="flex flex-row justify-between items-center mb-4">
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold text-gray-800 md:mb-0 md:mr-2">
                      {booking?.service?.serviceName}
                    </h3>
                    <span
                      className={`ml-2 px-3 py-1 ${
                        booking?.isPaid === "Paid"
                          ? "bg-[#f3fff6] text-[#83cc76]"
                          : booking?.isPaid === "Unpaid"
                          ? "bg-[#fffdef] text-[#ffe30f]"
                          : "bg-[#fff5f5] text-[#f92424]"
                      } text-[12px]`}
                    >
                      {booking?.isPaid}
                    </span>
                  </div>
              
                </div>

                <div className="flex flex-col md:flex-row justify-between">
                  <div className="md:w-1/2">
                    <div className="text-gray-700 mb-2">
                      <span className="font-semibold mr-2">Booking Date:</span>
                      <span className="text-sm text-gray-500">
                        {new Date(booking?.bookingDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="text-gray-700 mb-2">
                      <span className="font-semibold mr-2">Amount:</span>
                      <span className="text-sm text-gray-500">
                        {booking?.service?.offeredPrice ? `$${booking?.service?.offeredPrice}` : `$${booking?.service?.regularPrice}`}
                      </span>
                    </div>
                    <div className="text-gray-700 mb-2 flex">
                      <span className="font-semibold mr-2">Location:</span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <FaMapMarkerAlt className="mr-1" />
                        {booking?.service?.location}
                      </span>
                    </div>
                    <div className="text-gray-700 mb-2">
                      <span className="font-semibold mr-2">Slot Time:</span>
                      <span className="text-sm text-gray-500">
                        {booking?.Time}
                      </span>
                    </div>
                    <div className="text-gray-700 mb-2">
                      <span className="font-semibold mr-2">Booking Status:</span>
                      <span
                        className={`text-sm font-semibold rounded-lg px-2 py-1 ${getStatusColor(booking?.status)}`}
                      >
                        {booking?.status}
                      </span>
                    </div>
                    {booking?.status === "Confirmed" && (
                      <div className="text-gray-700 mb-2">
                        <span className="font-semibold mr-2">Work Status:</span>
                        <span
                          className={`text-sm font-semibold rounded-lg px-2 py-1 ${getStatusColor(booking?.workStatus)}`}
                        >
                          {booking?.workStatus}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-start  md:mt-0 md:ml-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Customer</h2>
                    <div className="flex items-center">
                      <img
                        src={booking?.user?.profileImg?.[0]}
                        alt={booking?.user?.fName}
                        className="w-16 h-16 rounded-full object-cover mr-6"
                      />
                      <div>
                        <p className="text-md font-semibold text-gray-800">
                          {`${booking?.user?.fName} ${booking?.user?.lName}`}
                        </p>
                        <p className="text-gray-500">{booking?.user?.email}</p>
                        <p className="text-gray-500">{booking?.user?.contactNo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
