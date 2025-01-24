import React from "react";
import view from "../../assets/svg/Rectangle 3437.svg";
import left from "../../assets/svg/CaretCircleRight (2).svg";
import right from "../../assets/svg/CaretCircleRight (1).svg";
import location from "../../assets/svg/MapPin.svg";
import star from "../../assets/svg/Star.svg";
import bed from "../../assets/svg/Bed.svg";
import naira from "../../assets/svg/CurrencyNgn.svg";
import close from "../../assets/svg/X.svg";

const ActivityCard = ({ activity }) => {
  return (
    <div className="flex">
      <div className="relative 1920:p-6 p-4 bg-white rounded-l flex w-full">
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
                    {activity.name}
                  </h5>
                  <p className="text-black_primary 1920:text-base text-sm font-medium">
                    {activity.description}
                  </p>
                </div>
              </div>

              <div className="mt-2 flex gap-[14px] pl-4 pb-[18px]">
                <div className="flex items-center gap-1">
                  <img src={location} alt="location" />
                  <h5 className="text-primary_600 font-medium">Directions</h5>
                </div>
                <div className="flex items-center gap-1">
                  <img src={star} alt="star" />
                  <h5 className="text-black_secondary font-medium">
                    {activity.rating.score} ({activity.rating.reviews})
                  </h5>
                </div>
                <div className="flex items-center gap-1">
                  <img src={bed} alt="bed" />
                  <h5 className="text-black_secondary font-medium">
                    {activity.rating.score} ({activity.rating.reviews})
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
                  {activity.pricing.amount}
                </h5>
              </div>
              <h5 className="font-medium  text-black_primary 1920:text-base text-sm">
                Total Price: NGN {activity.pricing.totalPrice}
              </h5>
              <h5 className="font-medium text-black_primary mt-1 1920:text-base text-sm">
                {activity.pricing.details}
              </h5>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#E4E7EC]" />

          <div className="flex justify-between items-center">
            <div className="pl-4 flex gap-3 items-center 1920:py-[14px] py-2">
              <h5 className="1920:text-lg text-base font-medium text-black_secondary">
                What's Included:
              </h5>
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-1">
                    <h5 className="1920:text-lg font-medium text-black_secondary text-base">
                      {activity.included[0].name}
                    </h5>
                  </div>
                </div>
                <div className="flex items-center">
                  <h5 className="1920:text-lg text-base font-medium text-primary_600">
                    See more
                  </h5>
                </div>
              </div>
            </div>
            <div className="flex">
              <button className="h-[30px] px-2 rounded bg-[#0A369D] text-xs text-white">
                Day {activity.schedule.day} - ({activity.schedule.activities})
              </button>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#E4E7EC]" />

          <div className="pl-4 mt-4 flex justify-between items-center">
            <div className="flex gap-8 items-center">
              <h5 className="1920:text-lg text-base font-medium text-primary_600">
                Activity Details
              </h5>
              <h5 className="1920:text-lg text-base  font-medium text-primary_600">
                Price Details
              </h5>
            </div>
            <h5 className="1920:text-lg text-base  font-medium text-primary_600">
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

export default ActivityCard;