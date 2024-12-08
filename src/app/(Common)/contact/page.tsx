import Contact from '@/components/pages/Contact/Contact';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "HC | Contact",
  };
const page = () => {
    return (
        <>
            <Contact/>
        </>
    );
};

export default page;