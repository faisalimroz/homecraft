"use client";
import "swiper/css";
import React, { useState } from "react";
import { usePopularServicesQuery } from "@/redux/api/servicesApi";
import Loader from "@/components/UI/Loader";
import ServiceCard from "@/components/UI/ServiceCard";

const MostPopularServices = () => {
  const [swiper, setSwiper] = useState<any | null>(null);



  const { data, isLoading } = usePopularServicesQuery(undefined);
  const services = data?.data;

  return (
    <div className="main">
      <ServiceCard
      data={services}
      title="Most Popular Services"
      description="Explore the greatest of our services. You won’t be disappointed"
      isLoading={isLoading}
    />
    </div>
  );
};

export default MostPopularServices;