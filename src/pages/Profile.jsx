import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
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
  // const { username = "" } = useSelector(
  //   (state) => state.user.currentUser || {},
  // );

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
      navigate("/");
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
      navigate("/");
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  }

  async function handleShowListings() {
    try {
      setShowListingsError(false);
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

  return (
    <div className="mx-auto flex max-w-lg flex-col justify-center gap-8 p-5 text-center">
      <span
        className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-blue-600 transition-colors duration-300 ease-in-out hover:text-green-600"
        onClick={() => navigate("/")}
      >
        Go to Home
        <FaHome />
      </span>

      <h1 className="text-3xl font-bold">Profile</h1>
      <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit}>
        <input
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
          className="cursor-pointer font-semibold text-red-700 transition-colors duration-300 ease-out hover:text-red-900"
          onClick={handleDeleteUser}
        >
          Delete Account
        </span>
        <span
          className="cursor-pointer font-semibold text-red-700 transition-colors duration-300 ease-out hover:text-red-900"
          onClick={handleSignOut}
        >
          Sign Out
        </span>
      </div>
      <p className="text-red-700">{error ? error : ""}</p>
      <p className="font-semibold text-green-500">
        {updateSuccess ? "User is updated Successfully !" : ""}
      </p>

      <button
        onClick={handleShowListings}
        className="font-bold text-green-700 transition-all duration-300 ease-in-out hover:text-blue-700"
      >
        Show Listings
      </button>

      <p className="text-red-700">
        {showListingsError ? "Error showing listings" : ""}
      </p>
      {userListings &&
        userListings.length > 0 &&
        userListings.map((listing) => (
          <div
            key={listing._id}
            className="flex items-center justify-between gap-4 rounded-lg border p-3"
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
