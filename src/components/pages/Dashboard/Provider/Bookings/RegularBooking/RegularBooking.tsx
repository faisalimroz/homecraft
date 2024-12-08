"use client";
import ItemsPerPageSelector from "@/components/UI/ItemsPerPageSelector";
import Loader from "@/components/UI/Loader";
import Pagination from "@/components/UI/Pagination";
import { useBookingsQuery, useUpdateBookingMutation } from "@/redux/api/bookingApi";
import React, { useState } from "react";
import { FaEdit, FaMapMarkerAlt } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const RegularBooking = () => {
  const [updateBooking] = useUpdateBookingMutation();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedBookingStatus, setSelectedBookingStatus] = useState("");
  const [selectedWorkStatus, setSelectedWorkStatus] = useState("In Progress");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useBookingsQuery(undefined);

  const bookings = data?.data;

  const handleBookingStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBookingStatus(e.target.value);
    // Automatically reset work status if booking is not confirmed
    if (e.target.value !== "Confirmed") {
      setSelectedWorkStatus("");
    } else {
      setSelectedWorkStatus("In Progress");
    }
    // Clear the booking status error when a valid selection is made
    setErrors((prevErrors: any) => ({ ...prevErrors, bookingStatus: "" }));
  };

  const handleWorkStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorkStatus(e.target.value);
  };

  const openModal = (booking: any) => {
    setSelectedBooking(booking);
    setSelectedBookingStatus(booking.status || "");
    setSelectedWorkStatus(booking.workStatus || "In Progress");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
  };

  const handleSave = async () => {
    // Validation logic
    if (!selectedBookingStatus) {
      setErrors((prevErrors: any) => ({ ...prevErrors, bookingStatus: "Please select a booking status." }));
      return;
    }

    if (selectedBookingStatus === "Confirmed" && !selectedWorkStatus) {
      setErrors((prevErrors: any) => ({ ...prevErrors, workStatus: "Please select a work status." }));
      return;
    }

    if (selectedBooking) {
      try {
        await updateBooking({
          id: selectedBooking.id,
          body: {
            status: selectedBookingStatus,
            workStatus: selectedWorkStatus,
          },
        }).unwrap();

        closeModal();
      } catch (error) {
        console.error("Failed to update booking", error);
      }
    }
  };

  if (isLoading) return <Loader/>;
  if (isError) return <p>Error loading bookings.</p>;

  // Helper function to get color class based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Confirmed":
        return "bg-green-100 text-green-600";
      case "Canceled":
        return "bg-red-100 text-red-600";
      case "In Progress":
        return "bg-blue-100 text-blue-600";
      case "Completed":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const totalPages = Math.ceil((bookings?.length || 0) / itemsPerPage);
  const paginatedBookings = bookings?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      {paginatedBookings?.map((booking: any) => (
        <div
          key={booking.id}
          className="bg-white rounded-2xl border p-6 flex flex-col md:flex-row items-center md:items-start w-full mb-6"
        >
          <div className="flex-shrink-0 w-full md:w-1/3 mb-6 md:mb-0 md:mr-8">
            <img
              src={booking?.service.serviceImg[booking?.service?.serviceImg?.length - 1]}
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
                  {booking.isPaid}
                </span>
              </div>
              <p
                className="text-indigo-600 hover:text-indigo-700 transform hover:scale-110 flex items-center justify-center text-md cursor-pointer"
                onClick={() => openModal(booking)}
              >
                <FaEdit />
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between">
              <div className="md:w-1/2">
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold mr-2">Booking Date:</span>
                  <span className="text-sm text-gray-500">
                    {new Date(booking?.bookingDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
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

              <div className="flex flex-col items-start mt-4 md:mt-0 md:ml-8">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Customer</h2>
                <div className="flex items-center">
                  <img
                    src={booking?.user?.profileImg[0]}
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

{isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-4 md:mx-0">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">Edit Booking</h2>
              <button
                onClick={closeModal}
                className="bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white rounded-full p-2 hover:bg-opacity-90 transition"
              >
                <FiX size={18} />
              </button>
            </div>
            <div className="">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking Status
                </label>
                <select
                  value={selectedBookingStatus}
                  onChange={handleBookingStatusChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-gray-200"
                >
                  <option value="">Select Status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Canceled">Canceled</option>
                </select>
                {errors.bookingStatus && (
                  <p className="text-red-500 text-sm mt-2">{errors.bookingStatus}</p>
                )}
              </div>
              {selectedBookingStatus === "Confirmed" && (
                <div className="w-full mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Status
                  </label>
                  <select
  value={selectedWorkStatus}
  onChange={handleWorkStatusChange}
  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-gray-200"
>
  <option value="InProgress">In Progress</option>
  <option value="Completed">Completed</option>
  <option value="Canceled">Canceled</option>
</select>
                  {errors.workStatus && (
                    <p className="text-red-500 text-sm mt-2">{errors.workStatus}</p>
                  )}
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {paginatedBookings.length > 0 && (
        <div className="flex items-center justify-end mt-10">
          <ItemsPerPageSelector
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default RegularBooking;
