import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import Modal from "../components/Modal/Modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, isOpen] = useState(false);
  const [login, isLogin] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const { username = "" } = useSelector(
    (state) => state.user.currentUser || {},
  );

  function onOpen() {
    isOpen((old) => !old);
  }

  function onClose() {
    isOpen((old) => !old);
  }

  function registerOpen() {
    isLogin((old) => !old);
  }

  return (
    <>
      <Modal open={open} onClose={onClose}>
        {login ? (
          <SignIn registerOpen={registerOpen} onClose={onClose} />
        ) : (
          <SignUp registerOpen={registerOpen} onClose={onClose} />
        )}
      </Modal>

      <div className="absolute top-0 w-full text-white">
        <div className="flex max-h-16 items-center justify-between p-1 px-10 text-xs">
          <Link to={"/"}>
            <img
              src="src\assets\mmt_dt_top_icon.avif"
              alt="logo"
              className="h-full w-44 object-contain"
            />
          </Link>
          <Link
            to={
              currentUser !== null &&
              currentUser !== "User not found" &&
              currentUser !== "Wrong Credentials !"
                ? "/create-listing"
                : "/admin"
            }
          >
            <button className="flex h-full items-center gap-1 rounded-md bg-white bg-opacity-10 px-4 py-3 font-bold shadow-lg">
              <FcDepartment className="size-5" />
              <span className="font-bold">List Your Property</span>
            </button>
          </Link>

          <div className="flex gap-1">
            <div className="h-full">
              {currentUser !== null &&
              currentUser !== "User not found" &&
              currentUser !== "Wrong Credentials !" ? (
                <div className="flex items-center">
                  <Link to={"/profile"}>
                    <button className="flex h-full items-center gap-1 rounded-md text-center shadow-lg">
                      <FaUserCircle className="h-full w-9 fill-white transition-colors duration-500 ease-in-out hover:fill-blue-400" />
                    </button>
                  </Link>
                  <div className="flex h-full items-center gap-1 rounded-md bg-gradient-to-r px-4 py-4 text-center text-sm font-semibold shadow-lg">
                    Welcome
                    <span className="font-bold text-cyan-500">{username}</span>
                  </div>
                </div>
              ) : (
                <button
                  className="flex h-full items-center gap-1 rounded-md bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-2 text-center shadow-lg"
                  onClick={onOpen}
                >
                  <img
                    src="src\assets\logo.svg"
                    alt="logo"
                    className="h-full w-6 fill-white"
                  />
                  <span className="font-bold">Login or create account</span>
                  <FaAngleDown />
                </button>
              )}
            </div>
            <div>
              <button className="flex h-full items-center gap-1 rounded-md bg-white bg-opacity-10 px-4 py-3 font-bold shadow-lg">
                <img src="src\assets\india.svg" alt="india" className="w-5" />
                <span className="font-bold">IN | ENG | INR</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
