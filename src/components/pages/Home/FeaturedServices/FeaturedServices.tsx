"use client";
import React from "react";
import { useServicesQuery } from "@/redux/api/servicesApi";
import ServiceCard from "@/components/UI/ServiceCard";


const FeaturedServices = () => {
  const { data, isLoading } = useServicesQuery(undefined);
  const services = data?.data;

  return (
   <div className="main mx-auto">
     <ServiceCard
      data={services}
      title="Featured Services"
      description="Explore the greatest of our services. You won’t be disappointed."
      isLoading={isLoading}
    />
   </div>
  );
};

export default FeaturedServices;
