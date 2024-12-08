"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiEdit, FiMapPin, FiTrash } from "react-icons/fi";
import {
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useApplyOfferMutation,
  useProviderServicesQuery,
} from "@/redux/api/servicesApi";
import Link from "next/link";
import StatusModal from "@/components/UI/StatusModal";
import ConfirmModal from "@/components/UI/ConfirmModal";
import Loader from "@/components/UI/Loader";
import { MdOutlineChangeCircle } from "react-icons/md";
import ItemsPerPageSelector from "@/components/UI/ItemsPerPageSelector";
import Pagination from "@/components/UI/Pagination";
import { useOffersQuery } from "@/redux/api/offerApi";
import ApplyOfferModal from "@/components/UI/ApplyOfferModal";
import { TiTickOutline } from "react-icons/ti";
import toast, { Toaster } from "react-hot-toast";
import { ShowToast } from "@/components/UI/ShowToast";

const Services = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  // const { data, isLoading } = useServicesQuery(undefined);
  const { data, isLoading } = useProviderServicesQuery(undefined);
  const { data: offersData, isLoading: isOffersLoading } =
    useOffersQuery(undefined);
  const [applyOffer] = useApplyOfferMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const services = data?.data || [];
  const filteredServices = services?.filter(
    (service: any) => service.status === activeTab
  );

  const totalPages = Math.ceil((data?.meta?.total || 0) / itemsPerPage);
  const paginatedServices = filteredServices?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleStatusClick = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (service: any) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedService(null);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedService) return;

    // Determine the updated status
    const updatedStatus =
      selectedService.status === "Active" ? "Inactive" : "Active";

    try {
      const res = await updateService({
        id: selectedService.id,
        body: { status: updatedStatus },
      }).unwrap();
      if(res.data){
        ShowToast({
          message:'Status Updated Successfully'
        })
        setIsModalOpen(false);
        setSelectedService(null);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedService) return;

    try {
      await deleteService(selectedService.id).unwrap();
      // console.log("Service deleted");
      setIsDeleteModalOpen(false);
      setSelectedService(null);
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
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
  };

  const handleApplyOffer = async () => {
    if (!selectedService || !selectedOffer) return;
    // console.log(selectedService.id, selectedOffer.id, "115");

    try {
      const res = await applyOffer({
        id: selectedService.id,
        body: { offerId: selectedOffer.id },
      }).unwrap();
      if (res?.data) {
        ShowToast({
          message: "Offer Applied Successfully",
        });
      }
      setIsOfferModalOpen(false);
      setSelectedOffer(null);
    } catch (error: any) {
      toast.error(error?.data);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mx-auto px-6 bg-white py-7">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-[#2a2a3d] mb-6">
            My Services
          </h2>
          <div>
            <Link href="/provider/services/create-service">
              <button className="text-[#4f46e5] hover:bg-[#4f46e5] inline-flex items-center hover:text-white px-4 py-2 rounded text-md border border-[#4f46e5]">
                Add Service
              </button>
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setActiveTab("Active")}
            className={`px-4 py-2 ${
              activeTab === "Active"
                ? "bg-[#4f46e5] text-white"
                : "bg-white text-blue-600"
            } border rounded-l-md`}
          >
            Active Services
          </button>
          <button
            onClick={() => setActiveTab("Inactive")}
            className={`px-4 py-2 ml-2 ${
              activeTab === "Inactive"
                ? "bg-[#4f46e5] text-white"
                : "bg-white text-blue-600"
            } border rounded-r-md`}
          >
            Inactive Services
          </button>
        </div>
        {filteredServices.length === 0 ? (
          <p className="text-center text-gray-600">
            No {activeTab} services found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {paginatedServices?.map((service: any, index: any) => (
              <div
                key={index}
                className="border hover:shadow-md rounded-md relative overflow-hidden"
                data-aos="fade-up"
              >
                <div className="relative">
                  <Link
                    href={`/service-details/${service.id}`}
                    className="block relative"
                  >
                    <div className="image-wrapper">
                      <Image
                        className="img-fluid w-full  transition-transform duration-300 ease-in-out h-auto md:h-[230px]"
                        alt="Service Image"
                        src={service.serviceImg[service.serviceImg.length - 1]}
                        height={218}
                        width={328}
                      />
                    </div>
                  </Link>
                  <div className="fav-item absolute top-0 left-0 p-4 flex justify-between w-full">
                    <span className="text-sm bg-white px-3 py-1 hover:text-white text-[#665cf0] hover:bg-[#665cf0] rounded flex items-center">
                      {service.category.categoryName}
                    </span>
                    <div className="flex items-center">
                      <span className="rate ml-4 flex items-center bg-white px-3 py-1 rounded">
                        <FaStar className="filled text-yellow-500 mr-1" />{" "}
                        {service?.averageRating}
                      </span>
                    </div>
                  </div>
                  <div className="item-info absolute bottom-0 right-0 p-4 flex items-center justify-start w-full">
                    <Link
                      href={`/providers/${service.provider.id}`}
                      className="flex items-center"
                    >
                      <img
                        src={service.provider.profileImg[0]}
                        className="avatar w-10 h-10 rounded-full"
                        alt="User"
                      />
                      <span className="ml-2 text-white">{`${service?.provider?.fName} ${service?.provider?.lName}`}</span>
                    </Link>
                  </div>
                </div>
                <div className="service-content p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{service.serviceName}</h3>
                    <span
                      className="text-[12px] text-[#74788d] font-normal cursor-pointer"
                      onClick={() => handleStatusClick(service)}
                    >
                      {service.status === "Active" ? (
                        <span className="text-[14px] text-[#74788d] cursor-pointer flex items-center">
                          <MdOutlineChangeCircle />{" "}
                          <span className="px-1"> Active</span>
                        </span>
                      ) : (
                        <span className="text-[14px] text-[#74788d] cursor-pointer flex items-center ">
                          <MdOutlineChangeCircle /> Inactive
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-gray-500 flex items-center text-sm">
                      <FiMapPin className="mr-1" /> {service.location}
                    </p>
                    <p className="flex items-center">
                      {service?.offeredPrice ? (
                        <>
                          <h6 className="text-md font-bold">
                            {" "}
                            ${service?.offeredPrice}
                          </h6>
                          <span className="line-through text-gray-500 ml-2 text-sm">
                            ${service?.regularPrice}
                          </span>
                        </>
                      ) : (
                        <>
                          <h6 className="text-md font-bold">
                            ${service?.regularPrice}
                          </h6>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Link
                        href={`/provider/services/edit/${service?.id}`}
                        className="flex items-center mr-4"
                      >
                        <button
                          className="text-indigo-600 hover:text-indigo-700 transform hover:scale-110 flex items-center justify-center"
                          title="Edit"
                        >
                          <FiEdit size={20} />
                        </button>
                      </Link>

                      <div
                        onClick={() => handleDeleteClick(service)}
                        className="cursor-pointer flex items-center "
                      >
                        <button
                          className="text-red-600 hover:text-red-700 transform hover:scale-110 flex items-center justify-center"
                          title="Delete"
                        >
                          <FiTrash size={20} />
                        </button>
                      </div>
                    </div>
                    <button
                      className="bg-[#f7f7ff] text-[#6240ed] border border-transparent hover:border-[#6240ed] px-4 py-2 rounded text-sm font-semibold hover:bg-white"
                      onClick={() => handleApplyOfferClick(service)}
                    >
                      Apply Offer
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

        <StatusModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmStatusChange}
          serviceName={selectedService?.serviceName || ""}
          currentStatus={selectedService?.status || ""}
        />

        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          message={`Are you sure you want to delete the service "${selectedService?.serviceName}"?`}
        />

        {paginatedServices.length > 0 && (
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
        )}
      </div>
    </>
  );
};

export default Services;
