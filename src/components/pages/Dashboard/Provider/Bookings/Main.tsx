"use client";
import React, { useState } from "react";
import ComboBooking from "./ComboBooking/ComboBooking";
import RegularBooking from "./RegularBooking/RegularBooking";

const Main = () => {

  const [activeTab, setActiveTab] = useState("Active");

 
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-white py-7">
      <h2 className="text-2xl font-semibold text-[#2a2a3d] mb-6">Booking List</h2>
      <div className="mb-6">
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
        </div>
      <div>
      {activeTab === "Active" ? <><RegularBooking/></> : <><ComboBooking/></>}
        
      </div>
    


    </div>
  );
};

export default Main;