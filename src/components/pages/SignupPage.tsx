"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useSignupMutation } from "@/redux/api/authApi";
import { TiTickOutline } from "react-icons/ti";
import Spinner from "@/components/UI/Spinner";
import SingleImageUpload from "../UI/SingleImageUpload";
import signupSchema from "@/schemas/signup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ShowToast } from "../UI/ShowToast";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const {push} = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [profileImg, setProfileImg] = useState<{ id: number; url: string } | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string>(""); 


  const [signup] = useSignupMutation();

  const onSubmit = async (values: any) => {
    if (!profileImg) {
      setImageError("Profile image is required"); 
      return;
    }

    setImageError(""); 
    values.profileImg = profileImg.url;
    const toastId = toast.loading("Posting...")

    try {
      setLoading(true);
      const res: any = await signup(values).unwrap();

      if (res && res.data) {
       ShowToast({
        message:res?.message
       })
        setProfileImg(null);
        setImgPreview(null);
        setTimeout(()=>{
        push('/login')
        },2000)
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err: any) {
      console.error(err);

      toast.error("Failed to create user", {
        style: {
          borderRadius: "10px",
          background: "#e74c3c",
          color: "#fff",
        },
        duration: 2000,
      });
    } finally {
      toast.dismiss(toastId)
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center  relative mx-4 md:mx-0">
        <div className="w-full max-w-2xl flex justify-center items-center">
          <div className="p-12 bg-white rounded-3xl w-full">
            <div className="mb-7">
              <h3 className="font-semibold text-3xl text-gray-800">Signup</h3>
            </div>
            <Form submitHandler={onSubmit} resolver={yupResolver(signupSchema)}>
              <div className="w-full flex flex-col sm:flex-row md:space-x-6 mb-4">
                <FormInput name="fName" label="First Name" type="text" className="w-full"/>
                <FormInput name="lName" label="Last Name" type="text" className="w-full" />
              </div>

              <FormInput name="email" label="Email" type="email" />
             <div className="mt-2">
             <FormInput name="contactNo" label="Phone Number" type="number" />
             </div>

              <div className="relative mb-5 mt-2">
                <FormInput
                  name="password"
                  label="Password"
                  type={passwordVisible ? "text" : "password"}
                />
                <div className="flex items-center absolute inset-y-0 right-0 mr-3 text-sm leading-5">
                  {passwordVisible ? (
                    <FaEyeSlash onClick={() => setPasswordVisible(!passwordVisible)} />
                  ) : (
                    <FaEye onClick={() => setPasswordVisible(!passwordVisible)} />
                  )}
                </div>
              </div>

              <SingleImageUpload
                label="Upload Profile"
                imgPreview={imgPreview}
                setImgPreview={setImgPreview}
                onImageChange={setProfileImg}
              />

            
              {imageError && (
                <div className="text-red-600 text-sm mt-2">
                  {imageError}
                </div>
              )}

              <div className="mt-5">
           <button
  type="submit"
  className={`w-full flex justify-center items-center border border-indigo-600 p-3 rounded-lg font-semibold cursor-pointer transition ease-in duration-300 ${
    loading
      ? "bg-indigo-600 text-white opacity-50 cursor-not-allowed"
      : "bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white"
  }`}
  disabled={loading}
>
  {loading ? <Spinner /> : "Register"}
</button>

              </div>
            </Form>
            <div className="flex items-center justify-between mt-5">
              <div className="text-sm">
                Already have an account?
                <a href="/login" className="text-blue-700 hover:text-blue-600 ml-1">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
