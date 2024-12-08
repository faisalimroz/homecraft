// ComboPackCard.js
import React from 'react';
import Image from 'next/image';
import { FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoggedUserQuery } from '@/redux/api/userApi';
import { useAddComboBookingMutation } from '@/redux/api/bookingApi';
import toast, { Toaster } from 'react-hot-toast';

interface ComboPackCardProps {
  id: string; // Ensure this prop is of type string and required
  name: string;
  services: string[];
  providerImage: string;
  providerName: string;
  providerInfo: string;
  amount: number;
 
}

const ComboPackCard: React.FC<ComboPackCardProps> = ({
  id,
  name,
  services,
  providerImage,
  providerName,
  providerInfo,
  amount }) => {
    const {push} = useRouter();
    const [addComboBooking] = useAddComboBookingMutation();
    const {data} = useLoggedUserQuery(undefined);
    const user = data?.data;

    

    const handleComboBooking = async () => {
      try {
        // Check if the user is not logged in
        if (!user) {
          toast.error('Please log in to proceed with the booking.');
          return;
        }
    
        // Check if the user role is Admin or Provider
        if (user?.role === 'Admin' || user?.role === 'Provider') {
          toast.error('This functionality is only available for Users.');
          return;
        }
    
        // Proceed with booking if the user is a regular User
        const res = await addComboBooking({ comboId: id, userId: user?.id }).unwrap();
    
        if (res?.data) {
          push(`/combo-checkout/${res?.data?.id}`);
        }
      } catch (error) {
        console.error('Error booking appointment:', error);
        toast.error('Something went wrong while booking. Please try again.');
      }
    };
    

  return (
   <>
     <Toaster position="top-center" reverseOrder={false} />
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-auto">
     
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{name} </h3>
      
     
      <div className="flex justify-center items-center mb-6 p-3">
        <div className="bg-indigo-600 text-white font-semibold text-xl w-16 h-16 flex items-center justify-center rounded-full shadow-sm">
          ${amount || 23}
        </div>
      </div>

     
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <Image src={providerImage} alt={`${providerName} Image`} width={64} height={64} />
        </div>
        <div>
          <h4 className="text-xl font-semibold">{providerName}</h4>
          <p className="text-gray-600 text-sm">{providerInfo}</p>
        </div>
      </div>

     
      <div className="mt-4">
        <h4 className="text-xl font-semibold">Services Included:</h4>
        <ul className="list-disc list-inside mt-2 space-y-2">
          {services.map((service, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <FiCheck className="mr-2 text-indigo-600" />
              {service}
            </li>
          ))}
        </ul>
      </div>

      
      <div className="mt-6 text-center">
       <button onClick={handleComboBooking} className="text-indigo-600 bg-white border border-indigo-600 px-6 py-3 rounded-md shadow hover:bg-indigo-700 hover:text-white transition duration-300">
          Book Now
        </button>
      </div>
    </div>
   </>
  );
};

export default ComboPackCard;
