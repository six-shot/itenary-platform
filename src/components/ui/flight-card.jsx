import React from "react";
import americanairline from "../../assets/svg/american_airlines_symbol.svg.svg";
import dot from "../../assets/svg/Dot.svg";
import naira from "../../assets/svg/CurrencyNgn.svg";
import airplanetakeoff from "../../assets/svg/AirplaneTakeoff.svg";
import airplanelanding from "../../assets/svg/AirplaneLanding.svg";
import suitcase from "../../assets/svg/SuitcaseRolling.svg";
import close from "../../assets/svg/X.svg";
import film from "../../assets/svg/FilmSlate.svg";
import fork from "../../assets/svg/ForkKnife.svg";
import usb from "../../assets/svg/Usb.svg";

const FlightCard = ({ flight }) => {
  return (
    <div className="flex h-full">
      <div className="w-full bg-[#FFF] rounded-l">
        <div className="flex">
          <div className="flex justify-between items-center bg-[#FFF] 1920:px-8 px-6 1920:py-6 py-4 rounded w-full">
            <div className="flex gap-3 items-center">
              <img src={americanairline} alt="american airline" />
              <div className="flex flex-col gap-1">
                <h4 className="1920:text-lg text-base text-black_primary font-semibold">
                  {flight.airline.name}
                </h4>
                <div className="flex items-center">
                  <h5 className="font-medium text-black_secondary 1920:text-base text-sm">
                    {flight.airline.code}
                  </h5>
                  <img src={dot} alt="dot" />
                  <button className="1920:h-[40px] h-[30px] px-2 bg-[#0A369D] rounded text-white 1920:text-base text-sm">
                    {flight.airline.class}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-10 items-center">
              <div className="flex flex-col items-center">
                <h5 className="text-[24px] text-black_primary font-semibold">
                  {flight.departure.time}
                </h5>
                <h5 className="text-sm font-semibold text-black_secondary">
                  {flight.departure.date}
                </h5>
              </div>

              <div className="w-[387px] flex flex-col items-center">
                <div className="flex w-full justify-between mb-[11px]">
                  <img src={airplanetakeoff} alt="airplane" />
                  <h6 className="font-medium text-black_secondary 1920:text-base text-sm">
                    Duration: {flight.flight.duration}
                  </h6>
                  <img src={airplanelanding} alt="airplanelanding" />
                </div>
                <div className="w-[387px] h-[8px] rounded-[8px] bg-primary_100">
                  <div className="w-[130px] h-[8px] rounded-[8px] bg-primary_600 mx-auto"></div>
                </div>
                <div className="flex w-full justify-between mt-[11px] ">
                  <h6 className="font-semibold 1920:text-base text-sm">
                    {flight.departure.airport}
                  </h6>
                  <h6 className="font-medium text-black_secondary 1920:text-base text-sm">
                    {flight.flight.type}
                  </h6>
                  <h6 className="font-semibold 1920:text-base text-sm">
                    {flight.arrival.airport}
                  </h6>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <h5 className="text-[24px] text-black_primary font-semibold">
                  {flight.arrival.time}
                </h5>
                <h5 className="text-sm font-semibold text-black_secondary">
                  {flight.arrival.date}
                </h5>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <img
                className="1920:w-[32px] w-[24px] "
                src={naira}
                alt="naira"
              />
              <h5 className="1920:text-[28px] text-[22px] font-semibold">
                {flight.price}
              </h5>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#E4E7EC]" />

        <div className="1920:p-6 p-4 flex gap-3 items-center">
          <h5 className="1920:text-lg text-base font-medium text-black_secondary">
            Facilities:
          </h5>
          <div className="flex items-center gap-4">
            {flight.facilities.map((facility, index) => (
              <div key={index} className="flex items-center gap-[6px]">
                <img
                  className="1920:w-[32px] w-[24px]"
                  src={
                    facility.type === "baggage"
                      ? suitcase
                      : facility.type === "entertainment"
                      ? film
                      : facility.type === "meal"
                      ? fork
                      : usb
                  }
                  alt={facility.type}
                />
                <h5 className="1920:text-lg text-sm font-medium text-black_secondary">
                  {facility.type === "baggage"
                    ? `Baggage: ${facility.details.checked}, Cabin Baggage: ${facility.details.cabin}`
                    : facility.details}
                </h5>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#E4E7EC]" />

        <div className="1920:p-6 p-4 flex justify-between items-center">
          <div className="flex gap-8 items-center">
            <h5 className="1920:text-lg text-base font-medium text-primary_600">
              Flight Details
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
      <div className="flex justify-center items-center w-[46px] h-auto bg-[#FBEAE9] border rounded-r">
        <img src={close} alt="close" />
      </div>
    </div>
  );
};

export default FlightCard;