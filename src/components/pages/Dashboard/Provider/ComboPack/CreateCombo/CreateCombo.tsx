"use client";
import React, { useRef, useState } from "react";
import { FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Spinner from "@/components/UI/Spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import comboSchema from "@/schemas/combo-pack";
import { useClickAway } from "react-use";
import { useAddComboMutation } from "@/redux/api/comboPackApi";
import { useProviderServicesQuery } from "@/redux/api/servicesApi";
import { ShowToast } from "@/components/UI/ShowToast";

interface CreateCategoryFormProps {
  show: boolean;
  onClose: () => void;
}

const CreateCombo: React.FC<CreateCategoryFormProps> = ({ show, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState("");
  const [selectedServices, setSelectedServices] = useState<
    { id: number; serviceName: string; offeredPrice: number; regularPrice: number }[]
  >([]);
  const [baseTotalPrice, setBaseTotalPrice] = useState(0); // New state for total price without discount
  const [totalPrice, setTotalPrice] = useState(0); // Total after applying discount
  const [discount, setDiscount] = useState<string>("0");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modeError, setModeError] = useState<boolean>(false);

  useClickAway(dropdownRef, () => setDropdownOpen(false));

  const [addCombo] = useAddComboMutation();
  const { data } = useProviderServicesQuery(undefined);
  const services = data?.data;

  const validateServiceCount = () => {
    let requiredServiceCount = 0;

    switch (plan) {
      case 'Basic':
        requiredServiceCount = 3;
        break;
      case 'Standard':
        requiredServiceCount = 5;
        break;
      case 'Premium':
        requiredServiceCount = 7;
        break;
      default:
        return true;
    }

    return selectedServices.length >= requiredServiceCount;
  };

  // Form submission handler
  const onSubmit = async (values: any) => {
    if (!plan) {
      setModeError(true);
      return;
    } else {
      setModeError(false);
    }

    if (!validateServiceCount()) {
      toast.error(`Please select at least ${plan === 'Basic' ? 3 : plan === 'Standard' ? 5 : 7} services for ${plan} mode.`);
      return;
    }

    const selectedServiceIds = selectedServices.map((service) => service.id);
    values.plan = plan;
    values.selectedServices = selectedServiceIds;
    values.amount = parseInt(baseTotalPrice.toFixed(0)); // Use base total price without discount
    values.discountAmount = parseInt(totalPrice.toFixed(0)); // Total amount after applying discount
    values.discount = parseInt(discount);
   
    setLoading(true);
    const toastId = toast.loading('Posting...');

    try {
      const res = await addCombo(values).unwrap();
      if (res?.data) {
        ShowToast({
          message: res?.message,
        });
        setTimeout(() => {
          onClose();
        }, 2000);
      }

      // Reset form state
      setSelectedServices([]);
      setPlan('');
      setDiscount('');
      setBaseTotalPrice(0);
      setTotalPrice(0);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to create category", {
        style: {
          borderRadius: "10px",
          background: "#e74c3c",
          color: "#fff",
        },
        duration: 2000,
      });
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  // Calculate base total price based on selected services
  const calculateBaseTotalPrice = (services: any[]): number => {
    return services.reduce((total, service) => {
      const price = service.offeredPrice > 0 ? service.offeredPrice : service.regularPrice;
      return total + (price || 0);
    }, 0);
  };

  // Calculate total price after discount
  const calculateTotalPriceWithDiscount = (basePrice: number, discount: number): number => {
    const discountAmount = (basePrice * discount) / 100;
    return basePrice - discountAmount;
  };

  // Update total price and discount
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    if (value === "") {
      setDiscount("");
      setTotalPrice(calculateTotalPriceWithDiscount(baseTotalPrice, 0)); // Reset to base price
    } else {
      const discountValue = parseFloat(value);
      if (!isNaN(discountValue) && discountValue >= 0) {
        setDiscount(value);
        setTotalPrice(calculateTotalPriceWithDiscount(baseTotalPrice, discountValue)); // Update with discount
      } else {
        toast.error("Please enter a valid discount percentage.");
      }
    }
  };

  // Handle service selection
  const handleServiceChange = (service: any, isChecked: boolean): void => {
    let updatedServices;

    if (isChecked) {
      updatedServices = [...selectedServices, service];
    } else {
      updatedServices = selectedServices.filter((s) => s.id !== service.id);
    }

    setSelectedServices(updatedServices);

    // Calculate base total price
    const newBaseTotalPrice = calculateBaseTotalPrice(updatedServices);
    setBaseTotalPrice(newBaseTotalPrice);

    // Calculate total price immediately after selection with discount
    setTotalPrice(calculateTotalPriceWithDiscount(newBaseTotalPrice, parseFloat(discount) || 0));
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlan(event.target.value);
    setModeError(false); // Hide error when mode changes
  };

  if (!show) return null;

  const requiredServiceCount = plan === 'Basic' ? 3 : plan === 'Standard' ? 5 : plan === 'Premium' ? 7 : 0;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold mb-2">Add New Combo Pack</h3>
            <button
              onClick={onClose}
              className="text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white rounded-full p-2 hover:bg-opacity-90 transition"
            >
              <FiX size={18} />
            </button>
          </div>

          <Form submitHandler={onSubmit} resolver={yupResolver(comboSchema)}>
            <div className="mb-4">
              <FormInput name="comboName" label="Combo Name" type="text" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Plan</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={plan}
                onChange={handleModeChange}
              >
                <option value="">Select Plan</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
         
            {modeError && (
              <div className="mb-4 text-sm text-red-600">
                Plan is Required
              </div>
            )}

            <div className="mb-4">
              <h4 className="font-semibold">Select Services</h4>
              <div className="relative" ref={dropdownRef}>
                <div
                  className="cursor-pointer border border-gray-300 rounded-md p-2 flex justify-between items-center"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <span>
                    {selectedServices.length > 0
                      ? selectedServices?.map((s) => s.serviceName).join(", ")
                      : "Select Services"}
                  </span>
                  <span className="ml-2">
                    {dropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                {dropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto border border-gray-300 rounded-md bg-white shadow-lg p-2">
                    {services.map((service: any) => (
                      <div key={service.id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={service.name}
                          checked={selectedServices.some((s) => s.id === service.id)}
                          onChange={(e) => handleServiceChange(service, e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor={service.name} className="text-gray-700 flex justify-between w-full">
                          <span>{service.serviceName}</span>
                          <span className="font-semibold text-gray-900">
                            ${service.offeredPrice ? service.offeredPrice : service.regularPrice}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {plan && selectedServices.length < requiredServiceCount && (
              <div className="mb-4 text-sm text-gray-900">
                Please select at least {requiredServiceCount} services for the {plan} mode.
              </div>
            )}
        
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Total Price 
              </label>
              <input
                type="text"
                value={totalPrice.toFixed(0)}
                disabled
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
              />
            </div>

                {/* Discount Percentage Input */}
                <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
              <input
                type="text"
                value={discount}
                onChange={handleDiscountChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>


            <button
                type="submit"
                className={`w-full text-[#4f46e5] hover:bg-[#4f46e5] hover:text-white inline-flex items-center justify-center px-4 py-2 rounded text-md border border-[#4f46e5] ${
                  loading
                    ? "w-full bg-[#4f46e5] text-white opacity-50 cursor-not-allowed inline-flex justify-center items-center"
                    : ""
                }`}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Add New Combo"}
              </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateCombo;
