import React from "react";
import Flights from "../flights";

export default function Trips() {
  return (
    <div className="mt-[90px]">
      <div className="mb-8">
        <h5 className="text-lg font-semibold text-black_primary">
          Trip itineraries
        </h5>
        <p className="text-sm  text-black_secondary">
          Your trip itineraries are placed here
        </p>
      </div>
      <Flights/>
    </div>
  );
}
