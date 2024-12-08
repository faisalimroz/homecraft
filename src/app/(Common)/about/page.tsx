import About from '@/components/pages/About/About';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "HC | About",
  };

const page = () => {
    return (
        <>
            <About/>
        </>
    );
};

export default page;