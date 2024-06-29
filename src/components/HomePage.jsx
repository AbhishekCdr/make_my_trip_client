import React from "react";
import Navbar from "./Navbar";

const HomePage = () => {
  return (
    <div className="relative h-screen">
      <Navbar />

      <img src="src\assets\bg4.jpg" className="h-4/5 bg-cover bg-center" />
    </div>
  );
};

export default HomePage;
