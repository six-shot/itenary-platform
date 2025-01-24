import React, { useState } from "react";
import goicon from "../../assets/svg/GOICONWHITE1.svg";
import search from "../../assets/svg/MagnifyingGlass.svg";
import home from "../../assets/svg/House.svg";
import dashboard from "../../assets/svg/ChartPieSlice.svg";
import wallet from "../../assets/svg/Wallet.svg";
import listcheck from "../../assets/svg/ListChecks.svg";
import handcoin from "../../assets/svg/HandCoins.svg";
import notifications from "../../assets/svg/Bell.svg";
import carts from "../../assets/svg/Basket.svg";
import create from "../../assets/svg/PlusSquare.svg";
import user from "../../assets/svg/user.svg";
import caretdown from "../../assets/svg/CaretDown.svg";
import { CommandMenu } from "../sidebar/CommandMenu";
import { Link } from "react-router-dom";

export default function TopNav() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { icon: home, label: "Home", color: "text-black_secondary" },
    { icon: dashboard, label: "Dashboard", color: "text-black_secondary" },
    { icon: wallet, label: "Wallet", color: "text-black_secondary" },
    { icon: listcheck, label: "Plan a trip", color: "text-black_primary" },
    {
      icon: handcoin,
      label: "Commission for life",
      color: "text-black_secondary",
    },
  ];

  const actionItems = [
    {
      icon: notifications,
      label: "Notifications",
      color: "text-black_secondary",
    },
    { icon: carts, label: "Carts", color: "text-black_secondary" },
    { icon: create, label: "Create", color: "text-black_secondary" },
  ];

  return (
    <div className="flex justify-between items-center 1920:px-[2.5rem] px-[2rem] 1920:h-[134px] h-[83px] bg-[#FFF]">
      {/* Left Section */}
      <div className="flex items-center gap-7">
        <div className="p-2 bg-primary rounded">
          <Link to="/">
            <img
              className="1920:w-[42px] w-[30px] h-[30px] 1920:h-[40px]"
              src={goicon}
              alt="goicon"
            />
          </Link>
        </div>
        <div className="1920:w-[400px] w-[350px] 1920:h-[56px] h-[46px] bg-neutral_300 rounded p-3 flex items-center gap-2">
          <img src={search} alt="search" />
          <input
            onFocus={(e) => {
              e.target.blur();
              setOpen(true);
            }}
            type="text"
            placeholder="Search"
            className="w-full h-full bg-transparent outline-none placeholder:text-black_secondary"
          />
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex 1920:gap-8 gap-4 items-center">
        <div className="flex 1920:gap-6 gap-5 items-center">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="flex 1920:gap-2 gap-0 flex-col items-center"
            >
              <img
                src={item.icon}
                className="flex flex-col 1920:w-[32px] w-[24px] 1920:h-[32px] h-[24px]"
                alt={item.label}
              />
              <h5
                className={`${item.color} 1920:text-base text-xs leading-[24px] font-medium`}
              >
                {item.label}
              </h5>
            </div>
          ))}
        </div>

        <div className="w-[1px] h-[48px] bg-[#98A2B3]" />

        {/* Right Section */}
        <div className="flex 1920:gap-8 gap-4 items-center">
          <button className="px-2.5 1920:h-[40px] h-[35px] rounded bg-primary font-medium 1920:text-sm text-xs text-white">
            Subscribe
          </button>
          <div className="flex 1920:gap-6 gap-4 items-center">
            {actionItems.map((item, index) => (
              <div
                key={index}
                className="flex 1920:gap-2 gap-0 flex-col items-center"
              >
                <img
                  src={item.icon}
                  className="flex flex-col 1920:w-[32px] w-[24px] 1920:h-[32px] h-[24px]"
                  alt={item.label}
                />
                <h5
                  className={`${item.color} 1920:text-base text-xs leading-[24px] font-medium`}
                >
                  {item.label}
                </h5>
              </div>
            ))}
            <div className="flex items-center md:gap-[15px] gap-3">
              <img
                src={user}
                className="flex flex-col 1920:w-[52px] w-[40px] h-[40px] 1920:h-[52px]"
                alt="user"
              />
              <img
                src={caretdown}
                className="flex flex-col w-[24px] h-[24px]"
                alt="dropdown"
              />
            </div>
          </div>
        </div>
      </div>

      <CommandMenu open={open} setOpen={setOpen} />
    </div>
  );
}
