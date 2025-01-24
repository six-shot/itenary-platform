import React from "react";
import hotels from "../../assets/svg/Buildings.svg";
import HotelCard from "../ui/hotel-card";
import { useData } from "../../context/data-context";
import AddHotelModal from "../ui/modals/add-hotel-modal";


export default function Hotels() {
  const { data, setIsHotelModalOpen } = useData();

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
          {data.hotels.length === 0 && (
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