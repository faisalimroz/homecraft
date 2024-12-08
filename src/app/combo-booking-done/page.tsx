
"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { LuBriefcase } from "react-icons/lu";
import { TiTickOutline } from "react-icons/ti";
import Stepper from "@/components/UI/Stepper";
import PaymentSuccess from "@/components/pages/PaymentSuccess";

const BookingDone = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dynamicId = pathname?.split('/')[2]; 

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
        router.push(`/booking-done`);
    }
  };

  return (
    <div className="max-w-full px-12 py-6 md:px-[8rem] main">
      <Stepper steps={steps} currentStep={3} onStepClick={handleStepChange} />
      <PaymentSuccess  />
    </div>
  );
};

export default BookingDone;
