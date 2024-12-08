import React, { useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import Form from '../Forms/Form';
import FormInput from '../Forms/FormInput';
import toast, { Toaster } from 'react-hot-toast';
import { TiTickOutline } from 'react-icons/ti';
import { useAddBlogMutation } from '@/redux/api/blogApi';
import FormTextArea from '../Forms/FormTextArea';
import CategoryField from '../Forms/CategoryField';
import SingleImageUpload from './SingleImageUpload';
import Spinner from './Spinner';


interface CreateBlogFormProps {
  show: boolean;
  onClose: () => void;
}

interface BlogImage {
  id: number;
  url: string;
}

const CreateBlog: React.FC<CreateBlogFormProps> = ({ show, onClose }) => {
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
        onClose();
        
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
  
  
  
  if (!show) return null;



  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Add New Blog</h3>
            <button
              onClick={onClose}
              className="bg-[#4f46e5] text-white rounded-full p-2 hover:bg-opacity-90 transition"
            >
              <FiX size={18} />
            </button>
          </div>
          <Form submitHandler={onSubmit}>
            <div className="mb-4">
              <FormInput
                name="title"
                label="Title"
                type="text"
              />
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
         
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 bg-[#4f46e5] text-white rounded-md hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? <Spinner/> : 'Create Blog'}
              </button>
            </div>
          </Form>
        </div>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
            <div className="w-16 h-16 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateBlog;
