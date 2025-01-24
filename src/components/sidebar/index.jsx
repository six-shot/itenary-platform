import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import activities from "../../assets/svg/RoadHorizon.svg";
import vacationpackage from "../../assets/svg/Package.svg";
import medical from "../../assets/svg/FirstAidKit.svg";
import immigration from "../../assets/svg/SuitcaseRolling.svg";
import visa from "../../assets/svg/NewspaperClipping.svg";
import student from "../../assets/svg/Student.svg";
import flight from "../../assets/svg/AirplaneTilt.svg";
import hotel from "../../assets/svg/Buildings.svg";

const sidebarItems = [
  { id: 1, name: "Activities", icon: activities, link: "/activities" },
  { id: 2, name: "Hotels", icon: hotel, link: "/hotels" },
  { id: 3, name: "Flights", icon: flight, link: "/flight" },
  { id: 4, name: "Study", icon: student, link: "/study" },
  { id: 5, name: "Visa", icon: visa, link: "/visa" },
  { id: 6, name: "Immigration", icon: immigration, link: "/immigration" },
  { id: 7, name: "Medical", icon: medical, link: "/medical" },
  {
    id: 8,
    name: "Vacation Packages",
    icon: vacationpackage,
    link: "/vacation-packages",
  },
];

export default function Sidebar() {
  return (
    <div>
      <div className="1920:p-6 w-[300px] p-4 bg-white rounded flex flex-col gap-3">
        {sidebarItems.map((item) => (
          <Link
            key={item.id}
            to={item.link} // Use `to` for React Router, or replace with `href` for plain `<a>`
            className="px-[14px] 1920:h-[56px] h-[48px] flex items-center gap-2 hover:bg-gray-100 rounded"
          >
            <img className="1920:w-8 w-6 1920:h-8 h-6" src={item.icon} alt={item.name} />
            <h5 className="font-semibold 1920:text-base text-sm text-black_secondary">{item.name}</h5>
          </Link>
        ))}
      </div>
    </div>
  );
}
