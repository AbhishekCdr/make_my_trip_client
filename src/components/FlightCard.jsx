import React from "react";

const FlightCard = ({ flight }) => {
  return (
    <div className="flex flex-col items-center rounded-lg border bg-white p-4 shadow md:flex-row">
      <div className="mb-4 flex w-full items-center md:mb-0 md:w-1/4">
        <img
          src={flight.logo}
          alt="Akasa Air"
          className="mr-4 h-10 w-10 object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{flight.flightName}</h3>
          <p className="text-sm text-gray-700">{flight.flightCode}</p>
        </div>
      </div>
      <div className="mb-4 w-full text-center md:mb-0 md:w-1/4">
        <p className="text-xl font-bold">{flight.departureTime}</p>
        <p className="text-sm text-gray-700">{flight.from}</p>
      </div>
      <div className="mb-4 w-full text-center text-red-500 underline md:mb-0 md:w-1/4">
        <p className="text-sm text-gray-700">{flight.duration}</p>
      </div>
      <div className="mb-4 w-full text-center md:mb-0 md:w-1/4">
        <p className="text-xl font-bold">{flight.arrivalTime}</p>

        <p className="text-sm text-gray-700">{flight.to}</p>
      </div>
      <div className="mb-4 w-full text-center md:mb-0 md:w-1/4">
        <p className="text-xl font-bold">₹ {flight.price}</p>
        <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
