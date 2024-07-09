import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Flight from "./pages/Flight";
import Hotel from "./pages/Hotel";
import FlightList from "./pages/FlightList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="flight" element={<Flight />} />
          <Route path="hotel" element={<Hotel />} />
        </Route>
        <Route path="flight-list" element={<FlightList />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
