import Image from 'next/image';
import React from 'react';
import { FaHome, FaHistory } from 'react-icons/fa'; // Import icons
import successImage from "../../../public/assets/Successful purchase-pana.png";
import Link from 'next/link';

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row py-8 main">
      <div className="text-center md:text-left py-8 md:py-12 md:pr-12">
        <h2 className="text-gray-700 text-2xl md:text-4xl font-semibold">
          Successfully Completed Payment
        </h2>
        <p className="text-sm md:text-md text-gray-500 my-4">
          Your booking has been successfully completed.
        </p>

        <div className="flex flex-col sm:flex-row justify-center md:justify-start mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
<Link href="/">  <button
    className="bg-[#4c40ed] text-semibold text-white border border-[#4c40ed] py-3 px-6 rounded-lg flex items-center justify-center hover:scale-105 transition-all duration-300 ease-in-out w-full sm:w-auto text-center"
  >
    <FaHome className="mr-2 text-lg" />
    <span className="inline">Go to Home</span>
  
  </button></Link>
  
 <Link href="/booking"> <button
    className="bg-[#f8fcfd] text-[#4c40ed] text-semibold text-sm border border-[#4c40ed] py-3 px-6 rounded-lg flex items-center justify-center hover:scale-105 transition-all duration-300 ease-in-out w-full sm:w-auto text-center"
  >
    <FaHistory className="mr-2 text-lg" />
    <span className="inline">Booking History</span>
  
  </button></Link>
</div>


      </div>

      <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 mb-6 md:mb-0">
        <Image src={successImage} alt="Success" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default PaymentSuccess;
