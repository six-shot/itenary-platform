import React, { useState } from "react";
import DashboardLayout from "../layouts/Dashboardlayout";
import hotel from "../assets/hotel.jpg";
import search from "../assets/svg/MagnifyingGlass.svg";
import { toast } from "sonner";
import nosearchfound from "../assets/svg/no-search-found.svg";
export default function Hotel() {
  const REACT_APP_RAPID_API =
    "70731fb9c6msha5f8a678815933cp109b3ajsn92e221a94a2e";

  const [searchTerm, setSearchTerm] = useState("");
  const [hotels, setHotels] = useState([]);
  const [availableHotels, setAvailableHotels] = useState([]);
  const [loading, setLoading] = useState({
    destinations: false,
    hotels: false,
  });
  const [error, setError] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const fetchHotels = async () => {
    setHotels([]);
    setAvailableHotels([]);
    setSelectedDestination(null);

    if (!searchTerm) return;

    setLoading((prev) => ({ ...prev, destinations: true }));
    setError(null);

    try {
      const response = await fetch(
        `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${encodeURIComponent(
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

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setHotels(data.data || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading((prev) => ({ ...prev, destinations: false }));
    }
  };

  // Fetch available hotels using destination details
  const fetchAvailableHotels = async (destination) => {
    if (!destination || !checkInDate || !checkOutDate) return;

    setLoading((prev) => ({ ...prev, hotels: true }));
    setError(null);

    try {
      const response = await fetch(
        `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=${
          destination.dest_id
        } &search_type=${
          destination.search_type || "city"
        } &arrival_date=${checkInDate}&departure_date=${checkOutDate}&adults=1&children_age=0%2C17&room_qty=1&page_number=1&units=metric&temperature_unit=c&languagecode=en-us&currency_code=AED`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "booking-com15.p.rapidapi.com",
            "x-rapidapi-key": REACT_APP_RAPID_API,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch available hotels");
      }

      const data = await response.json();
      setAvailableHotels(data.data.hotels || []);
      setHotels([]);
      setSelectedDestination(destination);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading((prev) => ({ ...prev, hotels: false }));
    }
  };

  const addHotelToLocalStorage = (hotel) => {
    const storedHotels = JSON.parse(localStorage.getItem("hotels")) || [];

    storedHotels.push(hotel);

    localStorage.setItem("hotels", JSON.stringify(storedHotels));

    toast.success("Hotel Added", hotels);
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <div
          className="w-full h-[400px] rounded bg-cover bg-center flex flex-col items-center justify-center"
          style={{ backgroundImage: `url(${hotel})` }}
        >
          <h4 className="text-[32px] font-medium text-white text-center px-4">
            Explore Our Various Hotels in Different Destinations Today!!
          </h4>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center ">
              <div className="flex items-center 1920:gap-5 gap-3 1920:h-[70px] h-[47px] white py-1.5 px-2 rounded bg-white">
                <div className="flex justify-between items-center bg-white rounded 1920:h-[70px] h-[47px] py-3 px-3 w-[300px] 1920:w-[400px]">
                  <img className="" src={search} alt="search" />
                  <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && fetchHotels()}
                    required
                    placeholder="Search your destination?"
                    className="relative bg-transparent p-3 1920:text-lg text-sm w-full placeholder:text-stone-400 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="checkInDate"
                    className="1920:text-[20px] text-sm uppercase font-medium"
                  >
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    id="checkInDate"
                    value={checkInDate}
                    required
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="bg-white 1920:p-2 p-1 rounded border border-gray-300 1920:text-base text-sm"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="checkOutDate"
                    className=" 1920:text-[20px] text-sm  uppercase font-medium"
                  >
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    id="checkOutDate"
                    required
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="bg-white 1920:p-2 p-1 rounded border border-gray-300 1920:text-base text-sm"
                  />
                </div>

                <button
                  onClick={fetchHotels}
                  className="bg-primary_600 text-white 1920:px-7 px-4  1920:text-base text-sm  h-full rounded hover:bg-blue-600"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}

        <div className="mt-2 mb-4 p-3">
          {loading.destinations || loading.hotels ? (
            <div className="flex justify-center items-center mt-10">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : searchTerm.trim() === "" ? (
            <div className="flex flex-col justify-center w-full items-center  text-gray-500 mt-10">
              <img src={nosearchfound} alt="no-search-found" />
              <h5 className="text-[20px]">
                Start searching for your destination!
              </h5>
            </div>
          ) : (
            <>
              {/* Destinations - Only show if no available hotels and not loading */}
              {!availableHotels.length &&
                !loading.hotels &&
                hotels.length > 0 && (
                  <div className="grid grid-cols-2 gap-5">
                    {" "}
                    {/* Grid applied here */}
                    {hotels.map((hotel) => (
                      <div
                        key={hotel.id}
                        className="flex items-center cursor-pointer bg-white p-4 rounded gap-3"
                        onClick={() => fetchAvailableHotels(hotel)}
                      >
                        <div className="w-[100px] h-[100px] bg-black rounded flex items-center justify-center overflow-hidden">
                          {hotel.image_url ? (
                            <img
                              src={hotel.image_url}
                              className="rounded w-full h-full object-cover"
                              alt={`Image of ${hotel.hotel_name}`}
                            />
                          ) : (
                            <span className="text-white text-sm text-center">
                              No image available
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{hotel.label}</h4>
                          <p>
                            {hotel.name || "Unknown"}, {hotel.country}
                          </p>
                          <p>
                            Hotels Available around here:{" "}
                            {hotel.hotels || "N/A"}
                          </p>
                          <button
                            className="text-primary_600 cursor-pointer font-semibold mt-4"
                            onClick={() => fetchAvailableHotels(hotel)}
                          >
                            Check hotel details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              {/* Available Hotels - Grid applied inside the child element */}
              {availableHotels.length > 0 && !loading.hotels && (
                <div className="grid grid-cols-2 gap-5">
                  {" "}
                  {/* Grid applied here */}
                  {availableHotels.map((hotel) => (
                    <div
                      key={hotel._id}
                      className="flex items-start bg-white p-4 rounded gap-3"
                    >
                      <div className="w-[100px] h-[100px] bg-black rounded flex items-center justify-center overflow-hidden">
                        <img
                          src={hotel.property.photoUrls[1]}
                          className="rounded w-full h-full object-cover"
                          alt={`Image of ${hotel.hotel_name}`}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">
                          {hotel.property.name}
                        </h4>
                        <p className="w-[500px]">{hotel.accessibilityLabel}</p>
                        <p className="font-medium">
                          Review: {hotel.property.reviewScore} (
                          {hotel.property.reviewCount} reviews)
                        </p>
                        <p className="font-bold text-green-500">
                          Price:{" "}
                          {hotel.property.priceBreakdown.grossPrice.value}{" "}
                          {hotel.property.priceBreakdown.grossPrice.currency}
                        </p>
                        <p>CHECKIN:{hotel.property.checkinDate}</p>
                        <p>CHECKOUT:{hotel.property.checkoutDate}</p>
                        <button
                          onClick={() => addHotelToLocalStorage(hotel)}
                          className="bg-primary_600 text-white px-5 mt-6 h-[46px] rounded hover:bg-blue-600"
                        >
                          Add Hotel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
