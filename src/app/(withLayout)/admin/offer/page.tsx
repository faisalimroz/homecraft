"use client";
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import CreateOffer from '@/components/UI/CreateOffer';
import UpdateOffer from '@/components/UI/UpdateOffer';
import { useOffersQuery, useDeleteOfferMutation } from '@/redux/api/offerApi';
import ItemsPerPageSelector from '@/components/UI/ItemsPerPageSelector';
import Pagination from '@/components/UI/Pagination';
import ConfirmModal from '@/components/UI/ConfirmModal';
import Loader from '@/components/UI/Loader';

const OfferPage = () => {
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [selectedOffer, setSelectedOffer] = useState<any>(null);
    const [offerToDelete, setOfferToDelete] = useState<any>(null);

    const { data, isLoading, isError } = useOffersQuery(undefined);
    const [deleteOffer] = useDeleteOfferMutation();
    const offers = data?.data;

    const totalPages = Math.ceil((offers?.length || 0) / itemsPerPage);
    const paginatedOffers = offers?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const formatDate = (dateString: any) => {
        const options: any = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleEditClick = (offer: any) => {
        setSelectedOffer(offer);
        setShowEditModal(true);
    };

    const handleDeleteClick = (offer: any) => {
        setOfferToDelete(offer);
        setShowConfirmModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowConfirmModal(false);
        setOfferToDelete(null);
    };

    const handleDeleteConfirm = async () => {
        if (offerToDelete) {
            await deleteOffer(offerToDelete.id);
            setShowConfirmModal(false);
            setOfferToDelete(null);
        }
    };

    if (isLoading) return <Loader/>;
    if (isError) return <div>Error loading offers.</div>;

    return (
        <div className="px-6 py-7">
            <div className="flex justify-between mb-8">
                <h2 className="text-2xl font-semibold text-[#2a2a3d]">Offer Listing</h2>
                <div>
                    <button
                        className="text-[#4f46e5] hover:bg-[#4f46e5] inline-flex items-center hover:text-white px-4 py-2 rounded text-md border border-[#4f46e5]"
                        onClick={() => setShowCreateModal(true)}
                    >
                        Add Offer
                    </button>
                </div>
            </div>

            {/* Only show the table and pagination if there are offers */}
            {offers && offers.length > 0 ? (
                <>
                    <div className="rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-md">
                                <thead className="text-gray-600 uppercase text-md">
                                    <tr className='border-b border-gray-200'>
                                        <th className="py-4 px-6 text-left">Offer Name</th>
                                        <th className="py-4 px-6 text-left">Start Date</th>
                                        <th className="py-4 px-6 text-left">End Date</th>
                                        <th className="py-4 px-6 text-left">Discount</th>
                                        <th className="py-4 px-6 text-left">Status</th>
                                        <th className="py-4 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-md font-light">
                                    {paginatedOffers?.map((offer: any) => (
                                        <tr key={offer.id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-4 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="font-medium">{offer.offerName}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-left">
                                                <span>{formatDate(offer.startDate)}</span>
                                            </td>
                                            <td className="py-4 px-6 text-left">
                                                <span>{formatDate(offer.endDate)}</span>
                                            </td>
                                            <td className="py-4 px-6 text-left">
                                                <span>{offer.discount}%</span>
                                            </td>
                                            <td className="py-4 px-6 text-left">
                                                <span
                                                    className={`py-1 px-3 rounded-full text-xs ${
                                                        offer.status === 'Active'
                                                            ? 'bg-green-200 text-green-600'
                                                            : 'bg-red-200 text-red-600'
                                                    }`}
                                                >
                                                    {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center space-x-2">
                                                    <button
                                                        className="text-blue-500 hover:text-blue-700 transform hover:scale-110"
                                                        onClick={() => handleEditClick(offer)}
                                                    >
                                                        <FaEdit size={16} />
                                                    </button>
                                                    <button
                                                        className="text-red-500 hover:text-red-700 transform hover:scale-110"
                                                        onClick={() => handleDeleteClick(offer)}
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

                    {/* Pagination and Items Per Page */}
                    <div className="flex items-center justify-end mt-10">
                        <ItemsPerPageSelector
                            itemsPerPage={itemsPerPage}
                            onItemsPerPageChange={handleItemsPerPageChange}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500 mt-6">No offers available.</div>
            )}

            {/* Create Offer Modal */}
            <CreateOffer
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            />

            {/* Update Offer Modal */}
            <UpdateOffer
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                offer={selectedOffer}
            />

            {/* Confirm Delete Modal */}
            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDeleteConfirm}
                message={`Are you sure you want to delete the offer "${offerToDelete?.offerName}"?`}
            />
        </div>
    );
};

export default OfferPage;
