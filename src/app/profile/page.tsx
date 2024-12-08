
import ProfilePage from '@/components/pages/Profile/ProfilePage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "HC | User Profile",
  };


const page = () => {
    return (
        <>
            <ProfilePage/>
        </>
    );
};

export default page;