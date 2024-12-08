import React, { useState } from 'react';
import Image from 'next/image';
import { FiCheck, FiEdit, FiTrash } from 'react-icons/fi';
import UpdateComboPack from '../EditComboPack/UpdateComboPack';
import { useDeleteComboMutation } from '@/redux/api/comboPackApi';
import ConfirmModal from '@/components/UI/ConfirmModal';
import { toast } from 'react-hot-toast';

interface ComboPackCardProps {
  id: string; // Ensure this prop is of type string and required
  name: string;
  services: string[];
  providerImage: string;
  providerName: string;
  providerInfo: string;
  amount: number;
  onDelete?: (id: string) => void; // Update to ensure the onDelete prop expects an id argument
}

const ComboPackCard: React.FC<ComboPackCardProps> = ({
  id,
  name,
  services,
  providerImage,
  providerName,
  providerInfo,
  amount,
  onDelete,
}) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteCombo] = useDeleteComboMutation();
  // Delete handler for local state management
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  // Handle the delete confirmation
  const handleConfirmDelete = async() => {
    if (onDelete) {
     await deleteCombo(id)
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-auto">
      {/* Plan Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{name}</h3>

      {/* Price Design */}
      <div className="flex justify-center items-center mb-6 p-3">
        <div className="bg-indigo-600 text-white font-semibold text-xl w-16 h-16 flex items-center justify-center rounded-full shadow-sm">
          ${amount || ''}
        </div>
      </div>

      {/* Provider Information */}
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <Image src={providerImage} alt={`${providerName} Image`} width={64} height={64} />
        </div>
        <div>
          <h4 className="text-xl font-semibold">{providerName}</h4>
          <p className="text-gray-600 text-sm">{providerInfo}</p>
        </div>
      </div>

      {/* Services Included */}
      <div className="mt-4">
        <h4 className="text-xl font-semibold">Services Included:</h4>
        <ul className="list-disc list-inside mt-2 space-y-2">
          {services.map((service, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <FiCheck className="mr-2 text-indigo-600" />
              {service}
            </li>
          ))}
        </ul>
      </div>

      {/* Edit and Delete Buttons */}
      <div className="mt-6 flex justify-center space-x-6">
        {/* Edit Button */}
        <button
          onClick={() => setShowEditModal(true)}
          className="text-indigo-600 hover:text-indigo-700 transform hover:scale-110 flex items-center justify-center"
          title="Edit"
        >
          <FiEdit size={20} />
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDeleteClick} // Trigger delete handler on click
          className="text-red-600 hover:text-red-700 transform hover:scale-110 flex items-center justify-center"
          title="Delete"
        >
          <FiTrash size={20} />
        </button>
      </div>

      {/* Update Combo Pack Modal */}
      <UpdateComboPack
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        serviceId={id}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the combo pack "${name}"?`}
      />
    </div>
  );
};

export default ComboPackCard;
