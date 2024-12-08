import Main from '@/components/pages/ProviderDetails/Main';
import { Metadata } from 'next';
import React from 'react';

type IDProps = {
    params: any;
};
export const metadata: Metadata = {
    title: "HC | Provider Details",
  };
const page = ({ params }: IDProps) => {
    const { id } = params;
    return (
        <div className='main'>
        <Main id={id}/>
        </div>
    );
};

export default page;