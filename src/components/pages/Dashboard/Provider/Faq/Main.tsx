"use client"
import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { useDeleteFaqMutation, useFaqsQuery } from '@/redux/api/faqApi';
import CreateFaq from './CreateFaq/CreateFaq';
import UpdateFaq from './UpdateFaq/UpdateFaq';
import Loader from '@/components/UI/Loader';
import ConfirmModal from '@/components/UI/ConfirmModal';
import ItemsPerPageSelector from '@/components/UI/ItemsPerPageSelector';
import Pagination from '@/components/UI/Pagination';
import { ShowToast } from '@/components/UI/ShowToast';

const Main = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [selectedFaq, setSelectedFaq] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const { data, isLoading } = useFaqsQuery(undefined);
  const [deleteFaq] = useDeleteFaqMutation();
  const faqs = data?.data;

  const totalPages = Math.ceil((faqs?.length || 0) / itemsPerPage);
  const paginatedFaqs = faqs?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  if(isLoading){
    return <Loader/>
  }

  const handleDeleteClick = (faq:any) => {
    setSelectedFaq(faq);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedFaq(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedFaq) {
      try {
        const res =  await deleteFaq(selectedFaq.id).unwrap();
        if(res.data){
            ShowToast({
                message:res?.message
            })
        }
        setIsDeleteModalOpen(false);
        setSelectedFaq(null);
      } catch (error) {
        console.error("Failed to delete blog", error);
      }
    }
  };
  const togglePanel = (panelId: string) => {
    setActivePanel((prev) => (prev === panelId ? null : panelId));
  };

  const handleEdit = (faq: any) => {
    setSelectedFaq(faq); // Set the selected FAQ
    setShowUpdateModal(true); // Open the update modal
  };

  const getItems = () => {
    return paginatedFaqs?.map((faq: any) => (
      <div key={faq?.id} className="mb-4 border rounded-lg">
        <div
          className="flex  justify-between items-center p-4 cursor-pointer bg-gray-100"
          onClick={() => togglePanel(faq?.id)}
        >
          <span className="font-normal text-md">{faq?.question}</span>
          <div className="flex gap-4">
            <button
              className="text-indigo-600 hover:text-indigo-700 transform hover:scale-110 flex items-center justify-center text-md"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(faq); // Handle edit button click
              }}
            >
              <FaEdit />
            </button>
            <button
              className="text-red-600 hover:text-red-700 transform hover:scale-110 flex items-center justify-center text-md"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(faq)
                setSelectedFaq(faq);
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
        {activePanel === faq.id && <div className="p-4 text-base bg-white">{faq?.answer}</div>}
      </div>
    ));
  };

  return (
    <div className="px-6 py-7">
      {/* Toaster for notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Page Header */}
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-semibold text-[#2a2a3d]">Faq Listing</h2>
        <div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="text-[#4f46e5]  hover:bg-[#4f46e5] inline-flex items-center hover:text-white px-4 py-2 rounded text-md border border-[#4f46e5]"
          >
            Add Faq
          </button>
        </div>
      </div>

     
      <div className="space-y-4">{getItems()}</div>

      <CreateFaq show={showCreateModal} onClose={() => setShowCreateModal(false)} />
      <UpdateFaq show={showUpdateModal} onClose={() => setShowUpdateModal(false)} data={selectedFaq} />

      <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          message={`Are you sure you want to delete the blog "${selectedFaq?.question}"?`}
        />

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
    </div>
  );
};

export default Main;
