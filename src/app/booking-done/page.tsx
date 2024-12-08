
"use client";
import React from "react";
import PaymentSuccess from '@/components/pages/PaymentSuccess';
import Stepper from "@/components/UI/Stepper";
import { useRouter, usePathname } from "next/navigation";
import { FaCalendarAlt } from "react-icons/fa";
import { LuBriefcase } from "react-icons/lu";
import { TiTickOutline } from "react-icons/ti";

const BookingDone = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dynamicId = pathname?.split('/')[2]; 

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

  const handleNext = () => {
    router.push(`/success`);
  };

  const handleStepChange = (step: number) => {
    if (step === 1) {
      router.push(`/${dynamicId}/booking`);
    } else if (step === 2) {
      router.push(`/checkout/${dynamicId}`);
    } else if (step === 3) {
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
