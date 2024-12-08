"use client";
import React, { useState } from 'react';
import {  FaTrash } from 'react-icons/fa';
import ItemsPerPageSelector from '@/components/UI/ItemsPerPageSelector';
import Pagination from '@/components/UI/Pagination';
import ConfirmModal from '@/components/UI/ConfirmModal';
import { useDeleteUserMutation, useUsersQuery } from '@/redux/api/userApi';
import Loader from '@/components/UI/Loader';

const UserPage = () => {
 
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [userToDelete, setUserToDelete] = useState<any>(null);

    const { data, isLoading, isError }:any = useUsersQuery(undefined);
    const [deleteUser] = useDeleteUserMutation();
    const users = data?.data;
   

    const totalPages = Math.ceil((users?.length || 0) / itemsPerPage);
    const paginatedUsers = users?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const formatDate = (dateString: any) => {
        const options: any = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

 

    const handleDeleteClick = (user: any) => {
        setUserToDelete(user);
        setShowConfirmModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowConfirmModal(false);
        setUserToDelete(null);
    };

    const handleDeleteConfirm = async () => {
        if (userToDelete) {
            await deleteUser(userToDelete?.id);
            setShowConfirmModal(false);
            setUserToDelete(null);
        }
    };

    if (isLoading) return <Loader/>;
    if (isError) return <div>Error loading offers.</div>;

    return (
        <div className="px-6 py-7">
            <div className="flex justify-between mb-8">
                <h2 className="text-2xl font-semibold text-[#2a2a3d]">User Listing</h2>

            </div>

            {/* Only show the table and pagination if there are offers */}
            {users && users.length > 0 ? (
                <>
                    <div className="rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-md">
                                <thead className="text-gray-600 uppercase text-md">
                                    <tr className='border-b border-gray-200'>
                                        <th className="py-4 px-6 text-left">Name</th>
                                        <th className="py-4 px-6 text-left">Email</th>
                                        <th className="py-4 px-6 text-left">Phone</th>
                                        <th className="py-4 px-6 text-left">Date of Join</th>
                                        <th className="py-4 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-md font-light">
                                    {paginatedUsers?.map((user: any) => (
                                        <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                             <td className="py-4 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <img
                                                        className="w-8 h-8 rounded-full mr-3"
                                                        src={user.profileImg[0]}
                                                        alt={`${user.fName} ${user.lName}`}
                                                    />
                                                    <span className="font-medium">{`${user.fName} ${user.lName}`}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-left">
                                                <span>{user?.email}</span>
                                            </td>
                                            <td className="py-4 px-6 text-left">
                                                <span>{user?.contactNo}</span>
                                            </td>
                                           
                                            <td className="py-4 px-6 text-left">
                                                <span>{formatDate(user.createdAt)}</span>
                                            </td>
                                           
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center space-x-2">
                                              
                                                    <button
                                                        className="text-red-500 hover:text-red-700 transform hover:scale-110"
                                                        onClick={() => handleDeleteClick(user)}
                                                    >
                                                        <FaTrash size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                  { users.length > 0 &&      <div className="flex items-center justify-end mt-10">
                        <ItemsPerPageSelector
                            itemsPerPage={itemsPerPage}
                            onItemsPerPageChange={handleItemsPerPageChange}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div> }
               
                </>
            ) : (
                <div className="text-center text-gray-500 mt-6">No users available.</div>
            )}

            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDeleteConfirm}
                message={`Are you sure you want to delete the offer "${userToDelete?.fName} ${userToDelete?.lName}"?`}
            />
        </div>
    );
};

export default UserPage;
