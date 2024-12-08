

import LoginPage from '@/components/pages/LoginPage';
import { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
    title: "HC | Login",
  };

  
const Login = ({searchParams:{callbackUrl}}:any) => {

    return (
        <div className='login-bg main'>
            <LoginPage  callbackUrl={callbackUrl || "/"} />
           
        </div>
    );
};

export default Login;