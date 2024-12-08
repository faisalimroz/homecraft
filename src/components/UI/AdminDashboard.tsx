"use client";

import BarChart from '@/components/dashboard/Bar-chart';
import PieChart from '@/components/dashboard/Pie-chart';
import { FiBarChart, FiPieChart, FiUsers, FiTool } from 'react-icons/fi';
import React from 'react';
import { GrUserWorker } from 'react-icons/gr';


const AdminDashboard = ({ data }: any) => {
  // console.log(data,'10')
  const totalProvider = data?.totalProviders || 0;
  const totalUsers = data?.totalUsers || 0;
  const totalServices = data?.totalServices || 0;
  const totalRevenue = data?.totalEarnings?.totalPayments || 0;
  const totalEarning = data?.totalEarnings?.amount || 0;
  const lastFivePayments = data?.lastFivePayments || [];

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

        {/* Total Revenue */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total User</h3>
              <p className="text-4xl font-bold text-yellow-600">${totalUsers}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FiUsers className="text-yellow-600 h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Total Providers */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Providers</h3>
              <p className="text-4xl font-bold text-blue-600">{totalProvider}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <GrUserWorker className="text-blue-600 h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Earning</h3>
              <p className="text-4xl font-bold text-red-600">${parseInt(totalEarning)}</p>

            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <FiPieChart className="text-red-600 h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart and Pie Chart */}
      <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart: Revenue by Day */}
        <div className="rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Day (Last 7 Days)</h3>
          <div className="border">
            <BarChart revenueData={data?.formattedRevenueData || []} />
          </div>
        </div>

        {/* Pie Chart: Services by Category */}
        <div className="rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Services by Category</h3>
          <div className="border">
            <PieChart categoryData={data?.formattedCategoryServiceCounts || []} />
          </div>
        </div>
      </div>

      {/* Latest Payments */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Payments</h3>
        <div className="">
          {lastFivePayments?.map((payout: any, index: number) => (
            <div
              key={payout?.id}
              className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 p-4 bg-gray-100 rounded-md relative w-full my-2"
            >
              <span className="absolute left-0 top-0 bg-green-500 text-white font-bold text-xs h-4 w-4 flex justify-center items-center rounded-tl-md">
                {index + 1}
              </span>
              <div className="flex items-center gap-4 w-full md:w-1/4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={payout?.booking?.user?.profileImg?.[0] || '/placeholder.png'}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
            

                <div className="flex flex-col">
                  <p className="inline-block text-gray-600 capitalize text-sm hover:text-blue-500 font-bold">
                    {`${payout?.booking?.user?.fName || ''} ${payout?.booking?.user?.lName || ''}`}
                  </p>
                  <span className="text-xs font-semibold">{payout?.booking?.user?.email || ''}</span>
                </div>
              </div>

              {/* Payout Amount */}
              <div className="flex flex-col w-full md:w-1/5">
                <span className="text-gray-600 capitalize text-sm">Amount</span>
                <span className="text-xs font-semibold">${payout?.amount || 0}</span>
              </div>

              {/* Service */}
              <div className="flex flex-col w-full md:w-1/5">
                <span className="text-gray-600 capitalize text-sm">Service</span>
                <span className="text-xs font-semibold">{payout?.booking?.service?.serviceName || 'N/A'}</span>
              </div>

              {/* Payout Date */}
              <div className="flex flex-col w-full md:w-1/5">
                <span className="text-gray-600 capitalize text-sm">Date</span>
                <span className="text-xs font-semibold">
                  {new Date(payout?.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {/* Payout Status */}
              <div className="flex flex-col w-full md:w-1/5">
                <span className="text-gray-600 capitalize text-sm">Status</span>
                <span
                  className={`text-xs font-semibold ${
                    payout?.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'
                  }`}
                >
                  {payout?.status || 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
