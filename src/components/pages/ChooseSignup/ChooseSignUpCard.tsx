import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ChooseSignUpCard = ({ data }: any) => {
  const { name, imageUrl, href } = data;
  
  
  return (
    <Link href={`${href}`}>
      <div className="flex flex-col items-center justify-center border border-2 hover:border-2 hover:border-indigo-600 font-medium text-lg rounded-xl p-8 bg-white w-full cursor-pointer">
        <h1 className="mb-6 text-gray-800 font-semibold text-lg">{name}</h1>
        <div className="relative w-32 h-16 mb-4 flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={name}
            className="rounded-full"
            width={100}
            height={100}
          />
        </div>

        <button className="text-indigo-600 border border-indigo-600 bg-white hover:bg-indigo-600 hover:text-white px-5 py-1 rounded-md font-normal text-[16px] mt-6 ">
          Sign Up
        </button>
      </div>
    </Link>
  );
};

export default ChooseSignUpCard;
