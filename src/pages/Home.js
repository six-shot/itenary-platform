import React from "react";
import DashboardLayout from "../layouts/Dashboardlayout";
import banner from "../assets/svg/banner.png";
import calendar from "../assets/svg/CalendarBlank.svg";
import right from "../assets/svg/ArrowRight.svg";
import userplus from "../assets/svg/UserPluss.svg";
import threedots from "../assets/svg/DotsThree.svg";
import user from "../assets/svg/1.png";
import settigs from "../assets/svg/GearSix.png";
import Trips from "../components/trips";
import Hotels from "../components/hotels";
import Activities from "../components/activities";
import { useData } from "../context/data-context";
import { Link } from "react-router-dom";
export default function Home() {
  const { setIsActivityModalOpen, setIsHotelModalOpen, setIsFlightModalOpen } =
    useData();

  return (
    <DashboardLayout>
      <div className="1920:p-8 p-6 bg-white rounded w-full">
        <img className="w-full" src={banner} alt="banner" />
        <div className="1920:mt-6 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-start">
              <div className="px-2 py-1 bg-secondary flex gap-1 1920:text-sm text-xs ">
                <img src={calendar} alt="calendar" />
                <h5 className=" font-medium">21 March 2024</h5>
                <img src={right} alt="right" />
                <h5 className=" font-medium">21 April 2024</h5>
              </div>
              <p className="1920:text-[24px] text-[20px] font-semibold leading-[32px] mb-1">
                Bahamas Family Trip
              </p>
              <div className="flex items-center gap-1">
                <p className="font-medium 1920:text-base text-sm text-black_secondary leading-[24px]">
                  New York,  United States of America{" "}
                </p>
                <div className="w-[4px] h-[20px] bg-neutral_500 mx-1" />
                <p className="font-medium text-black_secondary leading-[24px]">
                  Solo Trip
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-8 items-center">
              <div className="flex items-center gap-2">
                <button className="w-[160px] h-[46px] bg-primary_100 rounded flex justify-center items-center">
                  <img src={userplus} alt="userplus" />
                </button>
                <img src={threedots} alt="threedot" />
              </div>
              <div className="flex items-center">
                <img src={user} alt="user" />
                <div className="w-[31px] h-[2px] bg-primary_100" />
                <div className="w-[40px] h-[40px] border border-primary_100 rounded-full flex items-center justify-center">
                  <img src={settigs} alt="settings" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-1 items-center 1920:mt-5 mt">
          <div className="px-[14px] pt-4 py-[18px] bg-primary_1100 rounded text-white">
            <h4 className="font-semibold">Activities</h4>
            <p className="1920:text-sm text-xs mt-2">
              Build, personalize, and optimize your <br /> itineraries with our
              trip planner.
            </p>
            <Link to="/activities">
              <button className="w-full 1920:h-[46px] h-[42px] bg-primary_600 1920:text-base text-sm rounded mt-[37px]">
                Add Activities
              </button>
            </Link>
          </div>
          <div className="px-[14px] pt-4 py-[18px] bg-primary_100 rounded text-black">
            <h4 className="font-semibold">Hotels</h4>
            <p className="1920:text-sm text-xs mt-2">
              Build, personalize, and optimize your <br /> itineraries with our
              trip planner.
            </p>
            <Link to="/hotels">
              <button className="w-full 1920:h-[46px] h-[42px] text-white bg-primary_600 1920:text-base text-sm rounded mt-[37px]">
                Add Hotels
              </button>
            </Link>
          </div>
          <div className="px-[14px] pt-4 py-[18px] bg-primary_600 rounded text-white">
            <h4 className="font-semibold">Flight</h4>
            <p className="1920:text-sm text-xs mt-2">
              Build, personalize, and optimize your <br /> itineraries with our
              trip planner.
            </p>
            <Link to="/flight">
              <button
            
                className="w-full 1920:h-[46px] h-[42px] bg-white text-primary_600 1920:text-base text-sm  rounded mt-[37px]"
              >
                Add Flights
              </button>
            </Link>
          </div>
        </div>
        <Trips />
        <Hotels />
        <Activities />
      </div>
    </DashboardLayout>
  );
}
