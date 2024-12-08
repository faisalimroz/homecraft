"use client";

import React, { useState } from "react";
import { useSingleProviderServiceQuery } from "@/redux/api/servicesApi"; 
import ServiceCard from "@/components/UI/ServiceCard";

// Define the interface for props
interface ProviderServicesProps {
  providerId: string;
}

const ProviderServices: React.FC<ProviderServicesProps> = ({ providerId }) => {
  const { data } = useSingleProviderServiceQuery(providerId);
  const providers = data?.data;


  return (
    <>
      <ServiceCard
      data={providers}
      title="Provider Services"
      description="Explore the greatest of our services. You won’t be disappointed."
    />
    </>
  );
};

export default ProviderServices;
