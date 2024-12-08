"use client";
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useServiceQuery, useUpdateServiceMutation } from '@/redux/api/servicesApi';
import { TiTickOutline } from 'react-icons/ti';
import CategoryField from '@/components/Forms/CategoryField';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormTextArea from '@/components/Forms/FormTextArea';
import Spinner from '@/components/UI/Spinner';
import serviceSchema from '@/schemas/service';
import { useRouter } from 'next/navigation';
import Loader from '@/components/UI/Loader';

type IDProps = {
  params: any;
};

const EditService = ({ params }: IDProps) => {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>(null);
  const [discount, setDiscount] = useState<number>(0); 
  const [discountedPrice, setDiscountedPrice] = useState<number>(0); 

  const { data: serviceData, isLoading: isFetching } = useServiceQuery(id as string);
  const [updateService] = useUpdateServiceMutation();

  useEffect(() => {
    if (serviceData) {
      setInitialValues({
        serviceName: serviceData?.data?.serviceName,
        regularPrice: serviceData?.data?.regularPrice,
        location: serviceData?.data?.location,
        duration: serviceData?.data?.duration,
        categoryId: serviceData?.data?.categoryId,
        description: serviceData?.data?.description,
        videoUrl: serviceData?.data?.videoUrl,
        keyFeature1: serviceData?.data?.keyFeature1,
        keyFeature2: serviceData?.data?.keyFeature2,
        keyFeature3: serviceData?.data?.keyFeature3,
        keyFeature4: serviceData?.data?.keyFeature4,
      });
    }
  }, [serviceData]);

  useEffect(() => {
    if (initialValues?.regularPrice) {
      // Calculate and update the discounted price whenever discount or regular price changes
      const calculatedDiscountedPrice = initialValues.regularPrice - (initialValues.regularPrice * discount) / 100;
      setDiscountedPrice(calculatedDiscountedPrice);
    }
  }, [discount, initialValues?.regularPrice]);

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);

      // Include the discounted price only if the discount is greater than 0
      const res = await updateService({
        id,
        body: discount > 0 ? { ...values, offeredPrice: discountedPrice } : values,
      });

      if (res) {
        setLoading(false);
        toast('Service Updated Successfully', {
          icon: <span style={{ marginRight: -8, fontSize: 22 }}><TiTickOutline /></span>,
          style: {
            borderRadius: '10px',
            background: '#4f46e5',
            color: '#fff',
          },
          duration: 2000,
        });

        // Redirect to the services list or detail page
        router.push('/provider/services');
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err: any) {
      // console.log(err, '64');
      toast.error(err?.data);
      setLoading(false);
    }
  };

  if (isFetching || !initialValues) {
    return <Loader />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold">
            Edit Service
          </h2>
          <p className="text-gray-500 mt-2">Update the details of your service offering.</p>
        </div>
        <div className="relative">
          <div className="w-full">
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(serviceSchema)}
              defaultValues={initialValues}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <FormInput name="serviceName" label="Service Name" type="text" />
                <FormInput
                  name="regularPrice"
                  label="Price"
                  type="number"
                  className="border border-gray-300 focus:border-[#1475c6] focus:ring-[#1475c6] transition ease-in duration-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <FormInput
                  name="location"
                  label="Location"
                  type="text"
                  className="border border-gray-300 focus:border-[#1475c6] focus:ring-[#1475c6] transition ease-in duration-200"
                />
                <FormInput
                  name="duration"
                  label="Duration"
                  type="text"
                  className="border border-gray-300 focus:border-[#1475c6] focus:ring-[#1475c6] transition ease-in duration-200"
                />
              </div>

              <div className="mb-8">
                <CategoryField name="categoryId" label="Category" />
              </div>

              <div className="mb-8">
                <FormTextArea name="description" label="Description" rows={5} />
              </div>

              <div className="mb-8">
                <FormInput
                  name="videoUrl"
                  label="Video URL (Optional*)"
                  type="url"
                  className="border border-gray-300 focus:border-[#1475c6] focus:ring-[#1475c6] transition ease-in duration-200"
                />
              </div>

              <h2 className="text-xl font-semibold text-[#2a2a3d] mb-8">
                Additional Features (optional*)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <FormInput name="keyFeature1" label="Key Feature 1" type="text" />
                <FormInput
                  name="keyFeature2"
                  label="Key Feature 2"
                  type="text"
                  className="border border-gray-300 focus:border-[#1475c6] focus:ring-[#1475c6] transition ease-in duration-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <FormInput name="keyFeature3" label="Key Feature 3" type="text" />
                <FormInput
                  name="keyFeature4"
                  label="Key Feature 4"
                  type="text"
                  className="border border-gray-300 focus:border-[#1475c6] focus:ring-[#1475c6] transition ease-in duration-200"
                />
              </div>

              <div className="mb-8">
                <label className="block text-black text-sm font-medium mb-1">Discount (%)</label>
                <select
                  className="block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#1475c6] focus:border-[#1475c6] transition ease-in duration-200 sm:text-sm"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                >
                  {Array.from({ length: 101 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}%
                    </option>
                  ))}
                </select>
              </div>

              {discount > 0 && (
                <div className="mb-8">
                  <label className="block text-black text-sm font-medium mb-1">Discounted Price</label>
                  <div className="py-3 px-4 border border-gray-300 bg-gray-100 rounded-md shadow-sm sm:text-sm">
                    ${discountedPrice.toFixed(2)}
                  </div>
                </div>
              )}

              <div className="flex">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="bg-white border text-black hover:text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-[#4f46e5] mr-3"
                >
                  Back
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
                  {loading ? <Spinner /> : 'Update Service'}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditService;
