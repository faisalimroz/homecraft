import ItemsPerPageSelector from "@/components/UI/ItemsPerPageSelector";
import Loader from "@/components/UI/Loader";
import Pagination from "@/components/UI/Pagination";
import { useComboBookingsForProviderQuery, useUpdateComboBookingMutation } from "@/redux/api/comboBooking";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const ComboBooking = () => {
  const [updateComboBooking] = useUpdateComboBookingMutation();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError } = useComboBookingsForProviderQuery(undefined);
  const [errors, setErrors] = useState<any>({});
  const [selectedBookingStatus, setSelectedBookingStatus] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);



  const comboBookings = data?.data;

  const openModal = (booking: any) => {
    setSelectedBooking(booking); // Set the selected booking when opening the modal
    setSelectedBookingStatus(booking?.status); // Set the current status of the booking
    setIsModalOpen(true);
  };

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

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
    setSelectedBooking(null); // Reset selected booking when closing modal
    setSelectedBookingStatus(""); // Reset status
  };

  const handleBookingStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBookingStatus(e.target.value);
    setErrors((prevErrors: any) => ({ ...prevErrors, bookingStatus: "" }));
  };

  const handleSave = async () => {
    // Validation logic
    if (!selectedBookingStatus) {
      setErrors((prevErrors: any) => ({ ...prevErrors, bookingStatus: "Please select a booking status." }));
      return;
    }

    if (selectedBooking) {
      try {
       
        await updateComboBooking({
          id: selectedBooking.bookingId, 
          body: {
            status: selectedBookingStatus,
          },
        }).unwrap();

        closeModal();
      } catch (error) {
        console.error("Failed to update booking", error);
     
      }
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
    <div className="bg-white p-6 rounded-lg ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Combo Booking List</h2>
      {paginatedBookings?.length === 0 ? (
        <p className="text-gray-600">No combo bookings available.</p>
      ) : (
        paginatedBookings?.map((booking: any) => (
          <div
            key={booking.bookingId}
            className="relative bg-white rounded-lg border p-6 mb-6 flex flex-col md:flex-row items-start md:items-center"
          >
           
            <button
              className="absolute top-4 right-4 text-indigo-600 hover:text-indigo-700 transform hover:scale-110 flex items-center justify-center text-md"
              onClick={() => openModal(booking)} 
            >
              <FaEdit />
            </button>

          
            <div className="flex-grow md:flex md:items-center">
            
              {booking.comboPack?.providerImage?.length > 0 && (
                <img
                  src={booking.comboPack.providerImage[0]} 
                  alt={`${booking.comboPack.providerName}'s Profile`}
                  className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6"
                />
              )}

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
               
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Plan:</span> {booking.comboPack.plan}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Provider:</span> {booking.comboPack.providerName}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Category:</span> {booking.comboPack.providerCategory}
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

            {/* Customer Details Section */}
            <div className="flex flex-col items-start mt-4 md:mt-0 md:ml-8">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Customer</h2>
              <div className="flex items-center">
                <img
                  src={booking?.user?.profileImg[0]}
                  alt={booking?.user?.name}
                  className="w-16 h-16 rounded-full object-cover mr-6"
                />
                <div>
                  <p className="text-md font-semibold text-gray-800">{booking?.user?.name}</p>
                  <p className="text-gray-500">{booking?.user?.email}</p>
                  <p className="text-gray-500">{booking?.user?.contactNo}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

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
                  <option value="Rejected">Canceled</option>
                </select>
                {errors.bookingStatus && (
                  <p className="text-red-500 text-sm mt-2">{errors.bookingStatus}</p>
                )}
              </div>
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

export default ComboBooking;
