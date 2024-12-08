import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FiClock, FiMail, FiMapPin, FiPhone, FiUser } from 'react-icons/fi';
import 'react-calendar/dist/Calendar.css';
import Appointment from '../UI/Appointment';
import { usePathname } from 'next/navigation';
import { useServiceQuery } from '@/redux/api/servicesApi';
import Loader from '../UI/Loader';
import { IoPricetagOutline } from 'react-icons/io5';

const BookingPage = () => {
  const pathname = usePathname();
  const id = pathname?.split('/')[1]; // Extract service ID from the path

  const { data, isLoading } = useServiceQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  if (!data || !data.success) {
    return <div>Service not found!</div>;
  }

  const service = data?.data;
  const provider = service?.provider;

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Service Information */}
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0">
            <img
              src={service?.serviceImg?.[0] || '/placeholder-image.jpg'}
              className="img-fluid w-full md:w-36 h-auto md:h-36 rounded-md"
              alt="Service Image"
            />
          </div>
          <div className="ml-0 md:ml-3 mt-4 md:mt-0">
            <p className="bg-[#f8fcfd] text-blue-600 py-2 px-3 text-sm inline-block">
              {service?.category?.categoryName || 'Category'}
            </p>
            <h6 className="text-xl font-semibold my-2">
              {service?.serviceName || 'Service Name'}
            </h6>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  src={provider?.profileImg?.[0] || '/placeholder-avatar.jpg'}
                  className="img-fluid rounded-full w-12 h-12"
                  alt="Provider"
                />
              </div>
              <div className="ml-3">
                <h6 className="text-md font-semibold mb-2">
                  {provider?.fName} {provider?.lName}
                </h6>
                <div className="text-yellow-500 text-sm">
                  <FaStar className="inline" />
                  <span className="text-gray-700">
                    {provider?.averageRating?.toFixed(1) || '0.0'}
                  </span>
                  <span className="text-gray-500">
                    ({provider?.totalReviews || 0} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" md:px-10">
        
          <div className="flex items-center pb-4 pr-4 rounded-lg">
          <span className="text-xl text-purple-500 block p-4 rounded-full bg-[#f8fcfd]">
            <IoPricetagOutline />
          </span>
          <div className="ml-4">
            <h6 className="text-lg font-semibold text-gray-700 mb-1">
            Service Amount
            </h6>
            <p className="text-md text-gray-600 font-normal">
            {service?.offeredPrice
                  ? `$${service?.offeredPrice?.toFixed(2)}`
                  : `$${service?.regularPrice?.toFixed(2)}`}
            </p>
          </div>
        </div>


          <div className="flex items-center pb-4 pr-4 rounded-lg mt-4">
          <span className="text-xl text-red-500 block p-4 rounded-full bg-[#f8fcfd]">
            <FiPhone />
          </span>
          <div className="ml-4">
            <h6 className="text-lg font-semibold text-gray-700 mb-1">Phone</h6>
            <p className="text-md text-gray-600 font-normal">
              {provider?.contactNo || "N/A"}
            </p>
          </div>
        </div>
        </div>

        <div className=" md:px-10">
       
        <div className="flex items-center pb-4 pr-4 rounded-lg">
          <span className="text-xl text-green-500 block p-4 rounded-full bg-[#f8fcfd]">
            <FiMapPin />
          </span>
          <div className="ml-4">
            <h6 className="text-lg font-semibold text-gray-700 mb-1">
              Address
            </h6>
            <p className="text-md text-gray-600 font-normal">
              {provider?.address || "N/A"}
            </p>
          </div>
        </div>
          <div className="flex items-center py-4 pr-4 rounded-lg">
          <span className="text-xl text-blue-500 block p-4 rounded-full bg-[#f8fcfd]">
            <FiMail />
          </span>
          <div className="ml-4">
            <h6 className="text-lg font-semibold text-gray-700 mb-1">Email</h6>
            <p className="text-md text-gray-600 font-normal">
              {provider?.email || "N/A"}
            </p>
          </div>
        </div>

        </div>
      </div>
      <Appointment  providerId ={provider?.id} />
    </div>
  );
};

export default BookingPage;
