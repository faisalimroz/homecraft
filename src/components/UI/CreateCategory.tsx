import React, { useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import Form from '../Forms/Form';
import FormInput from '../Forms/FormInput';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { useAddCategoryMutation } from '@/redux/api/categoryApi';
import { TiDeleteOutline, TiTickOutline } from 'react-icons/ti';
import Spinner from './Spinner';

interface CreateCategoryFormProps {
  show: boolean;
  onClose: () => void;
}

interface CategoryImage {
  id: number;
  url: string;
}

const CreateCategory: React.FC<CreateCategoryFormProps> = ({ show, onClose }) => {
  const [categoryImg, setCategoryImg] = useState<CategoryImage | null>(null);
  const [categoryIcon, setCategoryIcon] = useState<CategoryImage | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [fileInputType, setFileInputType] = useState<'image' | 'icon'>('image');
  const [loading, setLoading] = useState<boolean>(false);

  const [addCategory] = useAddCategoryMutation();

  const onSubmit = async (values: any) => {
    if (categoryImg) {
      values.categoryImg = categoryImg.url;
    }
    if (categoryIcon) {
      values.categoryIcon = categoryIcon.url;
    }

    try {
      setLoading(true);
      const res: any = await addCategory(values).unwrap();
      // console.log(res);

      if (res && res.data) {
        setLoading(false);
        toast("Category created successfully", {
          icon: <span style={{ marginRight: -8, fontSize: 22 }}><TiTickOutline /></span>,
          style: {
            borderRadius: "10px",
            background: "#4f46e5",
            color: "#fff",
          },
          duration: 2000,
        });
        onClose();

        setCategoryImg(null);
        setImgPreview(null);
        setCategoryIcon(null);
        setIconPreview(null);

      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err: any) {
      console.error(err);

      toast.error("Failed to create category", {
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

  const handleClick = (type: 'image' | 'icon') => {
    setFileInputType(type);
    hiddenFileInput.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        const result = reader.result as string;
        const newImage = { id: Date.now(), url: result };

        if (fileInputType === 'image') {
          setCategoryImg(newImage);
          setImgPreview(result);
        } else {
          setCategoryIcon(newImage);
          setIconPreview(result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (type: 'image' | 'icon') => {
    if (type === 'image') {
      setCategoryImg(null);
      setImgPreview(null);
    } else {
      setCategoryIcon(null);
      setIconPreview(null);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Add New Category</h3>
            <button
              onClick={onClose}
              className="text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white rounded-full p-2 hover:bg-opacity-90 transition"
            >
              <FiX size={18} />
            </button>
          </div>
          <Form submitHandler={onSubmit}>
            <div className="mb-4">
            <FormInput
                name="categoryName"
               label="Category Name"
                type="text"
              />
            </div>

            <div className={`flex flex-col gap-1 w-full h-full rounded-md ${!imgPreview && `mb-4`}`}>
  <span className="mr-2 font-medium text-gray-500 text-sm">
    Upload Category Image
  </span>
  <button
    className="w-full rounded-md text-4xl lg:text-5xl md:mt-2 flex flex-col items-center justify-center text-gray-400 py-6 border border-dashed hover:text-[#1475c6] hover:border-[#1475c6] transition ease-in duration-300"
    onClick={() => handleClick('image')}
    type="button"
  >
    <IoCloudUploadOutline />
    <p className="text-xs mt-2 font-normal text-black">
      Support Formats: JPG, JPEG, PNG, SVG
    </p>
  </button>
  <input
    type="file"
    onChange={handleChange}
    ref={hiddenFileInput}
    style={{ display: "none" }}
  />
  {imgPreview && (
   <div className="relative mt-1 w-[60px] h-[60px]">
   <Image
     src={imgPreview}
     alt="Profile Image"
     height={60}
     width={80}
     className="rounded-md shadow-md"
   />
   <button
     type="button"
    //  onClick={handleRemoveImage}
     className="absolute top-0 right-0 p-1 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition ease-in duration-200"
     style={{ transform: "translate(50%, -50%)" }}
   >
     <TiDeleteOutline size={20} />
   </button>
 </div>
  )}
</div>


            <div className={`flex flex-col gap-1 w-full h-full rounded-md ${!iconPreview && `mb-4`}`}>
              <span className="mr-2 font-medium text-gray-500 text-sm">
                Upload Category Icon
              </span>
              <button
                className="w-full rounded-md text-4xl lg:text-5xl md:mt-2 flex flex-col items-center justify-center text-gray-400 py-6 border border-dashed hover:text-[#1475c6] hover:border-[#1475c6] transition ease-in duration-300"
                onClick={() => handleClick('icon')}
                type="button"
              >
                <IoCloudUploadOutline />
                <p className="text-xs mt-2 font-normal text-black">
                  Support Formats: JPG, JPEG, PNG, SVG
                </p>
              </button>
              <input
                type="file"
                onChange={handleChange}
                style={{ display: "none" }}
              />
              {iconPreview && (
                <div className="relative mt-1 w-[50px] h-[50px]">
                <Image
                  src={iconPreview}
                  alt="Profile Image"
                  height={50}
                  width={80}
                  className="rounded-md shadow-md"
                />
                <button
                  type="button"
                 //  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 p-1 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition ease-in duration-200"
                  style={{ transform: "translate(50%, -50%)" }}
                >
                  <TiDeleteOutline size={20} />
                </button>
              </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`text-[#4f46e5] hover:bg-[#4f46e5] hover:text-white inline-flex items-center justify-center px-4 py-2 rounded text-md border border-[#4f46e5] ${loading ? 'w-[150px] bg-[#4f46e5] text-white opacity-50 cursor-not-allowed inline-flex justify-center items-center' : ''}`}
                disabled={loading}
              >
                {loading ? <Spinner /> : 'Create Category'}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
