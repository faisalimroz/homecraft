"use client";
import React from 'react';
import ComboPackCard from './ComboPackCard';
import { useCombosQuery } from '@/redux/api/comboPackApi';
import Loader from './Loader';
import { usePathname } from 'next/navigation';
import BreadcrumbBar from './BreadcrumbBar';

const ServiceComboPack = () => {
  const pathname = usePathname(); 
  const planType = pathname.split('/').pop(); 
  const { data, isLoading } = useCombosQuery(undefined);
  const combos = data?.data;

  if (isLoading) {
    return <Loader />;
  }
  
  const filteredCombos = combos?.filter((combo: any) => combo.plan.toLowerCase() === planType?.toLowerCase());

  return (
  <>
  <BreadcrumbBar header="Combo Pack" name="combo pack" />
    <div className="mx-auto px-6 md:px-[6rem] py-10">
    
      {filteredCombos && filteredCombos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
         
          {filteredCombos.map((pack: any, index: number) => (
            <ComboPackCard
              key={index}
              id={pack?.id}
              name={pack?.name}
              services={pack?.services}
              providerImage={pack?.providerImage}
              providerName={pack?.providerName}
              providerInfo={pack?.providerInfo}
              amount={pack?.amount}
            />
          ))}
        </div>
      ) : (
      
        <div className="text-center text-xl font-semibold text-gray-700 mt-20">
          No Combo Packs found for the selected plan: <span className="capitalize">{planType}</span>.
        </div>
      )}
    </div>
  </>
  );
};

export default ServiceComboPack;
