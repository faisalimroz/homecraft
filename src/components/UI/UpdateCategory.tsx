import React, { useState, useRef, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import Form from '../Forms/Form';
import FormInput from '../Forms/FormInput';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { useUpdateCategoryMutation } from '@/redux/api/categoryApi';
import { TiDeleteOutline, TiTickOutline } from 'react-icons/ti';
import Spinner from './Spinner';

interface UpdateCategoryFormProps {
  show: boolean;
  onClose: () => void;
  category: {
    id: string;
    categoryName: string;
    categoryIcon: string;
    categoryImg: string;
  } | null;
}

const UpdateCategory: React.FC<UpdateCategoryFormProps> = ({ show, onClose, category }) => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      setCategoryName(category.categoryName);
    }
  }, [category]);

  const onSubmit = async (values: any) => {
    // console.log(values)
    try {
      setLoading(true);
      const res: any = await updateCategory({ id: category?.id, body:{...values} }).unwrap();
      
      if (res && res.data) {
        toast("Category updated successfully", {
          icon: <span style={{ marginRight: -8, fontSize: 22 }}><TiTickOutline /></span>,
          style: {
            borderRadius: "10px",
            background: "#4f46e5",
            color: "#fff",
          },
          duration: 2000,
        });
        onClose();
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err: any) {
      console.error(err);

      toast.error("Failed to update category", {
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
  const defaultValues = {
    categoryName: categoryName || ''
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold mb-6">Update Category</h3>
            <button
              onClick={onClose}
              className="bg-[#4f46e5] text-white rounded-full p-2 hover:bg-opacity-90 transition"
            >
              <FiX size={18} />
            </button>
          </div>
          <Form submitHandler={onSubmit}    defaultValues={defaultValues}>
            <div className="mb-4">
              <FormInput
                name="categoryName"
                label="Category Name"
                type="text"
              />
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
                {loading ? <Spinner /> : 'Update Category'}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
