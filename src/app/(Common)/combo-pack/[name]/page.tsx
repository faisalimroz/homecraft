
import ServiceComboPack from '@/components/UI/ServiceComboPack';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "HC | Combo Pack",
};

const ComboPackPage = () => {
  return (
    <div className='main'>
      <ServiceComboPack/>
    </div>
  );
};

export default ComboPackPage;
