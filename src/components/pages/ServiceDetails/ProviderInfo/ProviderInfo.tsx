import React from "react";
import {
  FiUser,
  FiMapPin,
  FiMail,
  FiPhone,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiLinkedin,
  FiClock,
  FiCalendar,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";

// Define the types for the provider data
interface ProviderInfoProps {
  provider: {
    fName: string;
    lName: string;
    email: string;
    contactNo: string;
    address: string;
    profileImg: string[];
    averageRating: number;
    totalReviews: number;
    createdAt: string;
  };
}

const ProviderInfo: React.FC<ProviderInfoProps> = ({ provider }) => {
  // const providerName = `${provider?.fName} ${provider?.lName}`;
  const {
    fName,
    lName,
    address,
    createdAt,
    email,
    contactNo,
    averageRating,
    totalReviews,
  } = provider;

  return (
    <div className="py-6">
      <h5 className="text-2xl font-semibold mb-4">Service Provider</h5>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div className="flex items-center py-4 pr-4 rounded-lg">
          <div>
            <img
              src={provider?.profileImg[0]}
              className="img-fluid rounded-full w-16 h-16"
              alt="Provider"
            />
          </div>
          <div className="ml-3">
            <h6 className="text-lg font-semibold text-gray-700 mb-1">Rating</h6>
            <div className="text-yellow-500 text-sm">
              <FaStar className="inline " />{" "}
              <span className="text-gray-700 text-md font-normal">
                {averageRating || 0}
              </span>{" "}
              <span className="text-gray-500 text-md font-normal">
                ({totalReviews || 0} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center py-4 pr-4 rounded-lg">
          <span className="text-xl text-pink-500 block p-4 rounded-full bg-[#f8fcfd]">
            <FiUser />
          </span>
          <div className="ml-4">
            <h6 className="text-lg font-semibold text-gray-700 mb-1">
              Provider
            </h6>
            <p className="text-md text-gray-600 font-normal">
              {fName} {lName}
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
              {email || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center py-4 pr-4 rounded-lg mt-4">
          <span className="text-xl text-red-500 block p-4 rounded-full bg-[#f8fcfd]">
            <FiPhone />
          </span>
          <div className="ml-4">
            <h6 className="text-lg font-semibold text-gray-700 mb-1">Phone</h6>
            <p className="text-md text-gray-600 font-normal">
              {contactNo || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center py-4 pr-4 rounded-lg">
          <span className="text-xl text-green-500 block p-4 rounded-full bg-[#f8fcfd]">
            <FiMapPin />
          </span>
          <div className="ml-4">
            <h6 className="text-lg font-semibold text-gray-700 mb-1">
              Address
            </h6>
            <p className="text-md text-gray-600 font-normal">
              {address || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center py-4 pr-4 rounded-lg">
          <span className="text-xl text-purple-500 block p-4 rounded-full bg-[#f8fcfd]">
            <FiClock />
          </span>
          <div className="ml-4">
            <h6 className="text-lg font-semibold text-gray-700 mb-1">
              Date of Join
            </h6>
            <p className="text-md text-gray-600 font-normal">
              {`${new Date(createdAt)
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
                .replace(/(\d{1,2} \w+)\s(\d{4})/, "$1, $2")}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderInfo;
