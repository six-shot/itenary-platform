import React, { useState } from 'react';
import { useData } from '../../../context/data-context';

const AddHotelModal = () => {
  const { isHotelModalOpen, setIsHotelModalOpen, addHotel } = useData();
  
  // Available facilities
  const availableFacilities = [
    {
      type: "pool",
      name: "Pool"
    },
    {
      type: "bar",
      name: "Bar"
    },
    {
      type: "wifi",
      name: "WiFi"
    },
    {
      type: "parking",
      name: "Parking"
    },
    {
      type: "gym",
      name: "Gym"
    },
    {
      type: "restaurant",
      name: "Restaurant"
    }
  ];

  const [hotelData, setHotelData] = useState({
    name: "",
    address: {
      street: "",
      area: ""
    },
    rating: {
      score: "",
      reviews: ""
    },
    pricing: {
      perNight: "",
      totalPrice: "",
      details: ""
    },
    facilities: [],
    booking: {
      checkIn: "",
      checkOut: ""
    },
    images: [
      {
        url: "/assets/svg/Rectangle 3437 (1).png",
        alt: "Hotel view"
      }
    ]
  });

  const handleFacilityChange = (facility) => {
    setHotelData(prev => {
      const facilityExists = prev.facilities.some(f => f.type === facility.type);
      
      if (facilityExists) {
        return {
          ...prev,
          facilities: prev.facilities.filter(f => f.type !== facility.type)
        };
      } else {
        return {
          ...prev,
          facilities: [...prev.facilities, facility]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addHotel(hotelData);
    setIsHotelModalOpen(false);
    // Reset form
    setHotelData({
      name: "",
      address: { street: "", area: "" },
      rating: { score: "", reviews: "" },
      pricing: { perNight: "", totalPrice: "", details: "" },
      facilities: [],
      booking: { checkIn: "", checkOut: "" },
      images: [{ url: "/assets/svg/Rectangle 3437 (1).png", alt: "Hotel view" }]
    });
  };

  if (!isHotelModalOpen) return null;

  return (
    <div  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Hotel</h2>
          <button
            onClick={() => setIsHotelModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hotel Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Hotel Name
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-md"
              value={hotelData.name}
              onChange={(e) => setHotelData(prev => ({
                ...prev,
                name: e.target.value
              }))}
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              placeholder="Street Address"
              required
              className="w-full p-2 border rounded-md mb-2"
              value={hotelData.address.street}
              onChange={(e) => setHotelData(prev => ({
                ...prev,
                address: { ...prev.address, street: e.target.value }
              }))}
            />
            <input
              type="text"
              placeholder="Area"
              required
              className="w-full p-2 border rounded-md"
              value={hotelData.address.area}
              onChange={(e) => setHotelData(prev => ({
                ...prev,
                address: { ...prev.address, area: e.target.value }
              }))}
            />
          </div>

          {/* Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Rating Score
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                required
                className="w-full p-2 border rounded-md"
                value={hotelData.rating.score}
                onChange={(e) => setHotelData(prev => ({
                  ...prev,
                  rating: { ...prev.rating, score: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Number of Reviews
              </label>
              <input
                type="number"
                min="0"
                required
                className="w-full p-2 border rounded-md"
                value={hotelData.rating.reviews}
                onChange={(e) => setHotelData(prev => ({
                  ...prev,
                  rating: { ...prev.rating, reviews: e.target.value }
                }))}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Pricing
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Price per Night"
                required
                className="w-full p-2 border rounded-md"
                value={hotelData.pricing.perNight}
                onChange={(e) => setHotelData(prev => ({
                  ...prev,
                  pricing: { ...prev.pricing, perNight: e.target.value }
                }))}
              />
              <input
                type="text"
                placeholder="Total Price"
                required
                className="w-full p-2 border rounded-md"
                value={hotelData.pricing.totalPrice}
                onChange={(e) => setHotelData(prev => ({
                  ...prev,
                  pricing: { ...prev.pricing, totalPrice: e.target.value }
                }))}
              />
            </div>
            <input
              type="text"
              placeholder="Pricing Details (e.g., 1 room x 10 nights incl. taxes)"
              className="w-full p-2 border rounded-md"
              value={hotelData.pricing.details}
              onChange={(e) => setHotelData(prev => ({
                ...prev,
                pricing: { ...prev.pricing, details: e.target.value }
              }))}
            />
          </div>

          {/* Facilities */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Facilities
            </label>
            <div className="grid grid-cols-3 gap-4">
              {availableFacilities.map((facility) => (
                <div key={facility.type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={facility.type}
                    checked={hotelData.facilities.some(f => f.type === facility.type)}
                    onChange={() => handleFacilityChange(facility)}
                    className="w-4 h-4 text-primary_600 border-gray-300 rounded focus:ring-primary_600"
                  />
                  <label htmlFor={facility.type} className="text-sm text-gray-700">
                    {facility.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Check-in Date
              </label>
              <input
                type="date"
                required
                className="w-full p-2 border rounded-md"
                value={hotelData.booking.checkIn}
                onChange={(e) => setHotelData(prev => ({
                  ...prev,
                  booking: { ...prev.booking, checkIn: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Check-out Date
              </label>
              <input
                type="date"
                required
                className="w-full p-2 border rounded-md"
                value={hotelData.booking.checkOut}
                onChange={(e) => setHotelData(prev => ({
                  ...prev,
                  booking: { ...prev.booking, checkOut: e.target.value }
                }))}
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsHotelModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary_600 rounded-md hover:bg-primary_700"
            >
              Add Hotel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHotelModal;