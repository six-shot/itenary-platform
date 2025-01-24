import React, { useState } from 'react';
import { useData } from '../../../context/data-context';

const AddActivityModal = () => {
  const { isActivityModalOpen, setIsActivityModalOpen, addActivity } = useData();

  // Available features
  const availableFeatures = [
    {
      type: "location",
      label: "Directions"
    },
    {
      type: "rating",
      label: "Rating"
    },
    {
      type: "accommodation",
      label: "Accommodation"
    },
    {
      type: "transport",
      label: "Transport"
    },
    {
      type: "guide",
      label: "Tour Guide"
    }
  ];

  const [activityData, setActivityData] = useState({
    name: "",
    description: "",
    rating: {
      score: "",
      reviews: ""
    },
    pricing: {
      amount: "",
      totalPrice: "",
      details: ""
    },
    included: [
      {
        name: ""
      }
    ],
    schedule: {
      day: "",
      activities: ""
    },
    images: [
      {
        url: "/assets/svg/Rectangle 3437.svg",
        alt: "Activity view"
      }
    ],
    features: []
  });

  const handleFeatureChange = (feature) => {
    setActivityData(prev => {
      const featureExists = prev.features.some(f => f.type === feature.type);
      
      if (featureExists) {
        return {
          ...prev,
          features: prev.features.filter(f => f.type !== feature.type)
        };
      } else {
        return {
          ...prev,
          features: [...prev.features, { ...feature, value: "", reviews: "" }]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addActivity(activityData);
    setIsActivityModalOpen(false);
    // Reset form
    setActivityData({
      name: "",
      description: "",
      rating: { score: "", reviews: "" },
      pricing: { amount: "", totalPrice: "", details: "" },
      included: [{ name: "" }],
      schedule: { day: "", activities: "" },
      images: [{ url: "/assets/svg/Rectangle 3437.svg", alt: "Activity view" }],
      features: []
    });
  };

  if (!isActivityModalOpen) return null;

  return (
    <div  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Activity</h2>
          <button
            onClick={() => setIsActivityModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Activity Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Activity Name
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-md"
              value={activityData.name}
              onChange={(e) => setActivityData(prev => ({
                ...prev,
                name: e.target.value
              }))}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              required
              rows={3}
              className="w-full p-2 border rounded-md"
              value={activityData.description}
              onChange={(e) => setActivityData(prev => ({
                ...prev,
                description: e.target.value
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
                value={activityData.rating.score}
                onChange={(e) => setActivityData(prev => ({
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
                value={activityData.rating.reviews}
                onChange={(e) => setActivityData(prev => ({
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
                placeholder="Amount"
                required
                className="w-full p-2 border rounded-md"
                value={activityData.pricing.amount}
                onChange={(e) => setActivityData(prev => ({
                  ...prev,
                  pricing: { ...prev.pricing, amount: e.target.value }
                }))}
              />
              <input
                type="text"
                placeholder="Total Price"
                required
                className="w-full p-2 border rounded-md"
                value={activityData.pricing.totalPrice}
                onChange={(e) => setActivityData(prev => ({
                  ...prev,
                  pricing: { ...prev.pricing, totalPrice: e.target.value }
                }))}
              />
            </div>
            <input
              type="text"
              placeholder="Pricing Details"
              className="w-full p-2 border rounded-md"
              value={activityData.pricing.details}
              onChange={(e) => setActivityData(prev => ({
                ...prev,
                pricing: { ...prev.pricing, details: e.target.value }
              }))}
            />
          </div>

          {/* Included Items */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What's Included
            </label>
            <div className="space-y-2">
              {activityData.included.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder="Included Item"
                  className="w-full p-2 border rounded-md"
                  value={item.name}
                  onChange={(e) => setActivityData(prev => ({
                    ...prev,
                    included: prev.included.map((inc, i) => 
                      i === index ? { name: e.target.value } : inc
                    )
                  }))}
                />
              ))}
              <button
                type="button"
                onClick={() => setActivityData(prev => ({
                  ...prev,
                  included: [...prev.included, { name: "" }]
                }))}
                className="text-primary_600 text-sm font-medium"
              >
                + Add Another Item
              </button>
            </div>
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Day Number
              </label>
              <input
                type="number"
                min="1"
                required
                className="w-full p-2 border rounded-md"
                value={activityData.schedule.day}
                onChange={(e) => setActivityData(prev => ({
                  ...prev,
                  schedule: { ...prev.schedule, day: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Number of Activities
              </label>
              <input
                type="number"
                min="1"
                required
                className="w-full p-2 border rounded-md"
                value={activityData.schedule.activities}
                onChange={(e) => setActivityData(prev => ({
                  ...prev,
                  schedule: { ...prev.schedule, activities: e.target.value }
                }))}
              />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Features
            </label>
            <div className="grid grid-cols-3 gap-4">
              {availableFeatures.map((feature) => (
                <div key={feature.type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={feature.type}
                    checked={activityData.features.some(f => f.type === feature.type)}
                    onChange={() => handleFeatureChange(feature)}
                    className="w-4 h-4 text-primary_600 border-gray-300 rounded focus:ring-primary_600"
                  />
                  <label htmlFor={feature.type} className="text-sm text-gray-700">
                    {feature.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsActivityModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary_600 rounded-md hover:bg-primary_700"
            >
              Add Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActivityModal;