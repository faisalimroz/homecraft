import TopProviders from '@/components/pages/Home/TopProviders/TopProviders';
import BreadcrumbBar from '@/components/UI/BreadcrumbBar';
import { Metadata } from 'next';

import React from 'react';

export const metadata: Metadata = {
    title: "HC | Providers",
  };

const Provider = () => {
    return (
        <div>
            <BreadcrumbBar header="Our Providers" name="Providers" subtitle=""/>
            <TopProviders/>
        </div>
    );
};

export default Provider;