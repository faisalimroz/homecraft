"use client"
import { removeFavourite } from '@/redux/features/favouritesSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiArrowLeftCircle, FiHome } from 'react-icons/fi';

const Favourites = () => {
  const router = useRouter();
  const favouriteServices = useAppSelector(
    (state: any) => state.favourites.favouriteServices
  );
  const dispatch = useAppDispatch();
  
  return (
  <>
  
    <div className="py-10 md:py-16 px-6 md:px-[6rem]">
        <div className='flex justify-between'>
            <div><h1 className="text-3xl font-bold text-gray-800 mb-6">Your Favourite Services</h1></div>
      
         <div>
         <div className="flex justify-end">
      <div className="flex space-x-4 py-2">
        <Link href="/">
          <button className="text-gray-500 hover:text-blue-500">
            <FiHome className="h-6 w-6" />
          </button>
        </Link>
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-blue-500"
        >
          <FiArrowLeftCircle className="h-6 w-6" />
        </button>
      </div>
        
      </div>
         </div>
        </div>
   
      <div className="flex-grow space-y-4">
        {favouriteServices.length > 0 ? (
          favouriteServices.map((service: any) => (
            <div
              className="flex items-center justify-between bg-white border rounded-lg  hover:shadow-lg transition-shadow duration-300 ease-in-out p-4"
              key={service.id}
            >
              <Link href={`service-details/${service.id}`} className="flex items-center space-x-4">
                <Image
                  src={service.serviceImg[service.serviceImg.length - 1] || "/default-image.jpg"}
                  alt={service.serviceName}
                  width={100}
                  height={100}
                  className="w-[100px] h-[60px] rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 hover:text-indigo-600">{service.serviceName}</h3>
                  <p className="text-sm text-gray-500">${service.regularPrice}</p>
                </div>
              </Link>
              <button
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
                onClick={() => dispatch(removeFavourite(service.id))}
              >
                <FaTimes size={20} />
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-800 font-medium text-lg">No favorite services yet.</p>
            <p className="text-gray-600 font-normal text-sm">Add your favourite services and they will appear here.</p>
          </div>
        )}
      </div>
    </div>
  </>
  );
};

export default Favourites;
