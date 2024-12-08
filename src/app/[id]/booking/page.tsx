"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Stepper from "@/components/UI/Stepper";
import Checkout from "@/app/checkout/[id]/page";
import BookingPage from "@/components/pages/BookingPage";
import BookingDone from "@/app/booking-done/page";
import { FaCalendarAlt } from "react-icons/fa";
import { LuBriefcase } from "react-icons/lu";
import { TiTickOutline } from "react-icons/ti";

const ServiceBooking = () => {
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

  // Determine the current step based on the pathname
  const currentStep = pathname.includes("/checkout/") ? 2 : pathname.includes("/success") ? 3 : 1;

  useEffect(() => {
    // Scroll to top when the page changes
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleStepChange = (step: number) => {
    if (step === 1) {
      router.push(`/${dynamicId}/booking`);
    } else if (step === 2) {
      router.push(`/checkout/${dynamicId}`);
    } else if (step === 3) {
      router.push(`/success`);
    }
  };

  return (
    <div className="max-w-full px-12 py-6 md:px-[8rem] ">
      {/* Stepper Navigation */}
      <Stepper steps={steps} currentStep={currentStep} onStepClick={handleStepChange} />

      {/* Page Content */}
      {pathname.includes("/checkout/") ? (
        <Checkout params={{ id: dynamicId }} /> 
      ) : pathname.includes("/booking-done") ? (
        <BookingDone />
      ) : (
        <BookingPage  />
      )}
    </div>
  );
};

export default ServiceBooking;
