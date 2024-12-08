"use client";
import React, { useState } from "react";
import { BsEye, BsTrash } from "react-icons/bs";
import Link from "next/link";
import { usePaymentsQuery } from "@/redux/api/paymentApi";
import ItemsPerPageSelector from "@/components/UI/ItemsPerPageSelector";
import Pagination from "@/components/UI/Pagination";


const Payout: React.FC = () => {
  const { data, isLoading, error } = usePaymentsQuery(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const payments = data?.data || [];
  const totalPages = Math.ceil((payments?.length || 0) / itemsPerPage);

  const paginatedPayments = payments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading payouts</div>;
  }


  return (
    <div className="px-6 py-7">
      <div className="bg-white rounded-md">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-[#2a2a3d]">Payouts</h2>
          <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
        </div>
        {paginatedPayments?.map((payout: any, index: number) => (
          <div
            key={payout.id}
            className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 p-4 bg-gray-100 rounded-md relative w-full my-2"
          >
            <span className="absolute left-0 top-0 bg-green-500 text-white font-bold text-xs h-4 w-4 flex justify-center items-center rounded-tl-md">
              {index + 1}
            </span>
            <div className="flex items-center gap-4 w-full md:w-1/4">
            
            <div className="w-12 h-12 rounded-full overflow-hidden">
  <img
    src={payout.booking.user.profileImg[0]}
    alt="User Avatar"
    className="w-full h-full object-cover"
  />
</div>

              <div className="flex flex-col">
                <Link href={`/user/details/${payout.booking.user.id}`}>
                  <p className="inline-block text-gray-600 capitalize text-sm hover:text-blue-500 font-bold">
                    {`${payout.booking.user.fName} ${payout.booking.user.lName}`}
                  </p>
                </Link>
                <span className="text-xs font-semibold">{payout.booking.user.email}</span>
              </div>
            </div>

            {/* Payout Amount */}
            <div className="flex flex-col w-full md:w-1/5">
              <span className="text-gray-600 capitalize text-sm">Amount</span>
              <span className="text-xs font-semibold">${payout.amount}</span>
            </div>

            {/* Service */}
            <div className="flex flex-col w-full md:w-1/5">
              <span className="text-gray-600 capitalize text-sm">Service</span>
              <span className="text-xs font-semibold">{payout.booking.service.serviceName}</span>
            </div>

            {/* Payout Date */}
            <div className="flex flex-col w-full md:w-1/5">
              <span className="text-gray-600 capitalize text-sm">Date</span>
              <span className="text-xs font-semibold">
                {new Date(payout.createdAt).toLocaleDateString('en-US', {
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
                  payout.status === "Completed" ? "text-green-500" : "text-yellow-500"
                }`}
              >
                {payout.status}
              </span>
            </div>

         
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end mt-10">
    

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
     </div>
    </div>
  );
};

export default Payout;
