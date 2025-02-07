import React, { useState, useEffect } from 'react';
import { websiteService } from '../../utils/services';
import toast from 'react-hot-toast';
import Loader from '../Loader'; // Adjust the path as necessary
import { useAuthStore } from '../../store/authStore';

const PackageDiscountModal = ({ 
  isOpen, 
  onClose, 
  websiteDomain, 
  websiteId,
  discountprop,
  slotsprop,
  pricePerPublicationprop,
  websitePrice // New prop to receive website's price
}) => {
  const [isDiscountActive, setIsDiscountActive] = useState(false);
  const [slots, setSlots] = useState('5');
  const [pricePerPublication, setPricePerPublication] = useState('20');
  const [isLoading, setIsLoading] = useState(false);
  const [priceError, setPriceError] = useState('');
  
  // Get user from Auth Store
  const { user } = useAuthStore();

  useEffect(() => {
    if (isOpen) {
      setIsDiscountActive(discountprop || false);
      setSlots(slotsprop || '5');
      setPricePerPublication(pricePerPublicationprop || '20');
      setPriceError(''); // Reset price error when modal opens
    }
  }, [isOpen, discountprop, slotsprop, pricePerPublicationprop]);

  // Validate price when it changes
  useEffect(() => {
    if (websitePrice && pricePerPublication) {
      const price = parseFloat(pricePerPublication);
      const websitePriceFloat = parseFloat(websitePrice);
      
      if (price >= websitePriceFloat) {
        setPriceError(`Price per publication must be less than the website price (€${websitePrice})`);
      } else {
        setPriceError('');
      }
    }
  }, [pricePerPublication, websitePrice]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Additional price validation before submission
    if (priceError) {
      toast.error(priceError);
      return;
    }

    setIsLoading(true);
  
    try {
      if (!websiteId) {
        throw new Error('Website ID is required');
      }
      if (!user?._id) {
        throw new Error('User ID is missing');
      }
  
      const discountData = {
        userId: user._id,
        discount: isDiscountActive,
        slots: parseInt(slots),
        pricePerPublication: parseFloat(pricePerPublication),
      };
  
      await websiteService.applyDiscount(websiteId, discountData, user._id);
      toast.success('Discount package updated successfully');
      onClose(discountData);
    } catch (error) {
      toast.error(error.message || 'Failed to update discount package');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Site package sales discount</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Allow users to purchase multiple publications on your website at a discounted price, decide the 
            price per single publication and what is the number of publications to purchase to get the discount.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <span className="text-gray-700 font-medium">Discount for active package</span>
                <input
                  type="checkbox"
                  checked={isDiscountActive}
                  onChange={(e) => setIsDiscountActive(e.target.checked)}
                  className="rounded border-gray-300"
                  disabled={isLoading}
                />
                <span>Yes</span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Slots</label>
              <select
                value={slots}
                onChange={(e) => setSlots(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2"
                disabled={!isDiscountActive || isLoading}
              >
                <option value="5">5 slot</option>
                <option value="10">10 slot</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Price per publication</label>
              <div className="relative">
                <input
                  type="number"
                  value={pricePerPublication}
                  onChange={(e) => setPricePerPublication(e.target.value)}
                  min="20"
                  className={`w-full rounded-lg border ${
                    priceError ? 'border-red-500' : 'border-gray-300'
                  } p-2 pr-8`}
                  disabled={!isDiscountActive || isLoading}
                />
                <span className="absolute right-3 top-2 text-gray-500">€</span>
              </div>
              {priceError && (
                <p className="text-red-500 text-sm">{priceError}</p>
              )}
              <p className="text-red-500 text-sm">The minimum price is 20</p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !!priceError}
                className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PackageDiscountModal;