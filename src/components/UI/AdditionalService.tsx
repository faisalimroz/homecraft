import { useAdditionalServiceQuery } from '@/redux/api/servicesApi';
import React, { useState } from 'react';
import { FiMapPin } from 'react-icons/fi';


interface AdditionalServiceProps {
    serviceId: string;     
  }
const AdditionalService: React.FC<AdditionalServiceProps> = ({serviceId}) => {
    const { data } = useAdditionalServiceQuery(serviceId);
    // console.log(data)
    const services = data?.data;
    const [showAll, setShowAll] = useState(false); 
  
  
    const toggleShowAll = () => setShowAll(!showAll);
  
  
    const servicesToShow = showAll ? data?.data : data?.data.slice(0, 3);
    return (
        <div className="mb-8">
        <h5 className="text-xl font-semibold py-4">Additional Service</h5>
        <ul>
          {servicesToShow?.map((service:any) => (
            <li key={service?.id} className="flex justify-between items-center mb-4 p-4 rounded-lg bg-[#f8fcfd]">
              <div>
               
                <div className="flex items-center">
                  <img src={service?.serviceImg[0]} className="w-12 h-12 rounded mr-2" alt="service" />
                  <div className="add-serv-info">
                    <h6 className="text-sm font-medium">{service.serviceName}</h6>
                    <p className="text-gray-600 text-xs flex items-center"><FiMapPin className="mr-1" />{service.location}</p>
                  </div>
                </div>
              </div>
              <div >
                <h6 className="text-sm font-medium">${service?.offeredPrice > 0  ? service?.offeredPrice : service?.regularPrice}</h6>
              </div>
            </li>
          ))}
        </ul>

        {services?.length > 3 && (
        <button
          onClick={toggleShowAll}
          className="text-blue-500 hover:underline mt-4"
        >
          {showAll ? 'See Less' : 'See More'}
        </button>
      )}
      </div>

    );
};

export default AdditionalService;