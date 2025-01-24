import React from "react";
import airplaninflight from "../../assets/svg/AirplaneInFlight.svg";
import { useData } from "../../context/data-context";
import FlightCard from "../ui/flight-card";
import AddFlightModal from "../ui/modals/add-flight-modal";

export default function Flights() {
  const { data, setIsFlightModalOpen } = useData();
  console.log(data)

  return (
    <div className="bg-neutral_300 1920:px-6 px-4 pt-4 pb-16 rounded">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <img src={airplaninflight} alt="airplane" />
          <h5 className="1920:text-lg text-base font-semibold">Flights</h5>
        </div>
        <button 
          className="1920:h-[46px] h-[37px] 12920:text-base text-sm bg-white 1920:px-6 px-4 text-primary_600 rounded"
          onClick={() => setIsFlightModalOpen(true)}
        >
          Add Flight
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {data.flights.map((flight, index) => (
          <FlightCard key={index} flight={flight} />
        ))}
      </div>

      <AddFlightModal />
    </div>
  );
}