"use client";
import React, { Suspense, useState } from 'react';
import { useLoggedUserQuery } from '@/redux/api/userApi';
import toast, { Toaster } from 'react-hot-toast';
import FormInput from '@/components/Forms/FormInput';
import Form from '@/components/Forms/Form';
import { useResetPasswordMutation } from '@/redux/api/authApi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ShowToast } from '@/components/UI/ShowToast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/UI/Spinner';
import { useSearchParams } from 'next/navigation'; 
import resetPasswordSchema from '@/schemas/reset-password';
import Loader from '@/components/UI/Loader';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState({ oldPassword: false, confirmPassword: false, newPassword: false });
  const [resetPassword] = useResetPasswordMutation();
  const { data } = useLoggedUserQuery(undefined);
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const token = searchParams.get('token'); 

  const user = data?.data;
  // console.log(user?.role, '24');

  const onSubmit = async (values: any) => {
    values.token = token; // Attach the token to the values
    const toastId = toast.loading("Updating...");
    setLoading(true);
    try {
      const res = await resetPassword({ body: values }).unwrap();
    
        ShowToast({
          message: res?.message,
        });
     

      
       setTimeout(()=>{
        router.push('/login'); 
       },2000)
      
    } catch (error: any) {
      toast.error(error?.data);
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
          <Form submitHandler={onSubmit} resolver={yupResolver(resetPasswordSchema)}>
            <div>
              <div className="mb-4 relative">
                <FormInput
                  type={passwordVisible.newPassword ? 'text' : 'password'}
                  name="newPassword"
              
                  label="New Password"
                  className="w-full pr-10"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setPasswordVisible({ ...passwordVisible, newPassword: !passwordVisible.newPassword })}
                >
                  {passwordVisible.newPassword ? (
                    <FaEyeSlash className="text-gray-600" />
                  ) : (
                    <FaEye className="text-gray-600" />
                  )}
                </div>
              </div>
              <div className="mb-4 relative">
                <FormInput
                  type={passwordVisible.confirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  
                  label="Confirm Password"
                  className="w-full pr-10"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setPasswordVisible({ ...passwordVisible, confirmPassword: !passwordVisible.confirmPassword })}
                >
                  {passwordVisible.confirmPassword ? (
                    <FaEyeSlash className="text-gray-600" />
                  ) : (
                    <FaEye className="text-gray-600" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-6 hover:text-indigo-600">
              <button
                type="submit"
                className={`bg-indigo-600 border border-indigo-600 text-white hover:text-indigo-600 py-2 px-4 rounded hover:bg-white transition ${loading ? 'text-white bg-indigo-600 w-[150px] opacity-50 cursor-not-allowed inline-flex justify-center items-center' : ''}`}
                disabled={loading}
              >
                {loading ? <Spinner /> : 'Reset Password'}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
