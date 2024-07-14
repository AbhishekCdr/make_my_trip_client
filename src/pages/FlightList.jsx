import React, { useEffect, useState } from "react";
import FlightCard from "../components/FlightCard";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const FlightList = () => {
  const [airports, setAirports] = useState([]);
  const [departure, setDeparture] = useState("2024-07-09");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [classType, setClassType] = useState("Economy/Premium Economy");
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [priceRange, setPriceRange] = useState(""); // State for selected price range

  useEffect(() => {
    fetch("./airports.json")
      .then((response) => response.json())
      .then((data) => {
        setAirports(data);
      })
      .catch((error) => console.error("Error fetching airport data:", error));
  }, []);

  useEffect(() => {
    fetch("./flights.json")
      .then((response) => response.json())
      .then((data) => {
        setFlights(data);
        setFilteredFlights(data); // Initialize filtered flights with all flights
      })
      .catch((error) => console.error("Error fetching flight data:", error));
  }, []);

  useEffect(() => {
    if (priceRange === "") {
      setFilteredFlights(flights);
    } else {
      const [min, max] = priceRange.split("-").map(Number);
      setFilteredFlights(
        flights.filter((flight) => {
          const price = flight.price; // Adjust according to your data structure
          return (isNaN(min) || price >= min) && (isNaN(max) || price <= max);
        }),
      );
    }
  }, [priceRange, flights]);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-900 to-cyan-300 p-20">
      {/* Sidebar */}
      <div className="flex w-64 flex-col text-white">
        <div className="border-b border-gray-700 p-4 text-xl font-bold">
          Filter
        </div>
        <div className="flex-1 gap-1 space-y-2 p-4">
          <label>
            Price Range:
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="text-black"
            >
              <option value="">All</option>
              <option value="0-1000">Below ₹1000</option>
              <option value="1000-3000">₹1000 - ₹3000</option>
              <option value="3000-5000">₹3000 - ₹5000</option>
              <option value="5000-10000">₹5000 - ₹10000</option>
              <option value="10000-">Above ₹10000</option>
            </select>
          </label>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 rounded-2xl bg-white p-4">
        <div className="mb-4 border-b pb-4 text-2xl font-bold">
          <div className="h-3/4 w-full self-end">
            <div className="flex space-x-4 rounded-lg p-4 shadow">
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
        <div className="flex flex-col gap-2 rounded-lg bg-gray-100 p-4">
          {filteredFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightList;
