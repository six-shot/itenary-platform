import React, { useState } from "react";
import DashboardLayout from "../layouts/Dashboardlayout";
import hotel from "../assets/activities.jpg";
import search from "../assets/svg/MagnifyingGlass.svg";
import { useData } from "../context/data-context";
import ActivityCard from "../components/ui/activities-card";
import AddActivityModal from "../components/ui/modals/add-activities-modal";

export default function Attractions() {
  const { data, setIsActivityModalOpen } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [attractionItems, setAttractionItems] = useState([]);
  const [loading, setLoading] = useState({
    destinations: false,
    items: false,
  });
  const [error, setError] = useState(null);

  // Fetch destinations by name
  const fetchDestinations = async () => {
    if (!searchTerm) return;

    setLoading((prev) => ({ ...prev, destinations: true }));
    setError(null);

    try {
      const response = await fetch(
        `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation?query=${encodeURIComponent(
          searchTerm
        )}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "booking-com15.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch destinations");
      }

      const data = await response.json();
      setDestinations(data.data.products || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading((prev) => ({ ...prev, destinations: false }));
    }
  };

  // Fetch attraction items for a specific destination
  const fetchAttractionItems = async (destination) => {
    setLoading((prev) => ({ ...prev, items: true }));
    setError(null);

    try {
      const response = await fetch(
        `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchAttractions?id=${encodeURIComponent(
          destination.id
        )}&sortBy=trending&page=1&currency_code=INR&languagecode=en-us`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "booking-com15.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch attraction items");
      }

      const data = await response.json();
      setAttractionItems(data.data.products || []);
      setDestinations([]);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading((prev) => ({ ...prev, items: false }));
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <div
          className="w-full h-[400px] rounded bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${hotel})` }}
        >
          <h4 className="text-[32px] font-medium text-white text-center px-4">
            Explore What attracts you today!!
          </h4>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-5 h-[70px] white p-3 rounded bg-white">
              <div className="flex justify-between items-center bg-white rounded h-[70px] py-3 px-3 w-[400px]">
                <img className="" src={search} alt="search" />
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  required
                  placeholder="Search your attraction location"
                  className="relative bg-transparent p-3 text-lg w-full placeholder:text-stone-400 focus:outline-none"
                />
              </div>

              <button
                onClick={fetchDestinations}
                className="bg-primary_600 text-white px-7 h-full rounded hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsActivityModalOpen(true)}
            className="bg-primary_600 text-white px-7 h-[50px] rounded hover:bg-blue-700"
          >
            Add Activities
          </button>
        </div>

        {/* Loading State */}
        {(loading.destinations || loading.items) && (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error Handling */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading.destinations &&
          !loading.items &&
          destinations.length === 0 &&
          attractionItems.length === 0 &&
          data.activities.length > 0 && (
            <div className="mt-2 mb-4 rounded p-3 grid gap-5">
              {data.activities.map((activity, index) => (
                <ActivityCard key={index} activity={activity} />
              ))}
            </div>
          )}

        {/* Destinations */}
        <div className="mt-2 mb-4 rounded p-3 grid grid-cols-2 gap-5">
          {!loading.destinations &&
            destinations.length > 0 &&
            destinations.map((destination, index) => (
              <div
                key={destination.id || index}
                className="flex items-center cursor-pointer bg-white p-4 rounded gap-3"
                onClick={() => fetchAttractionItems(destination)}
              >
                <div>
                  <h4 className="font-bold text-lg">{destination.title}</h4>
                  <p>{destination.cityName}</p>
                  <button
                    className="text-primary_600 cursor-pointer font-semibold mt-4"
                    onClick={() => fetchAttractionItems(destination)}
                  >
                    View Attractions
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Attraction Items */}
        <div className="mt-2 mb-4 rounded p-3 grid grid-cols-2 gap-5">
          {!loading.items &&
            attractionItems.length > 0 &&
            attractionItems.map((item, index) => (
              <div
                key={item.id || index}
                className="flex items-start bg-white p-4 rounded gap-3"
              >
                {/* Primary Photo */}
                <div className="w-[100px] h-[100px] bg-black rounded flex items-center justify-center overflow-hidden">
                  <img
                    src={item.primaryPhoto?.small}
                    className="rounded w-full h-full object-cover"
                    alt={`Image of ${item.name}`}
                  />
                </div>
                <div>
                  {/* Name */}
                  <h4 className="font-bold text-lg">{item.name}</h4>

                  {/* Short Description */}
                  <p className="w-[500px] text-gray-600">
                    {item.shortDescription}
                  </p>

                  {/* Location */}
                  <p className="font-medium text-gray-700">
                    Location: {item.ufiDetails?.bCityName},{" "}
                    {item.ufiDetails?.url?.country.toUpperCase()}
                  </p>

                  {/* Representative Price */}
                  <p className="font-semibold text-green-600">
                    Price: {item.representativePrice?.currency}{" "}
                    {item.representativePrice?.publicAmount?.toLocaleString()}
                  </p>

                  {/* Cancellation Policy */}
                  {item.cancellationPolicy?.hasFreeCancellation && (
                    <p className="text-green-500">
                      Free Cancellation Available
                    </p>
                  )}

                  {/* Reviews */}
                  <p className="font-medium text-gray-700">
                    Rating: {item.reviewsStats?.combinedNumericStats?.average} (
                    {item.reviewsStats?.allReviewsCount} reviews)
                  </p>

                  {/* Button */}
                  <button className="bg-primary_600 text-white px-5 mt-6 h-[46px] rounded hover:bg-blue-600">
                    Add to Itinerary
                  </button>
                </div>
              </div>
            ))}
        </div>
        <AddActivityModal />
      </div>
    </DashboardLayout>
  );
}
