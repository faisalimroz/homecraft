"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../UI/Spinner";
import Link from "next/link";
import { FaUserShield, FaUserTie } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import loginSchema from "@/schemas/login";
import { yupResolver } from "@hookform/resolvers/yup";

// interface LoginProps {
//   callbackUrl?: string;
// }

const LoginPage = ({ callbackUrl }: any) => {
  const { push } = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isProviderLoading, setProviderLoading] = useState(false);
  const [isAdminLoading, setAdminLoading] = useState(false);

  // Handler for regular login form submission
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const result = await signIn("home-crafter", {
        ...data,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        toast.error(`${result.error}`);
      } else {
        push(callbackUrl || "/");
      }
    } catch (result: any) {
      toast.error(`${result.error}`);
    } finally {
      setLoading(false);
    }
  };

  // Handler for "Login as Provider"
  const handleProviderLogin = async () => {
    setProviderLoading(true);
    try {
      const result = await signIn("home-crafter", {
        email: "syednew5000@gmail.com",
        password: "syed123", 
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        toast.error(`Error: ${result.error}`);
      } else {
        push(callbackUrl || "/");
      }
    } catch (error) {
      toast.error("An error occurred during Provider login.");
    } finally {
      setProviderLoading(false);
    }
  };

  // Handler for "Login as Admin"
  const handleAdminLogin = async () => {
    setAdminLoading(true);
    try {
      const result = await signIn("home-crafter", {
        email: "mikatsyed@gmail.com",
        password: "mikat123", 
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        toast.error(`Error: ${result.error}`);
      } else {
        push(callbackUrl || "/");
      }
    } catch (error) {
      toast.error("An error occurred during Admin login.");
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <div className="mx-4 md:mx-0">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center">
        <div className="flex flex-col md:flex-row justify-center md:w-[80%] mt-4 shadow-lg rounded-lg bg-white overflow-hidden">
        <div className="hidden md:flex flex-col items-center bg-indigo-600 text-white p-8 w-1/2">
  <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
  <p className="text-lg mb-6">
    We're thrilled to have you back! To continue, please login with your credentials and access your personalized dashboard.
  </p>
  
  <h2 className="text-2xl font-semibold mb-3">Why Login?</h2>
  <ul className="list-disc list-inside text-lg mb-6">
    <li>Access exclusive content tailored just for you.</li>
    <li>Track your home improvement projects in real-time.</li>
    <li>Get personalized recommendations from top service providers.</li>
    <li>Enjoy seamless collaboration with professionals on your projects.</li>
  </ul>

 
  <p className="text-lg font-semibold">
    Ready to transform your home? Login now to get started!
  </p>
</div>


          <div className="flex justify-center self-center md:w-1/2 p-6 bg-white">
            <div className="mx-auto rounded-3xl w-full p-8">
              <div className="flex flex-col items-center mb-7">
                <h3 className="font-semibold text-3xl text-gray-800 mb-2">
                  Welcome to <span className="text-gray-700"><span className="text-indigo-600">Home </span> Crafter</span>
                </h3>
                <p className="text-gray-600">Login to your account</p>
              </div>
              <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
              <div className="mb-2">
              <FormInput name="email" type="email" label="Email" />
              </div>
                <div className="relative mb-6">
                  <FormInput name="password" label="Password" type={passwordVisible ? "text" : "password"} />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {passwordVisible ? (
                      <FaEyeSlash className="text-gray-600 cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} />
                    ) : (
                      <FaEye className="text-gray-600 cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} />
                    )}
                  </div>
                </div>
                <div className="text-right mb-5">
                  <Link href="/forgot-password" className="text-gray-700 hover:text-gray-900 text-sm">
                    Forgot Password?
                  </Link>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className={`w-full flex justify-center items-center border border-indigo-700 
                  ${
                    loading
                      ? "bg-indigo-700 text-white p-3 opacity-50 cursor-not-allowed"
                      : "bg-white text-indigo-700 hover:bg-indigo-700 hover:text-white"
                  } p-3 rounded-md font-semibold cursor-pointer transition duration-300 ease-in-out`}
                    disabled={loading}
                  >
                    {loading ? <Spinner /> : "Login"}
                  </button>
                </div>
              </Form>
              <div className="flex flex-col items-center mt-5">
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-gray-700 hover:text-gray-900 ml-1">
                    Sign up
                  </Link>
                </p>
              </div>
              <div className="flex flex-col space-y-4 mt-6">
                <button
                  onClick={handleProviderLogin}
                  className={`w-full flex justify-center items-center border border-indigo-700 
                  ${
                    isProviderLoading
                      ? "bg-indigo-700 text-white p-3 opacity-50 cursor-not-allowed"
                      : "bg-white text-indigo-700 hover:bg-indigo-700 hover:text-white"
                  } p-3 rounded-md font-semibold cursor-pointer transition duration-300 ease-in-out`}
                  disabled={isProviderLoading}
                >
                  {isProviderLoading ? <Spinner /> : <><FaUserTie className="mr-2" /> Login as Provider</>}
                </button>

                <button
                  onClick={handleAdminLogin}
                  className={`w-full flex justify-center items-center border border-indigo-700 
                  ${
                    isAdminLoading
                      ? "bg-indigo-700 text-white p-3 opacity-50 cursor-not-allowed"
                      : "bg-white text-indigo-700 hover:bg-indigo-700 hover:text-white"
                  } p-3 rounded-md font-semibold cursor-pointer transition duration-300 ease-in-out`}
                  disabled={isAdminLoading}
                >
                  {isAdminLoading ? <Spinner /> : <><FaUserShield className="mr-2" /> Login as Admin</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
