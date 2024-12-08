import React, { useState } from "react";
import { BiLinkExternal, BiMinus, BiPlus } from "react-icons/bi"; 

const FilterDrawer = ({ isOpen, onClose }:any) => {
    const [showAllOptions, setShowAllOptions] = useState(false);
    const [showAllIndustry, setShowAllIndustry] = useState(false);
    const [visibleOptions, setVisibleOptions] = useState(8);
    const [visibleIndustries, setVisibleIndustries] = useState(8);
    const [isExpend, setIsExpend] = useState(false);
    const [isExpendIndustries, setIsExpendIndustries] = useState(false);
  
    const options = [
      "S22",
      "W22",
      "S21",
      "W21",
      "S20",
      "W20",
      "S19",
      "W19",
      "S18",
      "W18",
      "S17",
      "W17",
      "IK12",
      "S16",
      "W16",
      "S15",
      "W15",
      "S14",
      "W14",
      "S13",
      "W13",
      "S12",
      "W12",
      "S11",
      "W11",
      "S10",
      "W10",
      "S09",
      "W09",
      "S08",
      "W08",
      "S07",
      "W07",
      "S06",
      "W06",
    ];
    const industriesData = [
      "All industries",
      "B2B",
      "Education",
      "Fintech",
      "Consumer",
      "Healthcare",
      "Real Estate and Construction",
      "Industrials",
      "Government",
      "Unspecified",
    ];
  
    const toggleOptions = () => {
      setShowAllOptions(!showAllOptions);
      if (!showAllOptions) {
        setVisibleOptions(options.length);
      } else {
        setVisibleOptions(8);
      }
    };
  
    const toggleIndustries = () => {
      setShowAllIndustry(!showAllIndustry);
      if (!showAllIndustry) {
        setVisibleIndustries(industriesData.length);
      } else {
        setVisibleIndustries(8);
      }
    };
  
    const handleExpand = () => {
      setIsExpend(!isExpend);
      setShowAllOptions(!showAllOptions);
    };
  
    const handleExpandIndustries = () => {
      setIsExpendIndustries(!isExpendIndustries);
      setShowAllIndustry(!showAllIndustry);
    };
    return (
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow h-full transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="col-span-1 bg-white border border-gray-300 p-4 rounded-md ">
            <div className="">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 mr-2" />
                <span className="text-xs mr-2">💎 Top Companies</span>
                <span className="text-xs bg-gray-200 px-2 py-1">49</span>
              </div>
              <div className="mt-2">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 mr-2" />
                  <span className="text-xs mr-2">Is Hiring</span>
                  <span className="text-xs bg-gray-200 px-2 py-1">49</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 mr-2" />
                  <span className="text-xs mr-2">Nonprofit</span>
                  <span className="text-xs bg-gray-200 px-2 py-1">49</span>
                </label>
              </div>
              <div className="border-b  border-gray-300 mt-5 mb-5"></div>
            </div>

            <div className="">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 mr-2" />
                <span className="text-xs mr-2">Black-founded</span>
                <span className="text-xs bg-gray-200 px-2 py-1">260</span>
              </div>
              <div className="mt-2">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 mr-2" />
                  <span className="text-xs mr-2">
                    Hispanic & Latino-founded
                  </span>
                  <span className="text-xs bg-gray-200 px-2 py-1">27</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 mr-2" />
                  <span className="text-xs mr-2">Women-founded</span>
                  <span className="text-xs bg-gray-200 px-2 py-1">50</span>
                </label>
              </div>
              <div className="border-b  border-gray-300 mt-5 mb-5"></div>
            </div>

            <div className="">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold">Batch</h4>
                <button onClick={handleExpand} className="flex items-center">
                  {showAllOptions ? (
                    <BiMinus className="h-5 w-5 mr-1" />
                  ) : (
                    <BiPlus className="h-5 w-5 mr-1" />
                  )}
                </button>
              </div>
              {/* Additional options */}
              <div className={`${isExpend ? "block" : "hidden"}`}>
                {options.slice(0, visibleOptions).map((option, index) => (
                  <div
                    key={index}
                    className={`mt-2 ${isExpend ? "block" : "hidden"}`}
                  >
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 mr-2" />
                      <span className="text-xs mr-2">{option}</span>
                    </div>
                  </div>
                ))}
                {options.length > 8 && (
                  <span
                    onClick={toggleOptions}
                    className="text-xs py-1 text-blue-500 underline"
                  >
                    See {showAllOptions ? "Fewer" : "All"} Options
                  </span>
                )}
              </div>
              <div className="border-b  border-gray-300 mt-5 mb-5"></div>
            </div>

            <div className="">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold">Industry</h4>
                <button
                  onClick={handleExpandIndustries}
                  className="flex items-center"
                >
                  {showAllIndustry ? (
                    <BiMinus className="h-5 w-5 mr-1" />
                  ) : (
                    <BiPlus className="h-5 w-5 mr-1" />
                  )}
                </button>
              </div>
              {/* Additional options */}
              <div className={`${isExpendIndustries ? "block" : "hidden"}`}>
                {industriesData
                  .slice(0, visibleIndustries)
                  .map((option, index) => (
                    <div
                      key={index}
                      className={`mt-2 ${
                        isExpendIndustries ? "block" : "hidden"
                      }`}
                    >
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 mr-2" />
                        <span className="text-xs mr-2">{option}</span>
                      </div>
                    </div>
                  ))}
                {industriesData.length > 8 && (
                  <span
                    onClick={toggleIndustries}
                    className="text-xs py-1 text-blue-500 underline"
                  >
                    See {showAllIndustry ? "Fewer" : "All"} Industries
                  </span>
                )}
              </div>
              <div className="border-b  border-gray-300 mt-5 mb-5"></div>
            </div>
          </div>
        <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 text-gray-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  };

  export default FilterDrawer;