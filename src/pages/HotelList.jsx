import React, { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";

const HotelList = () => {
  const [city, setCity] = useState("Goa");
  const [location, setLocation] = useState("India");
  const [checkIn, setCheckIn] = useState("2024-07-09");
  const [checkOut, setCheckOut] = useState("2024-07-10");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [formData, setFormData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [coupleFriendly, setCoupleFriendly] = useState(false);
  const [parking, setParking] = useState(false);
  const [offer, setOffers] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`/api/listing/get`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filtered = [...formData];

      if (priceRange !== "") {
        let [min, max] = priceRange
          .split("-")
          .map((str) => str.replace("₹", "").replace("+", "").trim());
        min = Number(min);
        max = max ? Number(max) : Infinity;

        filtered = filtered.filter((item) => {
          const price =
            item.discountPrice === 0 ? item.regularPrice : item.discountPrice; // Adjust according to your data structure
          return price >= min && price <= max;
        });
      }

      if (coupleFriendly) {
        filtered = filtered.filter((item) => item.coupleFriendly);
      }

      if (parking) {
        filtered = filtered.filter((item) => item.parking);
      }

      if (offer) {
        filtered = filtered.filter((item) => item.offer);
      }

      setFilteredData(filtered);
    };

    filterData();
  }, [priceRange, coupleFriendly, parking, offer, formData]);

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handleCoupleFriendlyChange = (e) => {
    setCoupleFriendly(e.target.checked);
  };

  const handleParkingChange = (e) => {
    setParking(e.target.checked);
  };

  const handleOffersChange = (e) => {
    setOffers(e.target.checked);
  };

  return (
    <div className="flex min-h-svh bg-gradient-to-b from-slate-900 to-sky-500 p-20">
      <div className="flex w-64 flex-col gap-3 p-5 text-white">
        <div>
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={coupleFriendly}
              onChange={handleCoupleFriendlyChange}
            />
            Couple Friendly
          </label>
        </div>
        <div>
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={parking}
              onChange={handleParkingChange}
            />
            Parking
          </label>
        </div>
        <div>
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={offer}
              onChange={handleOffersChange}
            />
            Offers
          </label>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex-1 rounded-2xl bg-white p-4">
        <div className="top-1/3 flex w-full justify-center">
          <div className="text-l top-14 flex w-full items-center rounded-xl border border-white bg-white p-4 shadow-inner">
            <div className="flex w-full space-x-4 rounded-lg border bg-white p-4 shadow">
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
                  onChange={handlePriceRangeChange}
                >
                  <option value="">Select a price range</option>
                  <option value="₹0-₹1500">₹0-₹1500</option>
                  <option value="₹1500-₹2500">₹1500-₹2500</option>
                  <option value="₹2500-₹3500">₹2500-₹3500</option>
                  <option value="₹3500-₹4500">₹3500-₹4500</option>
                  <option value="₹4500+">₹4500+</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {filteredData.length > 0 ? (
            filteredData.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))
          ) : (
            <div>No listings found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelList;
