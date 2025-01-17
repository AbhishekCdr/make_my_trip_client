import React, { useState } from "react";
import { useSelector } from "react-redux";

const HotelBookingForm = ({ listing }) => {
  const { regularPrice, discountPrice, name } = listing;

  const finalPrice = discountPrice === 0 ? regularPrice : discountPrice;
  const { username = "" } = useSelector(
    (state) => state.user.currentUser || {},
  );
  const [formData, setFormData] = useState({
    userName: username,
    Email: "",
    hotelName: name,
    price: finalPrice,
    dateOfBooking: "",
  });

  const api = "https://make-my-trip-api.vercel.app";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert dateOfBooking to Date object
    const bookingData = {
      ...formData,
      dateOfBooking: formatDate(formData.dateOfBooking),
    };

    try {
      const response = await fetch(api + "/api/booking/hotel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert("Booking created successfully");
        alert("Go to Profile to see all your bookings");
      } else {
        alert("Error creating booking");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating booking");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">User Name</label>
        <input
          type="text"
          name="userName"
          value={username}
          disabled
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Hotel Name</label>
        <input
          type="text"
          name="hotelName"
          value={name}
          disabled
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div className="mb-4 flex gap-3">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={discountPrice === 0 ? regularPrice : discountPrice}
          disabled
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
        <label className="block text-gray-700">Booking Date</label>
        <input
          type="date"
          name="dateOfBooking"
          value={formData.dateOfBooking}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Book Now
      </button>
    </form>
  );
};

export default HotelBookingForm;
