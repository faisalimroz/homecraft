// ProfileImageUpload.tsx
"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useUpdateUserMutation } from "@/redux/api/userApi"; // Make sure to import both mutations
import toast from "react-hot-toast";
import { ShowToast } from "@/components/UI/ShowToast";
import Camera from "../../../public/assets/photo.png";
import { useUpdateProviderMutation } from "@/redux/api/providerApi";

interface ProfileImageUploadProps {
  userId: string;
  currentImage: string | null;
  onImageUpdated: (imageUrl: string) => void;
  userRole: "User" | "Provider" | "Admin"; // Added userRole prop to identify the role
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  userId,
  currentImage,
  onImageUpdated,
  userRole,
}) => {
  const [updatedImage, setUpdatedImage] = useState<string | null>(currentImage);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  
  // Conditional mutation based on user role
  const [updateUser] = userRole === "Provider" || userRole === "Admin"
    ? useUpdateProviderMutation() // Use Provider mutation for Provider and Admin roles
    : useUpdateUserMutation(); // Use User mutation for regular Users

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        const imageUrl = reader.result as string;
        setUpdatedImage(imageUrl);
        await updateUserImage(imageUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const updateUserImage = async (imageUrl: string) => {
    if (!imageUrl) return;

    const toastId = toast.loading("Uploading image...");
    try {
      await updateUser({
        id: userId,
        body: { profileImg: imageUrl },
      });
      onImageUpdated(imageUrl); // Callback to update the image in the parent component
      ShowToast({ message: "Photo Updated Successfully" });
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Failed to upload image. Please try again.", {
        id: toastId,
      });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <div className="relative w-[140px] h-[140px] rounded-full border-4 border-indigo-600">
        <div
          className={`w-full h-full bg-cover bg-center rounded-full`}
          style={{
            backgroundImage: `url(${updatedImage || currentImage})`,
          }}
        ></div>

        <input
          accept="image/*"
          type="file"
          onChange={handleChange}
          ref={hiddenFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="absolute top-2 right-2 z-10 cursor-pointer" onClick={handleClick}>
          <Image src={Camera} alt="camera" height={30} width={30} />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
