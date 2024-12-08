"use client";
import React from "react";
import CheckoutPage from "@/components/pages/CheckoutPage";
import Stepper from "@/components/UI/Stepper";
import { useRouter, usePathname } from "next/navigation";
import { useBookingQuery } from "@/redux/api/bookingApi";
import Loader from "@/components/UI/Loader";
import { FaCalendarAlt } from "react-icons/fa";
import { LuBriefcase } from "react-icons/lu";
import { TiTickOutline } from "react-icons/ti";

type IDProps = {
  params: any;
};


const Checkout = ({ params }: IDProps) => {
  const { id } = params;
  // console.log(id,'16')
  const router = useRouter();
  const pathname = usePathname();
  const dynamicId = pathname?.split('/')[2]; 
 
  const {data,isLoading} = useBookingQuery(id);
  const steps = [
    {
      title: "Appointment",
      description: "Choose time & date for the service",
      icon: <FaCalendarAlt />
    },
    {
      title: "Payment",
      description: "Confirm Payment",
      icon: <LuBriefcase />
    },
    {
      title: "Done",
      description: "Completion of Booking",
      icon: <TiTickOutline  />
    },
  ];

 
  const handleStepChange = (step: number) => {
    if (step === 1) {
      router.push(`/${dynamicId}/booking`);
    } else if (step === 2) {
      router.push(`/checkout/${dynamicId}`);
    } else if (step === 3) {
      router.push(`/success`);
    }
  };

  if(isLoading){
    return <Loader/>
  }
  return (
    <div className="max-w-full px-12 py-6 md:px-[8rem] main">
      <Stepper steps={steps} currentStep={2} onStepClick={handleStepChange} />
      <CheckoutPage data={data} />
    </div>
  );
};

export default Checkout;
