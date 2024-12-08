import React, { useCallback, useState } from "react";
import Shipping from "../UI/Shipping";
import { useInitialPaymentMutation } from "@/redux/api/paymentApi";
import { useRouter } from "next/navigation";

const CheckoutPage = ({ data }: any) => {
  const {push} = useRouter();
  const [shippingData, setShippingData] = useState({
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const [initialPayment] = useInitialPaymentMutation();

  const user = data?.data?.user;
  const service = data?.data?.service;
  const date = data?.data?.bookingDate;
  const bookingId = data?.data?.id;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = data?.data?.Time;
  const total = service?.offeredPrice > 0 ? service?.offeredPrice : service?.regularPrice ;

  const validateFields = () => {
    const newErrors = {
      address: shippingData.address ? "" : "Address is required.",
      country: shippingData.country ? "" : "Country is required.",
      state: shippingData.state ? "" : "State is required.",
      city: shippingData.city ? "" : "City is required.",
      zipCode: shippingData.zipCode ? "" : "Zip Code is required.",
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleCheckOut = async () => {
    if (validateFields()) {
      const checkoutData = {
        amount: total,
        ...shippingData,
        bookingId,
      };

      const res = await initialPayment(checkoutData).unwrap();
      // console.log(res)
      if(res?.data){
        push(res?.data);
      }
    } else {
      // console.log("Please fill out all the fields.");
    }
  };

  const handleShippingDataChange = useCallback((data: any) => {
    setShippingData(data);
  }, []);
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        {/* Checkout Form Section */}
        <div className="w-full mt-6">
        <Shipping
            user={user}
            shippingData={shippingData}
            errors={errors}
            onShippingDataChange={handleShippingDataChange}
          />
        </div>

        {/* Booking Summary Section */}
        <div className="w-full md:w-[85%] rounded-lg mt-6 md:pl-8">
          <h2 className="text-xl font-bold text-gray-600 pb-4">
            Booking Summary
          </h2>
          <div className="w-full bg-[#f8fcfd] rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <img
                  src={service?.serviceImg[0]}
                  alt="Car Wash"
                  className="w-12 h-12 mr-4"
                />
                <div>
                  <p className="text-gray-800 text-xl font-semibold">
                    {service?.category?.categoryName}
                  </p>
                  <p className="text-gray-600">{service?.serviceName}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <p className="text-gray-700">Rating</p>
                  <p className="text-gray-700 font-semibold">
                    4.9 (255 reviews)
                  </p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-gray-700">Location</p>
                  <p className="text-gray-700 font-semibold">
                    {service?.location}
                  </p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-gray-700">Date</p>
                  <p className="text-gray-700 font-semibold">
                    {formattedDate}
                  </p>
                </div>
                <div className="flex justify-between mb-4">
                  <p className="text-gray-700">Time</p>
                  <p className="text-gray-700 font-semibold">{time}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-4">
                  <p className="text-gray-700">Service Provider</p>
                  <p className="text-gray-700 font-semibold">
                    Thomas Herzberg
                  </p>
                </div>
                <div className="flex justify-between mb-4">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700 font-semibold">$0.00</p>
                </div>

                <div className="flex justify-between mb-4">
                  <p className="text-gray-700">Service Charges</p>
                  <p className="text-gray-700 font-semibold">${total}</p>
                </div>
                <div className="flex justify-between text-lg font-semibold mt-4">
                  <p className="text-gray-800">Total</p>
                  <p className="text-gray-800">${total}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex my-5">
            <button
              onClick={handleCheckOut}
              className="text-indigo-600 border border-indigo-600 bg-white hover:bg-indigo-600 hover:text-white text-semibold py-3 px-10 rounded-lg flex items-center justify-center w-full sm:w-auto text-center mr-4"
            >
              Proceed to Pay ${total}
            </button>
            <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md shadow-sm hover:bg-gray-300">
              Skip
            </button>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
