"use client";
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import CreateCombo from './CreateCombo/CreateCombo';
import { useCombosForProviderQuery } from '@/redux/api/comboPackApi';
import ComboPackCard from './ComboCard/ComboCard';
import Loader from '@/components/UI/Loader';
import ItemsPerPageSelector from '@/components/UI/ItemsPerPageSelector';
import Pagination from '@/components/UI/Pagination';

const Main = () => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("Basic"); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const { data, isLoading } = useCombosForProviderQuery(undefined);
  const combos = data?.data;

  
  const filteredCombos = combos?.filter((combo:any) => combo.plan === activeTab);

  const totalPages = Math.ceil((filteredCombos?.length || 0) / itemsPerPage);
  const paginatedCombos = filteredCombos?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Reset pagination when active tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Show loader while fetching data
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mx-auto px-6 bg-white py-7">
        {/* Header Section */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-[#2a2a3d] mb-6">Combo Pack</h2>
          <div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-[#4f46e5] hover:bg-[#4f46e5] inline-flex items-center hover:text-white px-4 py-2 rounded text-md border border-[#4f46e5]"
            >
              Add Combo
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          {["Basic", "Standard", "Premium"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${
                activeTab === tab ? "bg-[#4f46e5] text-white" : "bg-white text-blue-600"
              } border ${tab === "Basic" ? "rounded-l-md" : ""} ${tab === "Premium" ? "rounded-r-md" : ""} ml-2`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* No Data Message */}
        {filteredCombos?.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-500">
            No combo packs available for the selected plan.
          </div>
        ) : (
          <>
            {/* Combo Packs List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedCombos?.map((pack: any, index: number) => (
                <ComboPackCard
                  key={index}
                  id={pack?.id}
                  name={pack?.name}
                  services={pack?.services}
                  providerImage={pack?.providerImage}
                  providerName={pack?.providerName}
                  providerInfo={pack?.providerInfo}
                  amount={pack?.amount}
                />
              ))}
            </div>

            {/* Pagination and Items Per Page Selector */}
            {filteredCombos?.length > 0 && (
              <div className="flex items-center justify-end mt-10">
                <ItemsPerPageSelector itemsPerPage={itemsPerPage} onItemsPerPageChange={handleItemsPerPageChange} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </>
        )}

        {/* Create Combo Modal */}
        <CreateCombo show={showCreateModal} onClose={() => setShowCreateModal(false)} />
      </div>
    </>
  );
};

export default Main;
