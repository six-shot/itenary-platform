import React, { useState } from "react";
import DashboardLayout from "../layouts/Dashboardlayout";
import flight from "../assets/flight.jpg";
import search from "../assets/svg/MagnifyingGlass.svg";
import nosearchfound from "../assets/svg/no-search-found.svg";

export default function FlightBooking() {
  const REACT_APP_RAPID_API =
    "70731fb9c6msha5f8a678815933cp109b3ajsn92e221a94a2e";
  const [fromSearchTerm, setFromSearchTerm] = useState("");
  const [toSearchTerm, setToSearchTerm] = useState("");
  const [fromLocations, setFromLocations] = useState([]);
  const [toLocations, setToLocations] = useState([]);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flights, setFlights] = useState([]);

  // Fetch locations based on search term for "From" or "To" search
  const fetchLocations = async (searchTerm, isFromSearch) => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${encodeURIComponent(
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
        throw new Error("Failed to fetch locations");
      }

      const data = await response.json();
      if (isFromSearch) {
        setFromLocations(data.data || []);
      } else {
        setToLocations(data.data || []);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Search for available flights
  const searchFlights = async () => {
    if (!fromLocation || !toLocation || !departureDate) {
      setError("Please select from and to locations, and departure date");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=BOM.AIRPORT&toId=DEL.AIRPORT&departDate=2025-01-30&returnDate=2025-02-01&pageNo=1&adults=1&children=0%2C17&sort=BEST&cabinClass=ECONOMY&currency_code=AED`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "booking-com15.p.rapidapi.com",
            "x-rapidapi-key": REACT_APP_RAPID_API,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to search flights");
      }

      const data = await response.json();

      setFlights(data.data.aggregation);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <div
          className="w-full h-[400px] rounded bg-cover bg-center flex flex-col items-center justify-center px-5"
          style={{ backgroundImage: `url(${flight})` }}
        >
          <h4 className="text-[32px] font-medium text-white text-center px-4">
            Book Your Flight Today!
          </h4>
          <div className="flex justify-between w-full items-end mt-6 bg-white p-6 rounded ">
            <div className="flex gap-4">
              <div className="flex gap-4 items-end">
                {/* From Search */}
                <div className="flex flex-col">
                  <h5>From</h5>
                  <div className="mt-2 flex justify-between items-center bg-white rounded h-[50px] py-3 ">
                    <img src={search} alt="search" />
                    <input
                      value={fromSearchTerm}
                      onChange={(e) => setFromSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && searchFlights()}
                      placeholder="Search from locations"
                      className="relative bg-transparent p-3 1920:text-lg w-full placeholder:text-stone-400 focus:outline-none text-sm"
                    />
                    <button
                      onClick={() => fetchLocations(fromSearchTerm, true)}
                      className="bg-primary_600 text-white px-4 h-[40px] rounded hover:bg-blue-700 1920:text-base text-sm "
                    >
                      Search
                    </button>
                  </div>

                  {/* From Dropdown */}
                  {fromLocations.length > 0 && (
                    <select
                      value={fromLocation?.id || ""}
                      onChange={(e) => {
                        const selectedLocation = fromLocations.find(
                          (loc) => loc.id === e.target.value
                        );
                        setFromLocation(selectedLocation);
                        setFromSearchTerm(selectedLocation?.name || "");
                        setFromLocations([]);
                      }}
                      className="bg-white p-2 rounded border border-gray-300 w-full mt-2"
                    >
                      <option value="">Select From Location</option>
                      {fromLocations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name}, {location.country}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* To Search */}
                <div className="flex flex-col">
                  <h5>To</h5>
                  <div className="mt-2 flex justify-between items-center bg-white rounded h-[50px]">
                    <img src={search} alt="search" />
                    <input
                      value={toSearchTerm}
                      onChange={(e) => setToSearchTerm(e.target.value)}
                      placeholder="Search to locations"
                      className="relative bg-transparent p-3 1920:text-lg text-sm w-full placeholder:text-stone-400 focus:outline-none border-0"
                    />
                    <button
                      onClick={() => fetchLocations(toSearchTerm, false)}
                      className="bg-primary_600 text-white px-4 h-[40px] rounded hover:bg-blue-700 1920:text-base text-sm"
                    >
                      Search
                    </button>
                  </div>

                  {/* To Dropdown */}
                  {toLocations.length > 0 && (
                    <select
                      value={toLocation?.id || ""}
                      onChange={(e) => {
                        const selectedLocation = toLocations.find(
                          (loc) => loc.id === e.target.value
                        );
                        setToLocation(selectedLocation);
                        setToSearchTerm(selectedLocation?.name || "");
                        setToLocations([]);
                      }}
                      className="bg-white p-2 rounded border border-gray-300 w-full mt-2"
                    >
                      <option value="">Select To Location</option>
                      {toLocations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name}, {location.country}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="flex flex-col">
                  <h5>Departure Date</h5>
                  <div className="mt-2 flex flex-col h-[50px]">
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="bg-white 1920:h-full h-[40px] p-2 rounded border border-gray-300 1920:text-base text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label>Arrival Date</label>
                  <div className="mt-2 flex flex-col h-[50px]">
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="bg-white 1920:h-full h-[40px] p-2 rounded border border-gray-300 1920:text-base text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={searchFlights}
              className="bg-primary_600 text-white 1920:px-7 px-4 1920:h-[50px] h-[40px] rounded hover:bg-blue-700 1920:text-base text-sm mb-2"
            >
              Search Flights
            </button>
          </div>
        </div>

        {loading && <div className="text-center mt-4">Loading flights...</div>}
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        {loading.flights || loading.flights ? (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : fromSearchTerm.trim() === "" ? (
          <div className="flex flex-col justify-center w-full items-center text-gray-500 mt-10">
            <img src={nosearchfound} alt="no-search-found" />
            <h5 className="text-[20px]">
              Start searching for your destination!
            </h5>
          </div>
        ) : (
          <>
            <div className="mt-6">
              {flights && flights.airlines && (
                <div>
                  <h3 className="text-lg font-bold ">Airlines Available </h3>
                  <div className="mt-1">
                    <div className="flex ">
                      {flights.airlines.map((airline) => (
                        <div
                          key={airline.iataCode}
                          className="bg-white rounded p-4 mb-4"
                        >
                          <div className="flex items-center gap-2">
                            {/* Airline logo */}
                            <div className="w-[100px] h-[70px] bg-black rounded flex items-center justify-center overflow-hidden">
                              {airline.logoUrl ? (
                                <img
                                  src={airline.logoUrl}
                                  className="rounded w-full h-full object-cover"
                                  alt={`Logo of ${airline.name}`}
                                />
                              ) : (
                                <span className="text-white text-sm text-center">
                                  No image available
                                </span>
                              )}
                            </div>
                            {/* Airline Name */}
                            <div>
                              <h6 className="text-lg font-medium">
                                {airline.name}
                              </h6>
                              <p className="text-sm text-gray-500">
                                IATA Code: {airline.iataCode}
                              </p>
                              <p className="text-sm">
                                Currency Code:{" "}
                                {`${airline.minPrice.currencyCode} `}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8">
              <div className="flex flex-col lg:flex-row gap-8 mt-4">
                {/* Arrival Times */}
                <div className="mt-6">
                  {flights && flights.flightTimes && (
                    <div>
                      <h3 className="text-lg font-bold ">Flight Details </h3>
                      <div className="mt-1">
                        <div className=" ">
                          {flights.flightTimes.map((airline) => (
                            <div
                              key={airline.iataCode}
                              className="bg-white rounded p-4 mb-4"
                            >
                              <div>
                                <h5>Arrivals</h5>
                                {airline.arrival.map((flight) => (
                                  <div className="flex gap-5 items-center">
                                    <p>Start:{flight.start}</p>
                                    <p>End:{flight.end}</p>
                                  </div>
                                ))}
                              </div>
                              <div>
                                <h5>Departure</h5>
                                {airline.departure.map((flight) => (
                                  <div className="flex gap-5 items-center">
                                    <p>Start:{flight.start}</p>
                                    <p>End:{flight.end}</p>
                                  </div>
                                ))}
                              </div>
                              {/* {airline.departure.map((flight) => (
                            <div>Departure:{flight.start}</div>
                          ))} */}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
