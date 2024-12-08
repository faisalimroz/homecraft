"use client";
import React, { useState } from 'react';
import { useLoggedUserQuery } from '@/redux/api/userApi';
import toast, { Toaster } from 'react-hot-toast';
import FormInput from '@/components/Forms/FormInput';
import Form from '@/components/Forms/Form';
import {  useForgotPasswordMutation } from '@/redux/api/authApi';
import { ShowToast } from '@/components/UI/ShowToast';
import { yupResolver } from '@hookform/resolvers/yup';
import Spinner from '@/components/UI/Spinner';
import forgetPasswordSchema from '@/schemas/forget-password';

const ForgotPassword = () => {
  const [loading,setLoading] = useState(false)
  const [forgotPassword] = useForgotPasswordMutation();
  const { data } = useLoggedUserQuery(undefined);

  const user = data?.data;
  // console.log(user?.role,'24')
  

  const onSubmit = async (values: any) => {
    const toastId = toast.loading("Updating...")
    setLoading(false)
    try {
      const res = await forgotPassword({ body: values }).unwrap();
      setTimeout(()=>{
        ShowToast({
            message:res?.message
          })
      },2000)
     
      if (res?.statusCode === 200) {
        setLoading(true)
      
      }
      
    } catch (error:any) {
        setLoading(false)
      toast.error(error?.data);
    }finally{
        setLoading(false)
        toast.dismiss(toastId)
    }
  };

  return (
    <>
       <Toaster position="top-center" reverseOrder={false} />

<div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
    <h2 className="text-xl font-semibold mb-4">Forget Password</h2>
    <Form submitHandler={onSubmit} resolver={yupResolver(forgetPasswordSchema)}>
  
        <div className="mb-4 relative">
          <FormInput
            type="email"
            name="email"
          
            label="Email"
            className="w-full pr-10"
          />

        </div>
  

      <div className="flex justify-center items-center mt-6 hover:text-indigo-600">
        
        <button
          type="submit"
          className={`bg-white hover:bg-indigo-700 border border-indigo-700 hover:text-white text-indigo-600 py-2 px-4 rounded  transition ${loading ? 'text-indigo-700 opacity-50 cursor-not-allowed inline-flex justify-center items-center' : ''}}`}
          disabled={loading}
        >
       {loading ? <Spinner/> :' Forget Password'}
        </button>
      </div>
    </Form>
  </div>
</div>
    </>
  );
};

export default ForgotPassword;
