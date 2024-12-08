// components/Profile/UpdateProfileForm.tsx

"use client";
import React, { useState } from "react";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Spinner from "@/components/UI/Spinner";
import { ShowToast } from "@/components/UI/ShowToast";
import toast from "react-hot-toast";

const UpdateProfile = ({ defaultValues, user, setEditMode }: any) => {
  const [loading, setLoading] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (values: any) => {
    // Check if the form values are unchanged from the default values
    if (
      values.fName === defaultValues.fName &&
      values.lName === defaultValues.lName &&
      values.email === defaultValues.email &&
      values.contactNo === defaultValues.contactNo
    ) {
      setEditMode(false);
      return;
    }

    const toastId = toast.loading("Updating...");
    try {
      setLoading(true);
      const res: any = await updateUser({ id: user?.id, body: values }).unwrap();
      if (res && res?.data) {
        ShowToast({
          message: res?.message,
        });
      }
      setEditMode(false);
    } catch (err: any) {
      toast.error(err?.data);
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <Form submitHandler={onSubmit} defaultValues={defaultValues}>
      <FormInput name="fName" label="First Name" type="text" />
      <FormInput name="lName" label="Last Name" type="text" />
      <FormInput name="email" label="Email" type="email" />
      <FormInput name="contactNo" label="Phone Number" type="number" />
      <div className="mb-6">
        <button
          type="submit"
          className={`w-full flex justify-center items-center bg-indigo-600  text-white p-3 rounded-lg font-semibold cursor-pointer hover:bg-white  border border-indigo-600 hover:text-indigo-600 ${
            loading
              ? "w-full opacity-50 cursor-not-allowed inline-flex justify-center items-center"
              : ""
          }`}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Save Changes"}
        </button>
      </div>
    </Form>
  );
};

export default UpdateProfile;
