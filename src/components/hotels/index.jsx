import React, { useState, useEffect } from "react";
import hotels from "../../assets/svg/Buildings.svg";
import HotelCard from "../ui/hotel-card";
import { useData } from "../../context/data-context";
import AddHotelModal from "../ui/modals/add-hotel-modal";
import bed from "../../assets/svg/Bed.svg";
import pool from "../../assets/svg/SwimmingPool.svg";
import bar from "../../assets/svg/Wine.svg";
import star from "../../assets/svg/Star.svg";
import location from "../../assets/svg/MapPin.svg";
import close from "../../assets/svg/X.svg";

export default function Hotels() {
  const { data, setIsHotelModalOpen } = useData();
  const [storedHotels, setStoredHotels] = useState([]);

  // Load hotels from localStorage on component mount
  useEffect(() => {
    const hotelsFromStorage = JSON.parse(localStorage.getItem("hotels")) || [];
    setStoredHotels(hotelsFromStorage);
  }, []);

  // Remove hotel by ID
  const removeHotel = (hotelId) => {
    const updatedHotels = storedHotels.filter((hotel) => hotel._id !== hotelId);
    setStoredHotels(updatedHotels); // Update local state
    localStorage.setItem("hotels", JSON.stringify(updatedHotels)); // Persist to localStorage
  };

  return (
    <div className="mt-4">
      <div className="pt-4 px-6 pb-[52px] bg-[#344054] rounded">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <img src={hotels} alt="hotels" />
            <h5 className="text-lg font-semibold text-white">Hotels</h5>
          </div>
          <button
            onClick={() => setIsHotelModalOpen(true)}
            className="1920:h-[46px] h-[37px] 12920:text-base text-sm bg-white 1920:px-6 px-4 text-primary_600 rounded"
          >
            Add Hotel
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {data.hotels.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))}

          {storedHotels.map((hotel) => (
            <div className="flex" key={hotel._id}>
              <div className="relative p-6 bg-white rounded-l flex flex-col w-full">
                <div className="flex items-start">
                  <img
                    className="w-[232px] h-[224px] rounded"
                    src={hotel.property.photoUrls[0]}
                    alt="view"
                  />
                  <div className="pl-4 w-full">
                    <h4 className="1920:text-xl text-base font-semibold">
                      {hotel.property.name}
                    </h4>
                    <p className="w-[600px] text-black_primary font-medium 1920:text-base text-sm">
                      {hotel.accessibilityLabel}
                    </p>
                    <div className="mt-2 flex gap-[14px] pb-[18px]">
                      <div className="flex items-center gap-1">
                        <img src={location} alt="location" />
                        <h5 className="text-primary_600 font-medium">
                          Show in map
                        </h5>
                      </div>
                      <div className="flex items-center gap-1">
                        <img src={star} alt="star" />
                        <h5 className="text-black_secondary font-medium">
                          {hotel.reviewScore}
                        </h5>
                      </div>
                      <div className="flex items-center gap-1">
                        <img src={bed} alt="bed" />
                        <h5 className="text-black_secondary font-medium"></h5>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-[#E4E7EC]" />
                    <div className="flex gap-3 items-center 1920:py-[14px] py-2.5">
                      <h5 className="1920:text-lg text-base font-medium text-black_secondary">
                        Facilities:
                      </h5>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-[6px]">
                          <img src={pool} alt="pool" />
                          <div className="flex items-center gap-1">
                            <h5 className="font-medium text-black_secondary 1920:text-lg text-base">
                              Pool
                            </h5>
                          </div>
                        </div>
                        <div className="flex items-center gap-[6px]">
                          <img src={bar} alt="bar" />
                          <div className="flex items-center gap-1">
                            <h5 className="font-medium text-black_secondary 1920:text-lg text-base">
                              Bar
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-[#E4E7EC]" />
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex gap-8 items-center">
                        <h5 className="1920:text-lg text-base font-medium text-primary_600">
                          Hotel Details
                        </h5>
                        <h5 className="1920:text-lg text-base font-medium text-primary_600">
                          Price Details
                        </h5>
                      </div>
                      <h5 className="1920:text-lg text-base font-medium text-primary_600">
                        Edit Details
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div
                onClick={() => removeHotel(hotel._id)}
                className="flex justify-center items-center w-[46px] h-auto bg-[#FBEAE9] border rounded-r cursor-pointer"
              >
                <img src={close} alt="close" />
              </div>
            </div>
          ))}

          {storedHotels.length === 0 && data.hotels.length === 0 && (
            <div className="text-center py-8 text-white">
              No hotels added yet. Click "Add Hotel" to get started.
            </div>
          )}
        </div>
      </div>
      <AddHotelModal />
    </div>
  );
}
