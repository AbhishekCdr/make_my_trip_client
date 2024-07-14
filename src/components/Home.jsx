import React from "react";
import { MdOutlineFlight } from "react-icons/md";
import { FaHotel } from "react-icons/fa6";

import { NavLink, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="absolute inset-0 top-1/4 flex w-full justify-center">
        <div className="text-l flex h-28 items-center justify-center gap-7 rounded-xl border border-white bg-white px-7 font-bold text-black shadow-inner">
          <NavLink
            to={"/flight"}
            className={({ isActive }) =>
              isActive
                ? `flex h-full w-20 flex-col items-center justify-center border-b-4 border-blue-700 text-blue-700`
                : "flex h-full w-20 flex-col items-center justify-center gap-1 transition-all duration-100 ease-in-out hover:border-b-4 hover:border-blue-700 hover:text-blue-700"
            }
          >
            <MdOutlineFlight className="size-12 text-gray-500" />
            Flight
          </NavLink>

          <NavLink
            to={"/hotel"}
            className={({ isActive }) =>
              isActive
                ? `flex h-full w-20 flex-col items-center justify-center border-b-4 border-blue-700 text-blue-700`
                : "flex h-full w-20 flex-col items-center justify-center gap-1 transition-all duration-100 ease-in-out hover:border-b-4 hover:border-blue-700 hover:text-blue-700"
            }
          >
            <FaHotel className="size-12 text-gray-500" />
            Hotels
          </NavLink>

          {/* <button className="flex w-20 flex-col items-center gap-1">
            <HiHome className="size-12" />
            Homestays
          </button>
          <button className="flex w-20 flex-col items-center gap-1">
            <FaUmbrellaBeach className="size-12" />
            Holidays
          </button>
          <button className="flex w-20 flex-col items-center gap-1">
            <BiSolidTrain className="size-12" />
            Trains
          </button>
          <button className="flex w-20 flex-col items-center gap-1">
            <FaBus className="size-12" />
            Buses
          </button>
          <button className="flex w-20 flex-col items-center gap-1">
            <FaCarSide className="size-12" />
            Cabs
          </button>
          <button className="flex w-20 flex-col items-center gap-1">
            <CiCreditCard1 className="size-12" />
            Cards
          </button> */}
        </div>
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default Home;
