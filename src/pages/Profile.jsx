import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const { username = "" } = useSelector(
    (state) => state.user.currentUser || {},
  );
  const [hotelBookings, setHotelBookings] = useState([]);
  const [flightBookings, setFlightBookings] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [flightList, setFlightList] = useState([]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if ((data.success = false)) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  async function handleDeleteUser() {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/flight");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  async function handleSignOut() {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigate("/flight");
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  }

  async function handleShowListings() {
    try {
      setShowListingsError(false);
      setHotelList([]);
      setFlightList([]);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        true;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }

  async function handleListingDelete(listingId) {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId),
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleShowHotel(username) {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/booking/hotel/get`);
      const data = await res.json();

      if (!res.ok) {
        setShowListingsError(true);
        return;
      }

      const filteredBookings = data.filter(
        (booking) => booking.username === username,
      );

      setHotelBookings(filteredBookings);
    } catch (error) {
      setShowListingsError(true);
    }
  }

  async function handleShowFlight(username) {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/booking/flight/get`);
      const data = await res.json();

      if (!res.ok) {
        setShowListingsError(true);
        return;
      }

      const filteredBookings = data.filter(
        (flight) => flight.username === username,
      );

      setFlightBookings(filteredBookings);
    } catch (error) {
      setShowListingsError(true);
    }
  }

  async function handleShowFlightAll(username) {
    try {
      setShowListingsError(false);
      setUserListings([]);
      setHotelList([]);
      const res = await fetch(`/api/booking/flight/get`);
      const data = await res.json();

      if (!res.ok) {
        setShowListingsError(true);
        return;
      }

      setFlightList(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }

  async function handleShowHotelAll(username) {
    try {
      setShowListingsError(false);
      setFlightList([]);
      setUserListings([]);
      const res = await fetch(`/api/booking/hotel/get`);
      const data = await res.json();

      if (!res.ok) {
        setShowListingsError(true);
        return;
      }

      setHotelList(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }

  return (
    <div className="flex min-h-svh flex-col justify-center gap-8 bg-gradient-to-b from-slate-900 to-blue-500 px-96 pt-20 text-center">
      <h1 className="text-3xl font-bold text-white">Profile</h1>
      <form
        className="flex flex-col justify-center gap-5"
        onSubmit={handleSubmit}
      >
        <input
          disabled={currentUser.username === "admin" ? true : false}
          type="text"
          placeholder="username"
          className="rounded-lg border p-3"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="rounded-lg border p-3"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="rounded-lg border p-3"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "Update"}
        </button>
      </form>

      <div className="flex justify-between">
        <span
          className="cursor-pointer font-semibold text-yellow-300 transition-colors duration-300 ease-out hover:text-red-900"
          onClick={handleDeleteUser}
        >
          Delete Account
        </span>
        <span
          className="cursor-pointer font-semibold text-yellow-300 transition-colors duration-300 ease-out hover:text-red-900"
          onClick={handleSignOut}
        >
          Sign Out
        </span>
      </div>

      <p className="text-red-700">{error ? error : ""}</p>
      <p className="font-semibold text-green-500">
        {updateSuccess ? "User is updated Successfully !" : ""}
      </p>

      <p className="text-red-700">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {username !== "admin" && (
        <div className="flex justify-center gap-10">
          <button
            onClick={() => handleShowHotel(username)}
            className="font-bold text-white transition-all duration-300 ease-in-out hover:text-yellow-300"
          >
            Show Hotel Booking
          </button>
          <button
            onClick={() => handleShowFlight(username)}
            className="font-bold text-white transition-all duration-300 ease-in-out hover:text-yellow-300"
          >
            Show Flight Booking
          </button>
        </div>
      )}
      {hotelBookings &&
        hotelBookings.map((booking) => (
          <div
            key={booking._id}
            className="flex items-center justify-between gap-3 rounded-lg bg-white bg-opacity-80 p-5"
          >
            <div className="flex flex-col items-center gap-1 font-semibold">
              <p className="text-xs">Hotel Name</p>
              {booking.hotelName}
            </div>
            <div className="flex flex-col items-center gap-1 font-semibold">
              <p className="text-xs">Price</p>₹ {booking.price}
            </div>
            <div className="flex flex-col items-center gap-1 font-semibold">
              <p className="text-xs">Date of booking</p>
              {new Date(booking.dateOfBooking).toLocaleDateString()}
            </div>
          </div>
        ))}

      {flightBookings &&
        flightBookings.map((booking) => (
          <div
            key={booking._id}
            className="flex items-center justify-between gap-3 rounded-lg bg-white bg-opacity-80 p-5"
          >
            <div className="flex flex-col items-center gap-1 font-semibold">
              <p className="text-xs">Flight Name</p>
              {booking.flightName}
            </div>
            <div className="flex flex-col items-center gap-1 font-semibold">
              <p className="text-xs">Price</p>₹ {booking.price}
            </div>
            <div className="flex flex-col items-center gap-1 font-semibold">
              <p className="text-xs">Date of booking</p>
              {new Date(booking.dateOfBooking).toLocaleDateString()}
            </div>
          </div>
        ))}

      {/* admin panel */}
      {username === "admin" && (
        <div className="flex justify-center gap-7">
          <button
            onClick={handleShowListings}
            className="font-bold text-white transition-all duration-300 ease-in-out hover:text-yellow-300"
          >
            Show Listings
          </button>
          <button
            onClick={handleShowFlightAll}
            className="font-bold text-white transition-all duration-300 ease-in-out hover:text-yellow-300"
          >
            Show Fight Booking
          </button>
          <button
            onClick={handleShowHotelAll}
            className="font-bold text-white transition-all duration-300 ease-in-out hover:text-yellow-300"
          >
            Show Hotel Booking
          </button>
        </div>
      )}

      {flightList &&
        flightList.length > 0 &&
        flightList.map((booking) => (
          <div
            key={booking._id}
            className="flex items-center justify-between gap-3 rounded-lg bg-white bg-opacity-80 p-5"
          >
            <div className="flex flex-col items-center gap-1 font-semibold">
              <p className="text-xs">Flight Name</p>
              {booking.flightName}
            </div>
            <div className="flex flex-col items-center gap-1 font-semibold">
              <p className="text-xs">Price</p>₹ {booking.price}
            </div>
            <div className="flex flex-col items-center gap-1 font-semibold">
              <p className="text-xs">Date of booking</p>
              {new Date(booking.dateOfBooking).toLocaleDateString()}
            </div>
            <div className="flex flex-col items-center gap-1 font-semibold">
              <p className="text-xs">Username</p>
              {booking.username}
            </div>
          </div>
        ))}

      {hotelList &&
        hotelList.length > 0 &&
        hotelList.map((booking) => (
          <div
            key={booking._id}
            className="flex items-center justify-between gap-3 rounded-lg bg-white bg-opacity-80 p-5"
          >
            <div className="flex flex-col items-center gap-1 font-semibold">
              <p className="text-xs">Hotel Name</p>
              {booking.hotelName}
            </div>
            <div className="flex flex-col items-center gap-1 font-semibold">
              <p className="text-xs">Price</p>₹ {booking.price}
            </div>
            <div className="flex flex-col items-center gap-1 font-semibold">
              <p className="text-xs">Date of booking</p>
              {new Date(booking.dateOfBooking).toLocaleDateString()}
            </div>
            <div className="flex flex-col items-center gap-1 font-semibold">
              <p className="text-xs">Username</p>
              {booking.username}
            </div>
          </div>
        ))}

      {userListings &&
        userListings.length > 0 &&
        userListings.map((listing) => (
          <div
            key={listing._id}
            className="flex items-center justify-between gap-4 rounded-lg bg-white bg-opacity-70 p-3 transition-all duration-200 ease-in-out hover:bg-opacity-100"
          >
            <Link to={`/listing/${listing._id}`}>
              <img
                src={listing.imageUrls[0]}
                alt="listing cover"
                className="h-16 w-16 object-contain"
              />
            </Link>
            <Link
              to={`/listing/${listing._id}`}
              className="flex-1 truncate font-semibold hover:underline"
            >
              {listing.name}
            </Link>
            <div className="flex flex-col items-center gap-3">
              <button
                className="uppercase text-red-700"
                onClick={() => handleListingDelete(listing._id)}
              >
                delete
              </button>
              <Link to={`/update-listing/${listing._id}`}>
                <button className="uppercase text-green-700">edit</button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Profile;
