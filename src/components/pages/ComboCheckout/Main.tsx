import React, { useCallback, useState } from "react";
import { useInitialPaymentForComboMutation } from "@/redux/api/paymentApi";
import { useRouter } from "next/navigation";
import Shipping from "./Shipping/Shipping";

const Main = ({ data }: any) => {
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

  const [initialPaymentForCombo] = useInitialPaymentForComboMutation();

  const user = data?.user;
  const comboPack = data?.comboPack;
  const comboBookingId = data?.bookingId;
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
        comboBookingId,
      };

      const res = await initialPaymentForCombo(checkoutData).unwrap();
      console.log(res)
      if(res?.data){
        push(res?.data);
      }
    } 
  };

  const handleShippingDataChange = useCallback((data: any) => {
    setShippingData(data);
  }, []);

  const total = comboPack?.discountAmount > 0 ? comboPack?.amount : comboPack?.discountAmount ;
  const getServiceCharge = (total:number) => {
    if (total > 200) {
      return 15;
    } else if (total > 100) {
      return 10;
    } else {
      return 0;
    }
  };
  
  const serviceCharge = getServiceCharge(total);
  const grandTotal = total + serviceCharge;
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

      
        <div className="w-full md:w-[85%] rounded-lg mt-6 md:pl-8 ">
  <h2 className="text-xl font-bold text-gray-600 pb-4">Booking Summary</h2>
  <div className="w-full bg-[#f8fcfd] rounded-lg overflow-hidden">
    <div className="p-8">
     
      <div className="flex items-center mb-6">
        <div>
          <p className="text-gray-800 text-xl font-semibold">{comboPack?.comboName}</p>
          <p className="text-gray-600">{comboPack?.providerCategory} Services</p>
         
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-4">
          <p className="text-gray-700">Service Provider</p>
          <p className="text-gray-700 font-semibold">{comboPack?.providerName}</p> {/* Static Provider Name */}
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-gray-700">Plan Name</p>
          <p className="text-gray-700 font-semibold">{comboPack?.plan} Plan</p> {/* Static Plan Name */}
        </div>
        <div className="flex justify-between mb-4">
  <p className="text-gray-700">Services Included</p>
  <div className="text-gray-700 font-semibold">
    <ul className="list-disc pl-4 space-y-1">
      {comboPack?.services?.map((service: any, index: number) => (
        <li key={index} className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
          {service}
        </li>
      ))}
    </ul>
  </div>
</div>


        <div className="flex justify-between mb-4 border-t border-gray-200 pt-4">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700 font-semibold">${total}</p> {/* Static Subtotal */}
        </div>

        <div className="flex justify-between mb-4">
          <p className="text-gray-700">Service Charges</p>
          <p className="text-gray-700 font-semibold">${serviceCharge}</p> 
        </div>
        <div className="flex justify-between text-lg font-semibold mt-4">
          <p className="text-gray-800">Total</p>
          <p className="text-gray-800">${grandTotal}</p> 
        </div>
      </div>
    </div>
  </div>

  <div className="flex my-5">
    <button
      onClick={handleCheckOut}
      className="text-indigo-600 border border-indigo-600 bg-white hover:bg-indigo-600 hover:text-white text-semibold py-3 px-10 rounded-lg flex items-center justify-center w-full sm:w-auto text-center mr-4"
    >
      Proceed to Pay ${grandTotal}
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

export default Main;
