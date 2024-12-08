"use client"
import React, { useState } from 'react';
import CreateCategory from '@/components/UI/CreateCategory';
import ItemsPerPageSelector from '@/components/UI/ItemsPerPageSelector';
import Loader from '@/components/UI/Loader';
import Pagination from '@/components/UI/Pagination';
import UpdateCategory from '@/components/UI/UpdateCategory';
import ConfirmModal from '@/components/UI/ConfirmModal';
import { useCategoriesQuery, useDeleteCategoryMutation } from '@/redux/api/categoryApi';
import { Toaster } from 'react-hot-toast';
import { FiEdit, FiTrash } from 'react-icons/fi';

const ProviderCategory: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading }: any = useCategoriesQuery(undefined);
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = data?.data || [];
  const totalPages = Math.ceil((data?.meta?.total || 0) / itemsPerPage);

  const paginatedCategories = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setShowUpdateModal(true);
  };

  const handleDelete = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedCategory) {
      try {
        await deleteCategory(selectedCategory.id).unwrap();
        handleCloseDeleteModal();
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="px-6 py-7">
        <div className="flex justify-between mb-8">
          <h2 className="text-2xl font-semibold text-[#2a2a3d]">Category Listing</h2>
          <div>
            <button
              className="text-[#4f46e5] hover:bg-[#4f46e5] inline-flex items-center hover:text-white px-4 py-2 rounded text-md border border-[#4f46e5]"
              onClick={() => setShowCreateModal(true)}
            >
              Add Category
            </button>
          </div>
        </div>

        {paginatedCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {paginatedCategories.map((category: any) => (
              <div key={category.id} className="relative rounded flex items-center justify-center overflow-hidden group bg-white p-2">
                <div className="relative rounded-lg overflow-hidden border hover:shadow-md transition-shadow duration-300 w-full">
                  <div className="block image-wrapper">
                    <img
                      src={category.categoryImg}
                      alt={category.categoryName}
                      className="w-full h-[250px] object-cover transition-transform duration-300 ease-in-out"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <a href="#" className="rounded transition flex flex-col items-center justify-center text-center">
                        <span className="inline-block p-2 bg-gray-100 rounded-full mr-2">
                          <img src={category.categoryIcon} alt="icon" className="w-6 h-6" />
                        </span>
                      </a>
                      <div className="ml-1">
                        <h5 className="text-md font-bold text-gray-800">{category.categoryName}</h5>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(category)}>
                        <FiEdit size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(category)}>
                        <FiTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-6">
            No categories available.
          </div>
        )}

        {paginatedCategories.length > 0 && (
          <div className="flex items-center justify-end mt-10">
            <ItemsPerPageSelector itemsPerPage={itemsPerPage} onItemsPerPageChange={handleItemsPerPageChange} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}

        <CreateCategory show={showCreateModal} onClose={() => setShowCreateModal(false)} />

        {selectedCategory && (
          <UpdateCategory
            show={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            category={selectedCategory}
          />
        )}

        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          message={`Are you sure you want to delete the category "${selectedCategory?.categoryName}"?`}
        />
      </div>
    </>
  );
};

export default ProviderCategory;
