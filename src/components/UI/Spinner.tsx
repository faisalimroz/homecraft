import React from 'react';
import { FaSpinner } from "react-icons/fa";
const Spinner = () => {
  return (
    <div>
      <div className="animate-spin">
    <FaSpinner className="animate-spin text-white h-5 w-5"  />
    
  </div>
    </div>
  );
};

export default Spinner;

