"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Spinner from "@/components/UI/Spinner";
import FormSelectField from "../Forms/FormSelectField";
import { genderOptions } from "@/constants/global";
import FormDatePicker from "../Forms/FormDatePicker";
import CategoryField from "../Forms/CategoryField";
import FormTextArea from "../Forms/FormTextArea";
import { useProviderByIdQuery, useUpdateProviderMutation } from "@/redux/api/providerApi";
import { useRouter } from "next/navigation";
import { TiTickOutline } from "react-icons/ti";


const UpdateProviderProfile = ({id}:any) => {
  const {push} = useRouter();
  const { data } = useProviderByIdQuery(id);
  const [updateUser] = useUpdateProviderMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const user = data?.data;

  const defaultValues = {
    fName: user?.fName || "",
    lName: user?.lName || "",
    email: user?.email || "",
    contactNo: user?.contactNo || "",
    gender: user?.gender || "",
    dob: user?.dob ? new Date(user?.dob) : null, 
    categoryId: user?.category?.id || "",
    bio: user?.bio || "",
    address: user?.address || "",
  };

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res: any = await updateUser({ id, body: values }).unwrap();
      if (res && res?.data) {
        toast.success(res?.message, {
          icon: (
            <span style={{ marginRight: -8, fontSize: 22 }}>
              <TiTickOutline />
            </span>
          ),
          style: {
            borderRadius: "10px",
            background: "#4f46e5",
            color: "#fff",
          },
          duration: 2000,
        });
       setTimeout(()=>{
        push('/provider/profile')
       },2000)
      }
    } catch (err: any) {
      toast.error("Failed to update user", {
        style: {
          borderRadius: "10px",
          background: "#e74c3c",
          color: "#fff",
        },
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center">
        <div className="w-full max-w-4xl p-12 rounded-2xl">
          <h3 className="text-3xl font-semibold text-gray-800 mb-8">
            Update Provider Profile
          </h3>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormInput name="fName" label="First Name" type="text" />
              <FormInput name="lName" label="Last Name" type="text" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormInput name="email" label="Email" type="email" />
              <FormInput name="contactNo" label="Phone Number" type="number" />
            </div>

           

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormSelectField
                name="gender"
                label="Gender"
                options={genderOptions}
              />
              <FormDatePicker name="dob" label="Date Of Birth" />
            </div>

          

            <div className="mb-6">
              <FormTextArea
                name="bio"
                placeholder="Add Bio..."
                label="Bio"
                rows={5}
              />
            </div>

            <div className="mb-6">
              <FormInput name="address" label="Address" type="text" />
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className={`w-full flex justify-center items-center bg-indigo-600 text-white p-3 rounded-lg font-semibold cursor-pointer hover:bg-white  border border-[#4c40ed] hover:text-[#4c40ed] ${
                  loading ? "text-white opacity-50 cursor-not-allowed inline-flex justify-center items-center" : ""
                }`}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Save Changes"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateProviderProfile;
