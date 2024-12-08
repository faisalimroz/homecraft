
import Main from '@/components/pages/Home/Blog/Main';
import BreadcrumbBar from '@/components/UI/BreadcrumbBar';
import Loader from '@/components/UI/Loader';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
    title: "HC | Blogs",
  };
const Blogs = () => {

    return (
        <Suspense fallback={<Loader/>} >
               <BreadcrumbBar header="Our Blogs" name="Blogs"/>
            <Main/>
        </Suspense>
    );
};

export default Blogs