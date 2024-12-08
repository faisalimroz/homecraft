"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../UI/Spinner";

interface LoginProps {
  callbackUrl?: string;
}

const ProviderLoginPage = ({ callbackUrl }: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathName = '/provider';

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await signIn("home-crafter", {...data,callbackUrl,pathName});
      setLoading(false);
    } 
    catch (err: any) {
      toast(err?.data,
        {
          icon:  <span style={{color:"white"}}>❌</span>,
          style: {
            borderRadius: '10px',
            background: 'red',
            color: '#fff'
          }
        })
    }
  };

  return (
    <div>
       <Toaster  position="top-center"
  reverseOrder={false} />
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex flex-col md:flex-row justify-center md:w-[80%] mt-11">
        <div className="hidden md:block md:flex md:w-1/2 flex-col items-center p-8 text-center">
          <h2 className="text-4xl font-bold leading-relaxed text-[#4f46e5]">
            Transform Your Home with Expert Crafting Services
          </h2>
          <h2 className="text-2xl mt-6 font-bold">
            Discover the Best with HomeCrafter
          </h2>
          <div className="bg-[#4f46e5] px-6 py-8 flex mt-10 mb-7 rounded-xl items-center gap-6 text-white shadow-md">
            <img
              src="https://portal.tabedge.com/assets/earth-BeyVdefS.png"
              alt="Crafting Tools"
              className="w-[25%] rounded-full shadow-lg"
            />
            <p className="w-[60%] lg:text-lg">
              Join our community of skilled crafters and home service experts.
              HomeCrafter connects you with the best local professionals for all
              your home improvement needs.
            </p>
          </div>
        </div>

        <div className="flex justify-center self-center md:w-1/2 p-6">
          <div className="bg-white mx-auto rounded-3xl w-full max-w-lg border p-12 ">
            <div className="flex flex-col items-center mb-7">
              {/* Logo Image for mobile view */}
              {/* <img
                src="/path/to/your/logo.png" // Replace with the actual path to your logo image
                alt="HomeCrafter Logo"
                className="w-20 h-20 mb-4 md:hidden"
              /> */}
              <h3 className="font-semibold text-3xl text-gray-800">
                Welcome to{" "}
                <span className="text-[#4f46e5]"> Home Crafter </span>
              </h3>
            </div>
            <Form submitHandler={onSubmit}>
              <FormInput name="email" type="email" label="Email address" />
              <div className="relative mb-5">
                <FormInput
                  name="password"
                  label="Password"
                  type={passwordVisible ? "text" : "password"}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {passwordVisible ? (
                    <FaEyeSlash
                      className="text-gray-600 cursor-pointer"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                  ) : (
                    <FaEye
                      className="text-gray-600 cursor-pointer"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                  )}
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className={`w-full flex justify-center items-center bg-[#1475c6] text-white p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                    {loading ? <Spinner /> : 'Login'} 
                
                </button>
              </div>
            </Form>
            <div className="flex items-center justify-between mt-5 text-sm">
              <p>
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-blue-700 hover:text-blue-600 ml-1"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="md:hidden flex flex-col items-center text-center p-4">
          <div className="bg-[#4f46e5] px-6 py-8 flex  rounded-xl items-center gap-6 text-white shadow-md">
            <img
              src="https://portal.tabedge.com/assets/earth-BeyVdefS.png"
              alt="Crafting Tools"
              className="w-[25%] rounded-full shadow-lg"
            />
            <p className="w-[60%] lg:text-lg">
              Join our community of skilled crafters and home service experts.
              HomeCrafter connects you with the best local professionals for all
              your home improvement needs.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  
  );
};

export default ProviderLoginPage;
