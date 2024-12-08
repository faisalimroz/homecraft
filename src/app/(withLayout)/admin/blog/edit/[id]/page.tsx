"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useBlogQuery, useUpdateBlogMutation } from "@/redux/api/blogApi";
import { TiTickOutline } from "react-icons/ti";
import CategoryField from "@/components/Forms/CategoryField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import Spinner from "@/components/UI/Spinner";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/navigation";


type IDProps = {
    params: any;
  };
  
const UpdateBlog = ({ params }: IDProps) => {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [updateBlog] = useUpdateBlogMutation();
  const { data, isLoading: blogLoading } = useBlogQuery(id);
  const blog = data?.data;

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res: any = await updateBlog({ id, body:{...values }}).unwrap();
      if (res && res.data) {
        setLoading(false);
        toast("Blog updated successfully", {
          icon: <TiTickOutline style={{ marginRight: -8, fontSize: 22 }} />,
          style: {
            borderRadius: "10px",
            background: "#4f46e5",
            color: "#fff",
          },
          duration: 2000,
        });
        router.push("/provider/blog"); 
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to update blog", {
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

  if (blogLoading) return <Loader />;

  const defaultValues = {
    title : blog?.title,
    content : blog?.content,
    categoryId : blog?.categoryId,

  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-[#2a2a3d] tracking-tight">
            Update Blog
          </h2>
          <p className="text-gray-500 mt-2">Modify the details of your blog post.</p>
        </div>
        <div className="relative">
          <div className="w-full">
            <Form submitHandler={onSubmit} defaultValues={defaultValues} >
              <div className="mb-4">
                <FormInput name="title" label="Title" type="text" />
              </div>

              <div className="mb-4">
                <FormTextArea name="content" label="Content" rows={5} />
              </div>

              <div className="mb-4">
                <CategoryField name="categoryId" label="Category" />
              </div>

              <div className="flex mt-4">
                <button
                  type="button"
                  onClick={() => router.back()} // Go back to the previous page
                  className="bg-white border text-black hover:text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-[#4f46e5] mr-3"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={`text-[#4f46e5] hover:text-white hover:bg-[#4f46e5] inline-flex items-center justify-center px-4 py-2 rounded text-md border border-[#4f46e5] ${
                    loading
                      ? "w-[150px] bg-[#4f46e5] text-white opacity-50 cursor-not-allowed inline-flex justify-center items-center"
                      : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? <Spinner /> : "Update Blog"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBlog;
