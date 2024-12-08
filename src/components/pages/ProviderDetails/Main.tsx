"use client";
import BreadcrumbBar from "@/components/UI/BreadcrumbBar";
import { useProviderByIdQuery } from "@/redux/api/providerApi";
import React from "react";
import { FaStar } from "react-icons/fa6";
import {
  FiCalendar,
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import ProviderServices from "./ProviderServices/ProviderServices";
import ProviderReview from "./ProviderReview/ProviderReview";
import Loader from "@/components/UI/Loader";
import ProviderReviewCard from "./ProviderReviewCard/ProviderReviewCard";
import Rating from "@/components/UI/Rating";

const ProviderDetails = ({ id }: any) => {
  const { data, isLoading } = useProviderByIdQuery(id);
  const provider = data?.data;

 
  if (isLoading) {
    return <Loader />;
  }

  if (!provider) {
    return <div className="text-center py-10">Provider data not found.</div>;
  }

  const {
    profileImg,
    fName,
    bio,
    dob,
    gender,
    category,
    lName,
    address,
    createdAt,
    email,
    contactNo,
    services,
    averageRating,
    totalReviews,
  } = provider;

  // console.log(services, "49");

  return (
    <>
      <BreadcrumbBar header="Provider" name="" subtitle="" />
      <div className="mx-auto px-6 md:px-[6rem] py-8">
        <div className="flex flex-wrap lg:flex-nowrap rounded-lg">
          <div className="lg:w-1/3 w-full mb-8 lg:mb-0">
            <div className="relative rounded-lg shadow-lg">
            <div className="absolute top-2 left-2 bg-white hover:text-white text-[#665cf0] hover:bg-[#665cf0] text-sm px-3 py-1 rounded">

</div>
              <img
                src={profileImg[0]}
                alt={`${fName} ${lName}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="lg:w-2/3 w-full lg:pl-8">
            <div>
              <div className="flex items-center justify-start mb-6">
                <h5 className="text-3xl font-bold text-gray-900">
                  {fName} {lName}
                </h5>

                <div className="flex items-center text-md px-4">
                  <Rating rating={averageRating || 0} />
                  <span className="ml-1 text-gray-800">{averageRating}</span>
                  <span className="text-gray-500 ml-2">
                    ({totalReviews} reviews)
                  </span>
                </div>
              </div>
              <p className="font-medium mb-2">{bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center py-4 pr-4 rounded-lg">
                  <span className="text-xl text-pink-500 block p-4 rounded-full bg-[#f8fcfd]">
                    <FiUser />
                  </span>
                  <div className="ml-4">
                    <h6 className="text-lg font-semibold text-gray-700 mb-1">
                      Gender
                    </h6>
                    <p className="text-md text-gray-600 font-normal">
                      {gender}
                    </p>
                  </div>
                </div>

                <div className="flex items-center py-4 pr-4 rounded-lg">
                  <span className="text-xl text-yellow-500 block p-4 rounded-full bg-[#f8fcfd]">
                    <FiCalendar />
                  </span>
                  <div className="ml-4">
                    <h6 className="text-lg font-semibold text-gray-700 mb-1">
                      Date of Birth
                    </h6>
                    <p className="text-md text-gray-600 font-normal">
                      {`${new Date(dob)
                        .toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                        .replace(/(\d{1,2} \w+)\s(\d{4})/, "$1, $2")}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center py-4 pr-4 rounded-lg">
                  <span className="text-xl text-blue-500 block p-4 rounded-full bg-[#f8fcfd]">
                    <FiMail />
                  </span>
                  <div className="ml-4">
                    <h6 className="text-lg font-semibold text-gray-700 mb-1">
                      Email
                    </h6>
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
                    <h6 className="text-lg font-semibold text-gray-700 mb-1">
                      Phone
                    </h6>
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

            
                <div className="flex items-center p-4 rounded-lg">
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
          </div>
        </div>
        </div>
        <ProviderServices
        providerId={id}
        
        />
        <div className="mx-auto px-6 md:px-[6rem] py-8">
        <ProviderReview providerId={id} />
        <ProviderReviewCard providerId={id} />
        </div>
       
   
    </>
  );
};

export default ProviderDetails;
