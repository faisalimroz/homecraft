// components/Pagination.tsx
import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-end ml-4">
      <button
        className={`inline-flex items-center px-4 py-2 mx-1 rounded-lg transition-colors ${
          currentPage === 1 ? 'text-gray-500 cursor-not-allowed text-sm bg-gray-300' : 'text-gray-700 bg-[#f8fcfd] hover:from-blue-500 hover:to-blue-700 text-sm font-bold hover:text-[#4f46e5]'
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FiArrowLeft className="mr-1" /> PREV
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`px-4 py-2 mx-1 rounded-lg transition-colors ${
            currentPage === index + 1
              ? 'bg-[#4f46e5] text-white'
              : 'bg-[#f8fcfd] border border-gray-300 text-gray-800 hover:bg-[#4f46e5] text-sm hover:text-white'
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`inline-flex items-center px-4 py-2 mx-1 rounded-lg transition-colors ${
          currentPage === totalPages ? 'text-gray-500 cursor-not-allowed text-sm bg-gray-300' : 'text-gray-700 bg-[#f8fcfd] text-sm font-bold hover:text-[#4f46e5]'
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        NEXT <FiArrowRight className="ml-1" />
      </button>
    </div>
  );
};

export default Pagination;
