import React from "react";
import Navbar from "./Navbar";
import Home from "../components/Home";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="relative h-screen">
        <Navbar />
        <Home />
        <img src="src\assets\bg4.jpg" className="h-4/5 bg-cover bg-center" />
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default HomePage;
