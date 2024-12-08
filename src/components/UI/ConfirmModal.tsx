import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-black opacity-50 absolute inset-0"></div>
      <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl">
        <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">Confirm Action</h2>
        <p className="mb-6 text-center sm:text-left">{message}</p>
        <div className="flex justify-center sm:justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition-colors duration-200"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
