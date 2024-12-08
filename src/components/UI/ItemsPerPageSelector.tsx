// components/ItemsPerPageSelector.tsx
import React from 'react';

interface ItemsPerPageSelectorProps {
  itemsPerPage: number;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = ({ itemsPerPage, onItemsPerPageChange }) => {
  return (
    <div>
      <label htmlFor="itemsPerPage" className="mr-2 text-sm font-medium text-gray-700">Per Page:</label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={onItemsPerPageChange}
        className="p-2 border rounded text-sm focus:outline-none focus:border-blue-600"
      >
        {[1, 2, 3, 6, 9, 12, 15, 18, 21].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemsPerPageSelector;
