"use client";


import { useOverviewQuery } from '@/redux/api/servicesApi';
import React from 'react';
import AdminDashboard from '@/components/UI/AdminDashboard';
import ProviderDashboard from '@/components/UI/ProviderDashboard';
import Loader from '@/components/UI/Loader';

const Dashboard = () => {
  const { data,isLoading } = useOverviewQuery(undefined);
  const role = data?.data?.role;
 
  if(isLoading){
    return <div><Loader/></div>
  }
  
  return (
    <div>
    <div>
      {role === 'Admin' ? (
        <AdminDashboard data={data.data} />
      ) : role === 'Provider' ? (
        <ProviderDashboard data={data.data} />
      ) : (
        <p>Unauthorized access or role not recognized.</p>
      )}
    </div>
    </div>
  );
};

export default Dashboard;
