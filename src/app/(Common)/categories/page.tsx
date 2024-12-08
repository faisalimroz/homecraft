
import FeaturedCategories from '@/components/pages/Home/FeaturedCategories/FeaturedCategories';
import BreadcrumbBar from '@/components/UI/BreadcrumbBar';
import { Metadata } from 'next';

import React from 'react';

export const metadata: Metadata = {
    title: "HC | Categories",
  };

const Categories = () => {
    return (
        <div>
             <BreadcrumbBar header="Categories" name="Categories" />
             <FeaturedCategories/>
        </div>
    );
};

export default Categories;