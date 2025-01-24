import React from "react";
import view from "../../assets/svg/Rectangle 3437 (1).png";
import left from "../../assets/svg/CaretCircleRight (2).svg";
import right from "../../assets/svg/CaretCircleRight (1).svg";
import location from "../../assets/svg/MapPin.svg";
import star from "../../assets/svg/Star.svg";
import bed from "../../assets/svg/Bed.svg";
import pool from "../../assets/svg/SwimmingPool.svg";
import bar from "../../assets/svg/Wine.svg";
import naira from "../../assets/svg/CurrencyNgn.svg";
import calendar from "../../assets/svg/CalendarBlank.svg";
import close from "../../assets/svg/X.svg";

const HotelCard = ({ hotel }) => {
  return (
    <div className="flex">
      <div className="relative p-6 bg-white rounded-l flex w-full">
        <div className="relative flex">
          <img src={view} alt="view" className="rounded" />
          <img
            className="absolute left-3 top-1/2 -translate-y-1/2"
            src={left}
            alt="left"
          />
          <img
            className="absolute right-3 top-1/2 -translate-y-1/2"
            src={right}
            alt="right"
          />
        </div>

        <div className="w-full">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <div className="flex justify-between pl-4">
                <div>
                  <h5 className="1920:text-xl text-base font-semibold">
                    {hotel.name}
                  </h5>
                  <p className="text-black_primary font-medium 1920:text-base text-sm">
                    {hotel.address.street},
                    <br />
                    {hotel.address.area}
                  </p>
                </div>
              </div>

              <div className="mt-2 flex gap-[14px] pl-4 pb-[18px]">
                <div className="flex items-center gap-1">
                  <img src={location} alt="location" />
                  <h5 className="text-primary_600 font-medium">Show in map</h5>
                </div>
                <div className="flex items-center gap-1">
                  <img src={star} alt="star" />
                  <h5 className="text-black_secondary font-medium">
                    {hotel.rating.score} ({hotel.rating.reviews})
                  </h5>
                </div>
                <div className="flex items-center gap-1">
                  <img src={bed} alt="bed" />
                  <h5 className="text-black_secondary font-medium">
                    {hotel.rating.score} ({hotel.rating.reviews})
                  </h5>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end text-right">
              <div className="flex items-center gap-1">
                <img
                  className="1920:w-[32px] w-[24px]"
                  src={naira}
                  alt="naira"
                />
                <h5 className="1920:text-[28px] text-[22px] font-semibold">
                  {hotel.pricing.perNight}
                </h5>
              </div>
              <h5 className="font-medium text-black_primary 1920:text-base text-sm">
                Total Price: NGN {hotel.pricing.totalPrice}
              </h5>
              <h5 className="font-medium text-black_primary 1920:text-base text-sm mt-1">
                {hotel.pricing.details}
              </h5>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#E4E7EC]" />

          <div className="flex justify-between items-center">
            <div className="pl-4 flex gap-3 items-center 1920:py-[14px] py-2.5">
              <h5 className="1920:text-lg text-base font-medium text-black_secondary">
                Facilities:
              </h5>
              <div className="flex items-center gap-4">
                {hotel.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-[6px]">
                    <img
                      src={facility.type === "pool" ? pool : bar}
                      alt={facility.type}
                    />
                    <div className="flex items-center gap-1">
                      <h5 className="font-medium text-black_secondary 1920:text-lg text-base">
                        {facility.name}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 text-black_secondary">
              <div className="flex gap-[6px] items-center">
                <img src={calendar} alt="calendar" />
                <h5 className="1920:text-lg text-base font-medium">
                  Check In: {hotel.booking.checkIn}
                </h5>
              </div>
              <div className="flex gap-[6px] items-center">
                <img src={calendar} alt="calendar" />
                <h5 className="1920:text-lg text-base font-medium">
                  Check Out: {hotel.booking.checkOut}
                </h5>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#E4E7EC]" />

          <div className="pl-4 mt-4 flex justify-between items-center">
            <div className="flex gap-8 items-center">
              <h5 className="1920:text-lg text-base ont-medium text-primary_600">
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
      <div className="flex justify-center items-center w-[46px] h-auto bg-[#FBEAE9] border rounded-r">
        <img src={close} alt="close" />
      </div>
    </div>
  );
};

export default HotelCard;