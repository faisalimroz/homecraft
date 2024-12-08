import React, { useEffect, useRef, useState } from "react";
import { FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Spinner from "@/components/UI/Spinner";
import { useClickAway } from "react-use";
import { useAddComboMutation, useComboQuery, useUpdateComboMutation } from "@/redux/api/comboPackApi";
import { useProviderServicesQuery } from "@/redux/api/servicesApi";
import { ShowToast } from "@/components/UI/ShowToast";

interface CreateCategoryFormProps {
  show: boolean;
  onClose: () => void;
  serviceId: string | null;
}

const UpdateComboPack: React.FC<CreateCategoryFormProps> = ({ show, onClose, serviceId }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState("");
  const [selectedServices, setSelectedServices] = useState<{
    id: string;
    serviceName: string;
    offeredPrice: number;
    regularPrice: number;
  }[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [defaultServices, setDefaultServices] = useState<any>([]);
  const previousCheckedState = useRef<{ [key: string]: boolean }>({});

  useClickAway(dropdownRef, () => setDropdownOpen(false));

  const [updateCombo] = useUpdateComboMutation()
  const { data } = useProviderServicesQuery(undefined);
  const { data: comboData } = useComboQuery(serviceId);
  const services = data?.data || [];
 

  // Fetch and set combo data when it changes
  useEffect(() => {
    if (comboData?.data) {
        const {  services, amount, discount } = comboData.data; // Destructure to get discount directly
        setMode(comboData.data.plan || "");

        const preselectedServices = services.map((service: any) => ({
            id: service.id,
            serviceName: service.serviceName,
            offeredPrice: service.offeredPrice,
            regularPrice: service.regularPrice,
        }));

        // Set discount from comboData if it exists
        if (discount) {
            setDiscount(discount); // Set discount as string for input
            // Calculate total price using the initial discount
            const discountAmount = (amount * (discount / 100));
            // Calculate new total price after applying discount
             const initialTotalPrice = amount - discountAmount; 
            setTotalPrice(initialTotalPrice); // Set initial total price
        } else {
            // If no discount, calculate total price normally
            
            setTotalPrice(amount);
        }

        setDefaultServices(preselectedServices);
        setSelectedServices(preselectedServices);
    }
}, [comboData]);


  const onSubmit = async (values: any) => {
    const selectedServiceIds = selectedServices.map((service) => service.id);
    values.mode = mode;
    values.selectedServices = selectedServiceIds;
    values.amount = totalPrice;
    values.discountAmount = totalPrice;

    // Validate based on mode
    if (mode === "Premium" && selectedServiceIds.length < 7) {
      toast.error("Please select at least 7 services for Premium mode.");
      return; // Prevent submission if validation fails
    }
    if (mode === "Standard" && selectedServiceIds.length < 5) {
      toast.error("Please select at least 5 services for Standard mode.");
      return; // Prevent submission if validation fails
    }

    setLoading(true);
    const toastId = toast.loading("Updating...");

    try {
      const res = await updateCombo({ id:comboData?.data?.id, body: values }).unwrap();
      if (res?.data) {
        ShowToast({ message: res.message });
        setTimeout(() => {
          onClose();
        }, 2000);
      
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to update combo pack", {
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

  const resetFormState = () => {
    setSelectedServices([]);
    setMode("");
    setDiscount("");
    setTotalPrice(0);
  };

const calculateTotalPrice = (services: any[], currentDiscount: number): number => {
    const totalServicePrice = services.reduce((total, service) => {
        const price = service.offeredPrice > 0 ? service.offeredPrice : service.regularPrice;
        return total + (price || 0);
    }, 0);

    // console.log("Total Service Price:", totalServicePrice); // Log total service price for debugging

    // Calculate the discount amount
    const discountAmount = (totalServicePrice * currentDiscount) / 100;
    const finalPrice = totalServicePrice - discountAmount; // Calculate final price after discount

    // console.log("Discount Amount:", discountAmount); // Log discount amount
    // console.log("Final Price After Discount:", finalPrice); // Log final price after discount

    return finalPrice < 0 ? 0 : finalPrice; // Ensure the total price is not negative
};



const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  const value = e.target.value;
 

  if (value === "") {
      setDiscount("");
      // Calculate total price with zero discount
      const newTotalPrice = calculateTotalPrice(selectedServices, 0) + (comboData?.data?.amount || 0);
      // console.log("Total Price Reset to Base Amount:", newTotalPrice); // Log the new total price
      setTotalPrice(newTotalPrice);
  } else {
    const discountValue = parseFloat(value);
    if (!isNaN(discountValue) && discountValue >= 0 && discountValue <= 100) {
      setDiscount(value);
      const discountAmount = (totalPrice * (discountValue / 100));
      // Calculate new total price after applying discount
       const newTotalPrice = Math.ceil(totalPrice - discountAmount); 
          // console.log("Total Price with Discount:", newTotalPrice); // Log the new total price
         setTotalPrice(newTotalPrice);
      } else {
          toast.error("Please enter a valid discount percentage (0-100).");
      }
  }
};

 // Define a ref to keep track of the last removed service to prevent multiple deductions
const lastRemovedServiceRef = useRef<string | null>(null);

const handleServiceChange = (service: any, isChecked: boolean): void => {
  // Log the initial total price for debugging
  // console.log(`Initial Total Price: ${totalPrice}`);

  setSelectedServices((prevServices) => {
    // Determine whether to add or remove the service based on isChecked
    const updatedServices = isChecked
      ? [...prevServices, service]
      : prevServices.filter((s) => s.id !== service.id);

    // Only update the total if the previous state is different
    if (previousCheckedState.current[service.id] === isChecked) {
      // console.log(`Service ${service.serviceName} is already in the desired state, skipping update...`);
      return updatedServices;
    }

    // Update the previous state to reflect the new isChecked value
    previousCheckedState.current[service.id] = isChecked;

    // Using functional update to ensure we work with the latest state
    setTotalPrice((prevTotal) => {
      const servicePrice = service.offeredPrice > 0 ? service.offeredPrice : service.regularPrice;

      // Calculate the new total price based on whether the service is being added or removed
      const newTotal = isChecked ? prevTotal + servicePrice : prevTotal - servicePrice;

      // Ensure the new total does not go below zero
      const finalTotal = newTotal < 0 ? 0 : newTotal;

      // Log the details of the service addition/removal and new total price
    

      return finalTotal;
    });

    return updatedServices; // Update the selected services
  });

  // Reset the last removed service reference after state updates settle
  setTimeout(() => {
    lastRemovedServiceRef.current = null;
  }, 500); // Adjust this delay as needed
};

  
  

  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = event.target.value;
    setMode(newMode);

    // Show message based on mode
    if (newMode === "Standard") {
      // toast.info("Please select at least 5 services for Standard mode.");
    } else if (newMode === "Premium") {
      // toast.info("Please select at least 7 services for Premium mode.");
    }

    // Reset selected services and total price when mode changes
    if (newMode !== "Premium") {
      setSelectedServices([]);
      setTotalPrice(comboData?.data?.amount || 0); // Reset to base amount
      setDiscount(""); // Reset discount when changing mode
    }
  };

  if (!show) return null;

  const defaultValues = {
    comboName: comboData?.data?.comboName || "",
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold mb-4">Update Combo Pack</h3>
            <button
              onClick={onClose}
              className="text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white rounded-full p-2 hover:bg-opacity-90 transition"
            >
              <FiX size={18} />
            </button>
          </div>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div className="mb-4">
              <FormInput name="comboName" label="Combo Name" type="text" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Mode</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={mode}
                onChange={handleModeChange}
              >
                <option value="">Select Plan</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold">Select Services</h4>
              <div className="relative" ref={dropdownRef}>
                <div
                  className="cursor-pointer border border-gray-300 rounded-md p-2 flex justify-between items-center"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <span>
                    {selectedServices.length > 0
                      ? selectedServices.map((s) => s.serviceName).join(", ")
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
                          id={service.serviceName}
                          checked={selectedServices.some((s) => s.id === service.id)}
                          onChange={(e) => handleServiceChange(service, e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor={service.serviceName} className="text-gray-700 flex justify-between w-full">
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

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Total Price</label>
              <input
                type="text"
                value={totalPrice.toFixed(0)}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
              <input
  type="number"
  value={discount} // Use the controlled component value
  onChange={handleDiscountChange}
  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
  placeholder="Enter discount percentage"
/>

            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`text-[#4f46e5] hover:bg-[#4f46e5] hover:text-white inline-flex items-center justify-center px-4 py-2 rounded text-md border border-[#4f46e5] ${
                  loading
                    ? "w-[150px] bg-[#4f46e5] text-white opacity-50 cursor-not-allowed inline-flex justify-center items-center"
                    : ""
                }`}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Save Changes"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateComboPack;
