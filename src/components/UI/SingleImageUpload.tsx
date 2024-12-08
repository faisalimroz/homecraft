"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import { FaSpinner } from "react-icons/fa";

interface ImageUploadProps {
  onImageChange: (image: { id: number; url: string } | null) => void;
  label?: string;
  imgPreview: string | null; // Add imgPreview prop
  setImgPreview: React.Dispatch<React.SetStateAction<string | null>>; // Add setImgPreview prop
}

const SingleImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, label, imgPreview, setImgPreview }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        const result = reader.result as string;
        const newImage = { id: Date.now(), url: result };

        setImgPreview(result); // Update the preview image state
        onImageChange(newImage);
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImgPreview(null); // Clear the preview image state
    onImageChange(null);
  };

  return (
    <div className="flex flex-col gap-1 w-full h-full  rounded-md">
      {label && (
        <span className="mr-2 block text-black text-sm font-medium mb-1 ">
          {label}
        </span>
      )}
      <button
        className="w-full rounded-md text-4xl lg:text-5xl md:mt-2 flex flex-col items-center justify-center text-gray-400 py-10 border border-dashed hover:text-[#1475c6] hover:border-[#1475c6] transition ease-in duration-300"
        onClick={handleClick}
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
      {loading && (
        <div className="flex justify-center items-center mt-2 w-[100px] h-[100px]">
          <FaSpinner className="animate-spin text-gray-400" size={24} />
        </div>
      )}
      {imgPreview && !loading && (
        <div className="relative mt-2 w-[100px] h-[60px]">
          <Image
            src={imgPreview}
            alt="Profile Image"
            height={60}
            width={100}
            className="rounded-md shadow-md"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 p-1 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition ease-in duration-200"
            style={{ transform: "translate(50%, -50%)" }}
          >
            <TiDeleteOutline size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleImageUpload;
