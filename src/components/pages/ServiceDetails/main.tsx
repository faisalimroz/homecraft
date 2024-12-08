"use client";
import BreadcrumbBar from '@/components/UI/BreadcrumbBar';
import Loader from '@/components/UI/Loader';
import ProductGallery from './ProductGallery/ProductGallery';
import ServiceInfo from './ServiceInfo/ServiceInfo';
import { useServiceQuery } from '@/redux/api/servicesApi';
import React from 'react';


const ServiceDetails = ({id}:any) => {
    const { data, isLoading } = useServiceQuery(id)

    if (isLoading) return <Loader/>
   
    return (
        <div>
            <BreadcrumbBar header="Service Details" name="Service Details" subtitle="" />
            <ProductGallery data={data} />
            <ServiceInfo data={data} />
        </div>
    );
};

export default ServiceDetails;
