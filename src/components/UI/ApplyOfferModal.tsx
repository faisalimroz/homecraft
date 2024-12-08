import React from 'react';

interface ApplyOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  offers: any[]; // Assuming offers have an 'offerStatus' property
  selectedOffer: any;
  onSelectOffer: (offer: any) => void;
}

const ApplyOfferModal: React.FC<ApplyOfferModalProps> = ({
  isOpen,
  onClose,
  onApply,
  offers,
  selectedOffer,
  onSelectOffer,
}) => {
  if (!isOpen) return null;
  //  console.log(offers,'21')
  // Filter active offers
  const activeOffers = offers.filter((offer) => offer.status === 'Active');
  const isApplyDisabled = !selectedOffer || activeOffers.length === 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Apply Offer</h3>
        <div className="mb-4">
          {activeOffers.length > 0 ? (
            activeOffers.map((offer) => (
              <div key={offer.id} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`offer-${offer.id}`}
                  name="offer"
                  checked={selectedOffer?.id === offer.id}
                  onChange={() => onSelectOffer(offer)}
                />
                <label htmlFor={`offer-${offer.id}`} className="ml-2 cursor-pointer">
                  {offer.offerName} - {offer.discount}% off
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No active offers available.</p>
          )}
        </div>
        <div className="flex justify-end">
          <button className="bg-gray-300 px-4 py-2 rounded mr-2" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded ${
              isApplyDisabled
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
            onClick={onApply}
            disabled={isApplyDisabled}
          >
            Apply Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyOfferModal;
