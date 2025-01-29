import React, { useState } from "react";
import DashboardLayout from "../layouts/Dashboardlayout";
import hotel from "../assets/activities.jpg";
import search from "../assets/svg/MagnifyingGlass.svg";
import { useData } from "../context/data-context";
import ActivityCard from "../components/ui/activities-card";
import AddActivityModal from "../components/ui/modals/add-activities-modal";
import { toast } from "sonner";
import nosearchfound from "../assets/svg/no-search-found.svg";

export default function Attractions() {
  const REACT_APP_RAPID_API =
    "70731fb9c6msha5f8a678815933cp109b3ajsn92e221a94a2e";
  const { setIsActivityModalOpen } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [attractionItems, setAttractionItems] = useState([]);
  const [loading, setLoading] = useState({ destinations: false, items: false });
  const [error, setError] = useState(null);

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
            "x-rapidapi-key": REACT_APP_RAPID_API,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch destinations");

      const data = await response.json();
      setDestinations(data.data.products || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading((prev) => ({ ...prev, destinations: false }));
    }
  };

  const fetchAttractionItems = async (destination) => {
    setLoading((prev) => ({ ...prev, items: true }));
    setError(null);
    setDestinations([]); // Hide destinations when fetching attraction items

    try {
      const response = await fetch(
        `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchAttractions?id=${encodeURIComponent(
          destination.id
        )}&sortBy=trending&page=1&currency_code=INR&languagecode=en-us`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "booking-com15.p.rapidapi.com",
            "x-rapidapi-key": REACT_APP_RAPID_API,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch attraction items");

      const data = await response.json();
      setAttractionItems(data.data.products || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading((prev) => ({ ...prev, items: false }));
    }
  };


   const addActivityToLocalStorage = (activity) => {
     const storedActivities =
       JSON.parse(localStorage.getItem("activities")) || [];
     storedActivities.push(activity);
     localStorage.setItem("activities", JSON.stringify(storedActivities));
     toast.success("Activity Added");
   };

  return (
    <DashboardLayout>
      <div className="w-full">
        <div
          className="w-full h-[400px] bg-cover bg-center flex flex-col items-center justify-center"
          style={{ backgroundImage: `url(${hotel})` }}
        >
          <h4 className="text-[32px] font-medium text-white text-center px-4">
            Explore What Attracts You Today!
          </h4>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-5 h-[47px] py-1.5 px-2 rounded bg-white">
              <div className="flex justify-between items-center bg-white rounded h-[47px] py-3 px-3 w-[400px]">
                <img src={search} alt="search" />
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchDestinations()}
                  placeholder="Search your attraction location"
                  className="bg-transparent p-3 text-sm w-full placeholder:text-stone-400 focus:outline-none"
                />
              </div>
              <button
                onClick={fetchDestinations}
                className="bg-primary_600 text-white px-4 h-full rounded hover:bg-blue-600 text-sm"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {loading.destinations || loading.items ? (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : searchTerm.trim() === "" ? (
          <div className="flex flex-col justify-center w-full items-center text-gray-500 mt-10">
            <img src={nosearchfound} alt="no-search-found" />
            <h5 className="text-[20px]">
              Start searching for your destination!
            </h5>
          </div>
        ) : (
          <>
            {!loading.items && destinations.length > 0 && (
              <div className="grid grid-cols-2 gap-5">
                {destinations.map((destination, index) => (
                  <div
                    key={destination.id || index}
                    className="cursor-pointer bg-white p-4 rounded"
                    onClick={() => fetchAttractionItems(destination)}
                  >
                    <h4 className="font-bold text-lg">{destination.title}</h4>
                    <p>{destination.cityName}</p>
                    <button className="text-primary_600 font-semibold mt-4">
                      View Attractions
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!loading.items && attractionItems.length > 0 && (
              <div className="grid grid-cols-2 gap-5">
                {attractionItems.map((item, index) => (
                  <div key={item.id || index} className="bg-white p-4 rounded">
                    <div className="w-[100px] h-[100px] bg-black rounded flex items-center justify-center overflow-hidden">
                      <img
                        src={item.primaryPhoto?.small}
                        className="rounded w-full h-full object-cover"
                        alt={`Image of ${item.name}`}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="w-[500px] text-gray-600">
                        {item.shortDescription}
                      </p>
                      <p className="font-medium text-gray-700">
                        Location: {item.ufiDetails?.bCityName},{" "}
                        {item.ufiDetails?.url?.country.toUpperCase()}
                      </p>
                      <p className="font-semibold text-green-600">
                        Price: {item.representativePrice?.currency}{" "}
                        {item.representativePrice?.publicAmount?.toLocaleString()}
                      </p>
                      {item.cancellationPolicy?.hasFreeCancellation && (
                        <p className="text-green-500">
                          Free Cancellation Available
                        </p>
                      )}
                      <p className="font-medium text-gray-700">
                        Rating:{" "}
                        {item.reviewsStats?.combinedNumericStats?.average} (
                        {item.reviewsStats?.allReviewsCount} reviews)
                      </p>
                      <button
                        onClick={() => addActivityToLocalStorage(item)}
                        className="bg-primary_600 text-white 1920:px-5 px-4 mt-6 1920:h-[46px] h-[38px] rounded hover:bg-blue-600 1920:text-base text-sm"
                      >
                        Add to Itinerary
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <AddActivityModal />
    </DashboardLayout>
  );
}
