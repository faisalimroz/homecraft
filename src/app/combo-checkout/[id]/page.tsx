"use client";
import React from "react";
import Loader from "@/components/UI/Loader";
import Main from "@/components/pages/ComboCheckout/Main";
import { useComboBookingQuery } from "@/redux/api/comboBooking";
import { FaCalendarAlt } from "react-icons/fa";
import { LuBriefcase } from "react-icons/lu";
import { TiTickOutline } from "react-icons/ti";
import Stepper from "@/components/UI/Stepper";
import { usePathname, useRouter } from "next/navigation";



type IDProps = {
  params: any;
};


const Checkout = ({ params }: IDProps) => {
  const { id } = params;
  const router = useRouter();
  const pathname = usePathname();
  const dynamicId = pathname?.split('/')[2]; 
  

  const {data,isLoading} = useComboBookingQuery(id);
  const comboBookind = data?.data;

  const steps = [
  
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
     
      router.push(`/checkout/${dynamicId}`);
    } else if (step === 2) {
      router.push(`/success`);
    }
  };

 

  if(isLoading){
    return <Loader/>
  }
  return (
    <div className="max-w-full px-12 py-6 md:px-[8rem] main">
        <Stepper steps={steps} currentStep={1} onStepClick={handleStepChange} />
      <Main data={comboBookind} />
    </div>
  );
};

export default Checkout;
