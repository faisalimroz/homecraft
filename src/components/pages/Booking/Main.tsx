
"use client"
import React, { useState } from 'react';
import UserBooking from './UserBooking/UserBooking';
import UserComboBooking from './ComboBooking/UserComboBooking';

const Main = () => {
  const [activeTab, setActiveTab] = useState("Active");
  return (
    <>
     <div className="mx-auto px-6 md:px-[6rem] py-10">
     <h2 className="text-3xl font-semibold text-gray-900 mb-10">Booking Listing</h2>
          <button
            onClick={() => setActiveTab("Active")}
            className={`px-4 py-2 ${
              activeTab === "Active"
                ? "bg-[#4f46e5] text-white"
                : "bg-white text-blue-600"
            } border rounded-l-md`}
          >
           Regular Booking
          </button>
          <button
            onClick={() => setActiveTab("Inactive")}
            className={`px-4 py-2 ml-2 ${
              activeTab === "Inactive"
                ? "bg-[#4f46e5] text-white"
                : "bg-white text-blue-600"
            } border rounded-r-md`}
          >
            Combo Booking
          </button>
        {activeTab === "Active" ? <UserBooking/> : <UserComboBooking/>}
        </div>
    
     
    </>
  );
};

export default Main;