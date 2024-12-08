import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  serviceName: string;
  currentStatus: string;
}

const StatusModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  serviceName,
  currentStatus,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Change Service Status</h2>
        <p className="mb-6">
          Are you sure you want to change the status from{" "}
          <strong>{currentStatus}</strong> to{" "}
          <strong>{currentStatus === "Active" ? "Inactive" : "Active"}</strong>?
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md mr-4"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#4f46e5] text-white px-4 py-2 rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;