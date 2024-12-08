import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import Spinner from '@/components/UI/Spinner';
import { useUpdateFaqMutation } from '@/redux/api/faqApi';
import { ShowToast } from '@/components/UI/ShowToast';
import FormTextArea from '@/components/Forms/FormTextArea';

interface UpdateFaqProps {
  show: boolean;
  onClose: () => void;
  data: any; // Add data prop to receive the FAQ object
}

const UpdateFaq: React.FC<UpdateFaqProps> = ({ show, onClose, data }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [updateFaq] = useUpdateFaqMutation();

  const [defaultValues, setDefaultValues] = useState({
    question: '',
    answer: '',
  });

  useEffect(() => {
    if (data) {
      setDefaultValues({
        question: data.question,
        answer: data.answer,
      });
    }
  }, [data]);

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res: any = await updateFaq({ id: data.id, body: values }).unwrap();

      if (res && res.data) {
        setLoading(false);
        ShowToast({
          message: 'Faq Updated Successfully',
        });
        onClose();
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err: any) {
      console.error(err);

      toast.error('Failed to update category', {
        style: {
          borderRadius: '10px',
          background: '#e74c3c',
          color: '#fff',
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
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold mb-4">Update Faq</h3>
            <button
              onClick={onClose}
              className="text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white rounded-full p-2 hover:bg-opacity-90 transition"
            >
              <FiX size={18} />
            </button>
          </div>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div className="mb-4">
              <FormInput name="question" label="Question" type="text" />
            </div>

            <div className="mb-4">
              <FormTextArea name="answer" label="Answer" rows={4} />
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
                className={`text-[#4f46e5] hover:bg-[#4f46e5] hover:text-white inline-flex items-center justify-center px-4 py-2 rounded text-md border border-[#4f46e5] ${
                  loading
                    ? 'w-[150px] bg-[#4f46e5] text-white opacity-50 cursor-not-allowed inline-flex justify-center items-center'
                    : ''
                }`}
                disabled={loading}
              >
                {loading ? <Spinner /> : 'Save Changes'}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateFaq;
