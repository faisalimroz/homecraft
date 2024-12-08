// ProfilePage.tsx
"use client";
import React, { useState } from "react";
import { FiEdit, FiLock, FiArrowLeftCircle, FiHome } from "react-icons/fi";
import { useLoggedUserQuery } from "@/redux/api/userApi";
import { Toaster } from "react-hot-toast";
import UpdateProfile from "./UpdateProfile";
import Loader from "@/components/UI/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfileImageUpload from "../../UI/ProfileImageUpload"; 

const ProfilePage = () => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [updatedImage, setUpdatedImage] = useState("");
  const { data, isLoading } = useLoggedUserQuery(undefined);

  const user = data?.data;

  const latestProfileImg = user?.profileImg?.slice(-1)[0] || null;

  if (isLoading) {
    return <Loader />;
  }

  const defaultValues = {
    fName: user?.fName || "",
    lName: user?.lName || "",
    email: user?.email || "",
    contactNo: user?.contactNo || "",
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
            <div className="flex space-x-4">
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

          <ProfileImageUpload
            userId={user?.id}
            currentImage={latestProfileImg}
            onImageUpdated={(url) => setUpdatedImage(url)}
            userRole={user?.role}
          />

          <div>
            {editMode ? (
              <UpdateProfile
                defaultValues={defaultValues}
                user={user}
                setEditMode={setEditMode}
              />
            ) : (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">{`${user?.fName} ${user?.lName}`}</h3>
                <p className="text-gray-500">{user?.email}</p>
                <p className="text-gray-500">{user?.contactNo}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-around">
            <button
              className="flex items-center text-indigo-600 hover:text-indigo-500"
              onClick={() => setEditMode(!editMode)}
            >
              <FiEdit className="mr-2" />
              Edit Profile
            </button>

          <Link href="/change-password">
          <button className="flex items-center text-indigo-600 hover:text-indigo-500">
              <FiLock className="mr-2" />
              Change Password
            </button>
          </Link>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
