import React from 'react';

interface Offer {
  id: string;
  offerName: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  discount: number;
  status: 'Active' | 'Expired'; // Adjust as per your status model
  providerName: string;
  providerLogo?: string; // URL to the provider logo image
}

const OfferCard: React.FC<Offer> = ({
  offerName,
  startDate,
  endDate,
  discount,
  status,
  providerName,
  providerLogo,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 w-72 transition-transform hover:scale-105">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{offerName}</h2>
        {providerLogo && (
          <img src={providerLogo} alt={`${providerName} logo`} className="w-10 h-10 rounded-full" />
        )}
      </div>
      <div className="text-gray-600 mb-2">
        <span>Start Date: {new Date(startDate).toLocaleDateString()}</span>
        <br />
        <span>End Date: {new Date(endDate).toLocaleDateString()}</span>
      </div>
      <div className="bg-yellow-500 text-white font-bold text-center rounded-md py-2 mb-2">
        {discount}% OFF
      </div>
      <div className={`text-center rounded-md py-1 ${status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
        {status}
      </div>
      <button className="bg-blue-600 text-white py-2 rounded-md w-full hover:bg-blue-500 transition duration-200">
        View Offer
      </button>
    </div>
  );
};

// Example usage of the OfferCard component
const App: React.FC = () => {
  const offers: Offer[] = [
    {
      id: '1',
      offerName: 'Exclusive Summer Sale',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      discount: 20,
      status: 'Active',
      providerName: 'Summer Provider',
      providerLogo: 'https://via.placeholder.com/40', // Replace with actual logo URL
    },
    {
      id: '2',
      offerName: 'Winter Clearance',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      discount: 30,
      status: 'Expired',
      providerName: 'Winter Provider',
      providerLogo: 'https://via.placeholder.com/40',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center space-x-4 p-5">
      {offers.map(offer => (
        <OfferCard key={offer.id} {...offer} />
      ))}
    </div>
  );
};

export default App;
