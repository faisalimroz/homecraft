import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { TiTickOutline } from 'react-icons/ti';
import Spinner from './Spinner';
import Form from '../Forms/Form';
import FormInput from '../Forms/FormInput';
import FormDatePicker from '../Forms/FormDatePicker';
import dayjs from 'dayjs';
import { useAddOfferMutation } from '@/redux/api/offerApi';
import offerSchema from '@/schemas/offer';
import { yupResolver } from '@hookform/resolvers/yup';

interface CreateOfferFormProps {
  show: boolean;
  onClose: () => void;
}

const CreateOffer: React.FC<CreateOfferFormProps> = ({ show, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(1); // Start with 1%

  const today = dayjs().format('YYYY-MM-DD');
  const [addOffer] = useAddOfferMutation();

  const onSubmit = async (values: any) => {
    values.discount = discount;
  
    // Ensure dates are in ISO 8601 format
    values.startDate = dayjs(values.startDate).startOf('day').toISOString();
    values.endDate = dayjs(values.endDate).endOf('day').toISOString(); // End of the day
  
    // console.log(values, '27');
  
    try {
      setLoading(true);
      const res: any = await addOffer(values).unwrap();
      // console.log(res);
  
      if (res && res.data) {
        setLoading(false);
        toast.success("Offer created successfully", {
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
  
        onClose();
        setDiscount(1);
      }
    } catch (err: any) {
      console.error(err);
  
      toast.error("Failed to create offer", {
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
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Add New Offer</h3>
            <button
              onClick={onClose}
              className="bg-[#4f46e5] text-white rounded-full p-2 hover:bg-opacity-90 transition"
            >
              <FiX size={18} />
            </button>
          </div>
          <Form submitHandler={onSubmit} resolver={yupResolver(offerSchema)}>
            <div className="mb-4">
              <FormInput
                name="offerName"
                label="Offer Name"
                type="text"
              />
            </div>
            <div className="mb-4">
              <FormDatePicker
                name="startDate"
                label="Start Date"
                minDate={today}
              />
            </div>
            <div className="mb-4">
              <FormDatePicker
                name="endDate"
                label="End Date"
                minDate={today}
              />
            </div>
            <div className="mb-4">
              <div className="mb-8">
                <label className="block text-black text-sm font-medium mb-1">
                  Discount (%)
                </label>
                <select
                  className="block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#1475c6] focus:border-[#1475c6] transition ease-in duration-200 sm:text-sm"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                >
                  {/* Generate options using a for loop */}
                  {(() => {
                    const options = [];
                    for (let i = 1; i <= 100; i++) {
                      options.push(
                        <option key={i} value={i}>
                          {i}%
                        </option>
                      );
                    }
                    return options;
                  })()}
                </select>
              </div>
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
                {loading ? <Spinner /> : 'Create Offer'}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateOffer;
