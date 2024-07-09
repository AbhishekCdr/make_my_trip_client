import React, { useState } from "react";

const Hotel = () => {
  const [city, setCity] = useState("Goa");
  const [location, setLocation] = useState("India");
  const [checkIn, setCheckIn] = useState("2024-07-09");
  const [checkOut, setCheckOut] = useState("2024-07-10");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [priceRange, setPriceRange] = useState("₹0-₹1500, ₹1500-₹2500");
  return (
    <>
      <div className="absolute top-1/3 flex w-full justify-center">
        <div className="text-l absolute top-14 flex w-4/5 items-center rounded-xl border border-white bg-white p-4 shadow-inner">
          <div className="flex space-x-4 rounded-lg border bg-white p-4 shadow">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                City,Location
              </label>
              <input
                className="w-full border-b text-lg font-bold focus:outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                className="w-full border-b text-sm text-gray-500 focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Check-In
              </label>
              <input
                type="date"
                className="w-full border-b text-lg font-bold focus:outline-none"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
              <div className="text-sm text-gray-500">
                {new Date(checkIn).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Check-Out
              </label>
              <input
                type="date"
                className="w-full border-b text-lg font-bold focus:outline-none"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
              <div className="text-sm text-gray-500">
                {new Date(checkOut).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Rooms & Guests
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  className="w-1/2 border-b text-lg font-bold focus:outline-none"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  min="1"
                />
                <input
                  type="number"
                  className="w-1/2 border-b text-lg font-bold focus:outline-none"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  min="1"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Price Per Night
              </label>
              <select
                className="w-full border-b text-lg font-bold focus:outline-none"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option>₹0-₹1500</option>
                <option>₹1500-₹2500</option>
                <option>₹2500-₹3500</option>
                <option>₹3500-₹4500</option>
                <option>₹4500+</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-2/3 flex w-full justify-center">
        <button className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 px-16 py-2 text-2xl font-bold uppercase text-white">
          Search
        </button>
      </div>
    </>
  );
};

export default Hotel;
