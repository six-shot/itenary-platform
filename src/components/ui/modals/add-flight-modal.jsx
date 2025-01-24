import React, { useState } from 'react';
import { useData } from '../../../context/data-context';

const AddFlightModal = () => {
  const { isFlightModalOpen, setIsFlightModalOpen, addFlight } = useData();
  const [flightData, setFlightData] = useState({
    airline: {
      name: "",
      code: "",
      class: ""
    },
    departure: {
      time: "",
      date: "",
      airport: ""
    },
    arrival: {
      time: "",
      date: "",
      airport: ""
    },
    flight: {
      duration: "",
      type: "Direct"
    },
    price: "",
    facilities: []
  });

  // Available facilities
  const availableFacilities = [
    {
      type: "baggage",
      label: "Baggage",
      details: {
        checked: "20kg",
        cabin: "8kg"
      }
    },
    {
      type: "entertainment",
      label: "Entertainment",
      details: "In flight entertainment"
    },
    {
      type: "meal",
      label: "Meal",
      details: "In flight meal"
    },
    {
      type: "usb",
      label: "USB Port",
      details: "USB Port"
    }
  ];

  const handleFacilityChange = (facility) => {
    setFlightData(prev => {
      const facilityExists = prev.facilities.some(f => f.type === facility.type);
      
      if (facilityExists) {
        // Remove facility if it exists
        return {
          ...prev,
          facilities: prev.facilities.filter(f => f.type !== facility.type)
        };
      } else {
        // Add facility if it doesn't exist
        return {
          ...prev,
          facilities: [...prev.facilities, { ...facility }]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFlight(flightData);
    setIsFlightModalOpen(false);
    setFlightData({
      airline: { name: "", code: "", class: "" },
      departure: { time: "", date: "", airport: "" },
      arrival: { time: "", date: "", airport: "" },
      flight: { duration: "", type: "Direct" },
      price: "",
      facilities: []
    });
  };

  if (!isFlightModalOpen) return null;

  return (
    <div  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Add New Flight</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Airline Details */}
          <div className="space-y-2">
            <h3 className="font-semibold">Airline Details</h3>
            <input
              type="text"
              placeholder="Airline Name"
              className="w-full p-2 border rounded"
              value={flightData.airline.name}
              onChange={(e) => setFlightData(prev => ({
                ...prev,
                airline: { ...prev.airline, name: e.target.value }
              }))}
            />
            <input
              type="text"
              placeholder="Flight Code"
              className="w-full p-2 border rounded"
              value={flightData.airline.code}
              onChange={(e) => setFlightData(prev => ({
                ...prev,
                airline: { ...prev.airline, code: e.target.value }
              }))}
            />
            <input
              type="text"
              placeholder="Class"
              className="w-full p-2 border rounded"
              value={flightData.airline.class}
              onChange={(e) => setFlightData(prev => ({
                ...prev,
                airline: { ...prev.airline, class: e.target.value }
              }))}
            />
          </div>

          {/* Departure Details */}
          <div className="space-y-2">
            <h3 className="font-semibold">Departure Details</h3>
            <input
              type="time"
              className="w-full p-2 border rounded"
              value={flightData.departure.time}
              onChange={(e) => setFlightData(prev => ({
                ...prev,
                departure: { ...prev.departure, time: e.target.value }
              }))}
            />
            <input
              type="text"
              placeholder="Date (e.g., Sun, 20 Aug)"
              className="w-full p-2 border rounded"
              value={flightData.departure.date}
              onChange={(e) => setFlightData(prev => ({
                ...prev,
                departure: { ...prev.departure, date: e.target.value }
              }))}
            />
            <input
              type="text"
              placeholder="Airport Code"
              className="w-full p-2 border rounded"
              value={flightData.departure.airport}
              onChange={(e) => setFlightData(prev => ({
                ...prev,
                departure: { ...prev.departure, airport: e.target.value }
              }))}
            />
          </div>

          {/* Arrival Details */}
          <div className="space-y-2">
            <h3 className="font-semibold">Arrival Details</h3>
            <input
              type="time"
              className="w-full p-2 border rounded"
              value={flightData.arrival.time}
              onChange={(e) => setFlightData(prev => ({
                ...prev,
                arrival: { ...prev.arrival, time: e.target.value }
              }))}
            />
            <input
              type="text"
              placeholder="Date (e.g., Sun, 20 Aug)"
              className="w-full p-2 border rounded"
              value={flightData.arrival.date}
              onChange={(e) => setFlightData(prev => ({
                ...prev,
                arrival: { ...prev.arrival, date: e.target.value }
              }))}
            />
            <input
              type="text"
              placeholder="Airport Code"
              className="w-full p-2 border rounded"
              value={flightData.arrival.airport}
              onChange={(e) => setFlightData(prev => ({
                ...prev,
                arrival: { ...prev.arrival, airport: e.target.value }
              }))}
            />
          </div>

          {/* Flight Details */}
          <div className="space-y-2">
            <h3 className="font-semibold">Flight Details</h3>
            <input
              type="text"
              placeholder="Duration (e.g., 1h 45m)"
              className="w-full p-2 border rounded"
              value={flightData.flight.duration}
              onChange={(e) => setFlightData(prev => ({
                ...prev,
                flight: { ...prev.flight, duration: e.target.value }
              }))}
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <h3 className="font-semibold">Price</h3>
            <input
              type="text"
              placeholder="Price"
              className="w-full p-2 border rounded"
              value={flightData.price}
              onChange={(e) => setFlightData(prev => ({
                ...prev,
                price: e.target.value
              }))}
            />
          </div>

          {/* Facilities */}
          <div className="space-y-2">
            <h3 className="font-semibold">Facilities</h3>
            <div className="grid grid-cols-2 gap-4">
              {availableFacilities.map((facility) => (
                <div key={facility.type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={facility.type}
                    checked={flightData.facilities.some(f => f.type === facility.type)}
                    onChange={() => handleFacilityChange(facility)}
                    className="w-4 h-4 text-primary_600 border-gray-300 rounded focus:ring-primary_600"
                  />
                  <label htmlFor={facility.type} className="text-sm font-medium text-gray-700">
                    {facility.label}
                  </label>
                </div>
              ))}
            </div>
            {/* Baggage Details - Only show if baggage is selected */}
            {flightData.facilities.some(f => f.type === "baggage") && (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  placeholder="Checked Baggage (e.g., 20kg)"
                  className="w-full p-2 border rounded"
                  value={flightData.facilities.find(f => f.type === "baggage")?.details?.checked || ""}
                  onChange={(e) => setFlightData(prev => ({
                    ...prev,
                    facilities: prev.facilities.map(f => 
                      f.type === "baggage" 
                        ? { ...f, details: { ...f.details, checked: e.target.value } }
                        : f
                    )
                  }))}
                />
                <input
                  type="text"
                  placeholder="Cabin Baggage (e.g., 8kg)"
                  className="w-full p-2 border rounded"
                  value={flightData.facilities.find(f => f.type === "baggage")?.details?.cabin || ""}
                  onChange={(e) => setFlightData(prev => ({
                    ...prev,
                    facilities: prev.facilities.map(f => 
                      f.type === "baggage" 
                        ? { ...f, details: { ...f.details, cabin: e.target.value } }
                        : f
                    )
                  }))}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsFlightModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary_600 text-white rounded"
            >
              Add Flight
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlightModal;