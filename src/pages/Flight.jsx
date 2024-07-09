import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Flight = () => {
  const [airports, setAirports] = useState([]);
  const [departure, setDeparture] = useState("2024-07-09");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [classType, setClassType] = useState("Economy/Premium Economy");

  useEffect(() => {
    // Fetch the JSON data
    fetch("/airports.json")
      .then((response) => response.json())
      .then((data) => {
        setAirports(data);

        // Set a random default value
        const randomAirport = data[Math.floor(Math.random() * data.length)];
        setSelectedAirport(randomAirport.code);
      })
      .catch((error) => console.error("Error fetching airport data:", error));
  }, []);
  return (
    <>
      <div className="absolute top-1/3 flex w-full justify-center">
        <div className="text-l absolute top-14 flex w-4/5 items-center rounded-xl border border-white bg-white p-4 shadow-inner">
          <div className="h-3/4 w-full self-end">
            <div className="flex space-x-4 rounded-lg border bg-white p-4 shadow">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  From
                </label>
                <select
                  className="w-full border-b text-lg font-bold focus:outline-none"
                  onChange={(e) => setSelectedAirport(e.target.value)}
                >
                  {airports.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      {airport.name} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-xl">⇄</div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  To
                </label>
                <select
                  className="w-full border-b text-lg font-bold focus:outline-none"
                  onChange={(e) => setSelectedAirport(e.target.value)}
                >
                  {airports.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      {airport.name} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Departure
                </label>
                <input
                  type="date"
                  className="w-full border-b text-lg font-bold focus:outline-none"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                />
                <div className="text-sm text-gray-500">
                  {new Date(departure).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Return
                </label>
                <input
                  type="date"
                  className="w-full border-b text-lg text-gray-500 focus:outline-none"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Travellers & Class
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    className="w-1/2 border-b text-lg font-bold focus:outline-none"
                    value={travellers}
                    onChange={(e) => setTravellers(e.target.value)}
                    min="1"
                  />
                  <select
                    className="w-1/2 border-b text-sm text-gray-500 focus:outline-none"
                    value={classType}
                    onChange={(e) => setClassType(e.target.value)}
                  >
                    <option>Economy</option>
                    <option>Premium Economy</option>
                    <option>Business</option>
                    <option>First Class</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-2/3 flex w-full justify-center">
        <Link to={"/flight-list"}>
          <button className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 px-16 py-2 text-2xl font-bold uppercase text-white">
            Search
          </button>
        </Link>
      </div>
    </>
  );
};

export default Flight;
