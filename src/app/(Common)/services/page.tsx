import BreadcrumbBar from '@/components/UI/BreadcrumbBar';
import Loader from '@/components/UI/Loader';
import ServicesPage from '@/components/pages/Services/ServicesPage';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
    title: "HC | Services",
  };

const Services = () => {
    return (
       <Suspense fallback={<Loader/>}>
         <div className='main'>
          <BreadcrumbBar header="Our Services" name="Services"/>
            <ServicesPage/>
        </div>
       </Suspense>
    );
};

export default Services;