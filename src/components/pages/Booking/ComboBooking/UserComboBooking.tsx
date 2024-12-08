import ItemsPerPageSelector from "@/components/UI/ItemsPerPageSelector";
import Loader from "@/components/UI/Loader";
import Pagination from "@/components/UI/Pagination";
import { useComboBookingsForProviderQuery, useComboBookingsQuery, useUpdateComboBookingMutation } from "@/redux/api/comboBooking";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiArrowLeftCircle, FiHome, FiX } from "react-icons/fi";

const UserComboBooking = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useComboBookingsQuery(undefined);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);



  const comboBookings = data?.data;

 
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Confirmed":
        return "bg-green-100 text-green-600";
      case "Rejected":
        return "bg-red-100 text-red-600";
      case "In Progress":
        return "bg-blue-100 text-blue-600";
      case "Completed":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

 

  
  const totalPages = Math.ceil((comboBookings?.length || 0) / itemsPerPage);
  const paginatedBookings = comboBookings?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  if (isLoading) return <Loader/>;
  if (isError) return <p>Error loading combo bookings.</p>;
  return (
    <div className="mt-[-2rem]">
       <div className="flex justify-end">
      <div className="flex space-x-4 py-2">
        <Link href="/">
          <button className="text-gray-500 hover:text-blue-500">
            <FiHome className="h-6 w-6" />
          </button>
        </Link>
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-blue-500"
        >
          <FiArrowLeftCircle className="h-6 w-6" />
        </button>
      </div>
        
      </div>
      {paginatedBookings?.length === 0 ? (
        <p className="text-gray-600">No combo bookings available.</p>
      ) : (
        paginatedBookings?.map((booking: any) => (
          <div
            key={booking.bookingId}
            className="relative bg-white rounded-lg border p-6 mb-6 flex flex-col md:flex-row items-start md:items-center"
          >
         
          

            {/* Booking Details Section */}
            <div className="flex-grow md:flex md:items-center">
             

              <div className="flex-grow">
                <div className="mb-4">
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold text-gray-800 md:mb-0 md:mr-2">
                      {booking?.comboPack.comboName}
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
                      {booking.isPaid}
                    </span>
                  </div>
                </div>
                {/* Display booking details */}
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Plan:</span> {booking.comboPack.plan}
                </p>
              
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold mr-2">Booking Status:</span>
                  <span
                    className={`text-sm font-semibold rounded-lg px-2 py-1 ${getStatusColor(booking?.status)}`}
                  >
                    {booking?.status}
                  </span>
                </div>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Amount:</span> ${booking.comboPack.discountAmount}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Services:</span> {booking.comboPack.services.join(", ")}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Booking Date:</span>{" "}
                  {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

           
          
            <div className="flex flex-col items-start mt-4 md:mt-0 md:ml-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Service Provider</h2>
                    <div className="flex items-center">
                      <img
                        src={booking.comboPack.providerImage[0]}
                        alt={booking.comboPack.providerName}
                        className="w-16 h-16 rounded-full object-cover mr-6"
                      />
                      <div>
                        <p className="text-md font-semibold text-gray-800">
                          {`${booking.comboPack.providerName}`}
                        </p>
                        <p className="text-gray-800">{booking.comboPack.providerCategory}</p>
                        <p className="text-gray-500">{booking.comboPack.providerEmail}</p>
                      </div>
                    </div>
                  </div>
          </div>
        ))
      )}

    
{paginatedBookings.length > 0 && <div className="flex items-center justify-end mt-10">
     <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
     </div>}

    </div>
  );
};

export default UserComboBooking;
