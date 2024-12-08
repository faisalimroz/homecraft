"use client"
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddServiceMutation } from '@/redux/api/servicesApi';
import { TiTickOutline } from 'react-icons/ti';
import CategoryField from '@/components/Forms/CategoryField';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormTextArea from '@/components/Forms/FormTextArea';
import Spinner from '@/components/UI/Spinner';
import serviceSchema from '@/schemas/service';
import { useAddBlogMutation } from '@/redux/api/blogApi';
import SingleImageUpload from '@/components/UI/SingleImageUpload';

interface BlogImage {
  id: number;
  url: string;
}
const CreateBlog = () => {
  const [blogImg, setBlogImg] = useState<BlogImage | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);  
  const [addBlog] = useAddBlogMutation();

  const onSubmit = async (values: any) => {
    if (blogImg) {
      values.blogImg = blogImg.url;
    }

    
    try {
      setLoading(true);  
      const res: any = await addBlog(values).unwrap();
      // console.log(res);
     
      if (res && res.data) {
        setLoading(false);
        toast("Blog created successfully", {
          icon: <span style={{ marginRight: -8, fontSize: 22 }}><TiTickOutline/></span>,
          style: {
            borderRadius: "10px",
            background: "#4f46e5",
            color: "#fff",
          },
          duration: 2000, 
        });
    
        
        setBlogImg(null);
        setImgPreview(null);
    
        
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err: any) {
      console.error(err);
  
      toast.error("Failed to create Blog", { 
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
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-[#2a2a3d] tracking-tight">
            Create Blog
          </h2>
          <p className="text-gray-500 mt-2">Fill in the details to create your service offering.</p>
        </div>
        <div className="relative">
          <div className="w-full">
            <Form submitHandler={onSubmit} >

              <div className=" mb-4">
                <FormInput name="title" label="Title" type="text" />
               
              </div>

              
           

              <div className="mb-4">
                <FormTextArea name="content" label="Content" rows={5} />
              </div>

              <div className="mb-4">
                <CategoryField name="categoryId" label="Category" />
              </div>
              
              <SingleImageUpload
                label="Upload Blog"
                imgPreview={imgPreview} 
                setImgPreview={setImgPreview} 
                onImageChange={setBlogImg}
              />

              <div className="flex mt-4">
                <button
                  type="button"
                  className="bg-white border text-black hover:text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-[#4f46e5] mr-3"
                >
                  Back
                </button>
                <button
  type="submit"
  className={`text-[#4f46e5] hover:text-white  hover:bg-[#4f46e5] inline-flex items-center justify-center px-4 py-2 rounded text-md border border-[#4f46e5] ${
    loading
      ? 'w-[150px] bg-[#4f46e5] text-white opacity-50 cursor-not-allowed inline-flex justify-center items-center'
      : ''
  }`}
  disabled={loading}
>
  {loading ? <Spinner /> : 'Create Blog'}
</button>

              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
