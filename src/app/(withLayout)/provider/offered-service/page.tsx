"use client";
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import CreateOffer from '@/components/UI/CreateOffer';
import UpdateOffer from '@/components/UI/UpdateOffer';
import { useOffersQuery } from '@/redux/api/offerApi';
import ItemsPerPageSelector from '@/components/UI/ItemsPerPageSelector';
import Pagination from '@/components/UI/Pagination';
import ConfirmModal from '@/components/UI/ConfirmModal';
import { useApplyOfferMutation, useDeleteOfferServiceMutation, useOfferServicesProviderQuery } from '@/redux/api/servicesApi';
import ApplyOfferModal from '@/components/UI/ApplyOfferModal';
import toast, { Toaster } from 'react-hot-toast';
import { TiTickOutline } from 'react-icons/ti';
import Loader from '@/components/UI/Loader';

const OfferServicePage = () => {
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [selectedOffer, setSelectedOffer] = useState<any>(null);
    const [offerToDelete, setOfferToDelete] = useState<any>(null);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

    const { data, isLoading, isError } = useOfferServicesProviderQuery(undefined);
    const [applyOffer] = useApplyOfferMutation();
    const [deleteOfferService] = useDeleteOfferServiceMutation();
    const { data: offersData, isLoading: isOffersLoading } = useOffersQuery(undefined);
    const offers = data?.data;

    const totalPages = Math.ceil((offers?.length || 0) / itemsPerPage);
    const paginatedOffers = offers?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const formatDate = (dateString: string) => {
        const options: any = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleApplyOfferClick = (service: any) => {
        setSelectedService(service);
        setIsOfferModalOpen(true);
      };

      const handleCloseOfferModal = () => {
        setIsOfferModalOpen(false);
        setSelectedOffer(null);
      };

      const handleOfferSelect = (offer: any) => {
        setSelectedOffer(offer);
      }

      const handleApplyOffer = async () => {
        if (!selectedService || !selectedOffer) return;
      
        try {
          const res =  await applyOffer({id: selectedService.id, body: { offerId: selectedOffer.id}}).unwrap();
          if(res?.data) {
            toast('Offer Applied Successfully', {
              icon: <span style={{ marginRight: -8, fontSize: 22 }}><TiTickOutline /></span>,
              style: {
                borderRadius: '10px',
                background: '#4f46e5',
                color: '#fff',
              },
              duration: 2000,
            });
          }
          setIsOfferModalOpen(false);
          setSelectedOffer(null);
        } catch (error:any) {
          toast.error(error?.data);
        }
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
            await deleteOfferService(offerToDelete.id);
            setShowConfirmModal(false);
            setOfferToDelete(null);
        }
    };

    if (isLoading) return <Loader/>;
    if (isError) return <div>Error loading offers.</div>;

    return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
        <div className="px-6 py-7">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-[#2a2a3d]">Offer Listing</h2>
            </div>

            {/* Conditional rendering based on paginatedOffers length */}
            {paginatedOffers && paginatedOffers.length > 0 ? (
                <div className="rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-md">
                            <thead className="text-gray-600 uppercase text-sm">
                                <tr className='border-b border-gray-200'>
                                    <th className="py-4 px-6 text-left">Service Name</th>
                                    <th className="py-4 px-6 text-left"> Amount</th>
                                    <th className="py-4 px-6 text-left">Offer Price</th>
                                    <th className="py-4 px-6 text-left">Offer Name</th>
                                    <th className="py-4 px-6 text-left">Start Date</th>
                                    <th className="py-4 px-6 text-left">End Date</th>
                                    <th className="py-4 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {paginatedOffers?.map((offer: any) => (
                                    <tr key={offer.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-4 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="font-medium">{offer.serviceName}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-left">
                                            <span>${offer.regularPrice}</span>
                                        </td>
                                        <td className="py-4 px-6 text-left">
                                            <span>${offer.offeredPrice}</span>
                                        </td>
                                        <td className="py-4 px-6 text-left">
                                            <span>{offer.offer?.offerName}({offer.offer?.discount}%)</span>
                                        </td>
                                        <td className="py-4 px-6 text-left">
                                            <span>{formatDate(offer.offer?.startDate)}</span>
                                        </td>
                                        <td className="py-4 px-6 text-left">
                                            <span>{formatDate(offer.offer?.endDate)}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center space-x-2">
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-700 transform hover:scale-110"
                                                    onClick={() => handleApplyOfferClick(offer)}
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
            ) : (
                <div className="text-center text-gray-600 text-sm py-10">
                    No offers available at the moment.
                </div>
            )}

            <ApplyOfferModal
                isOpen={isOfferModalOpen}
                onClose={handleCloseOfferModal}
                onApply={handleApplyOffer}
                offers={offersData?.data || []}
                selectedOffer={selectedOffer}
                onSelectOffer={handleOfferSelect}
            />

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
                message={`Are you sure you want to delete the offer "${offerToDelete?.serviceName}"?`}
            />

{paginatedOffers.length > 0 && (
            <div className="flex items-center justify-end mt-10">
                <ItemsPerPageSelector itemsPerPage={itemsPerPage} onItemsPerPageChange={handleItemsPerPageChange} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
)}
        </div>
    </>
    );
};

export default OfferServicePage;
