import React, { useEffect, useState } from "react";
import Home from "../components/Home";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HomeCard from "../components/HomeCard";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const HomePage = () => {
  const navigate = useNavigate();
  const images = [
    "static/images/bg1.jpg",
    "static/images/bg2.jpg",
    "static/images/bg3.jpg",
    "static/images/bg4.jpg",
  ];
  const [randomImage, setRandomImage] = useState("");
  const [formData, setFormData] = useState([]);
  const api = "https://make-my-trip-api.vercel.app";

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  useEffect(() => {
    navigate("/flight");
  }, []);

  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(api + `/api/listing/get`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  return (
    <>
      <div className="relative flex h-svh flex-col items-center bg-[#f2f2f2]">
        <Home />
        <img src={randomImage} className="h-4/5 bg-cover bg-center" />
        <div className="absolute bottom-9 flex items-center gap-3 text-lg">
          <MdKeyboardDoubleArrowDown className="size-7 animate-bounce" />
          <div className="font-bold">Explore more</div>
          <MdKeyboardDoubleArrowDown className="size-7 animate-bounce" />
        </div>
      </div>

      <div className="bg-[#f2f2f2] px-20 pt-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {formData.map((hotel) => (
            <Link
              to={`/listing/${hotel._id}`}
              key={hotel._id}
              className="transition-all duration-200 ease-in hover:scale-105"
            >
              <HomeCard key={hotel.id} hotel={hotel} />
            </Link>
          ))}
        </div>
      </div>

      <Footer />

      <Outlet></Outlet>
    </>
  );
};

export default HomePage;
