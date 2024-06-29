import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import Modal from "./Modal/Modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Navbar = () => {
  const [open, isOpen] = useState(false);
  const [login, isLogin] = useState(true);

  function onOpen() {
    isOpen((old) => !old);
  }

  function onClose() {
    isOpen((old) => !old);
  }

  function loginOpen() {
    isLogin((old) => !old);
    console.log("clicked");
  }

  function registerOpen() {
    isLogin((old) => !old);
    console.log("clicked");
  }

  return (
    <>
      <Modal open={open} onClose={onClose}>
        {login ? (
          <SignIn registerOpen={registerOpen} />
        ) : (
          <SignUp registerOpen={registerOpen} />
        )}
      </Modal>

      <div className="absolute top-0 w-full text-white">
        <div className="flex max-h-16 items-center justify-between p-1 px-10 text-xs">
          <img
            src="src\assets\mmt_dt_top_icon.avif"
            alt="logo"
            className="h-full w-44 object-contain"
          />
          <button className="flex h-full items-center gap-1 rounded-md bg-white bg-opacity-10 px-4 py-3 font-bold shadow-lg">
            <FcDepartment className="size-5" />

            <span className="font-bold">List Your Property</span>
          </button>
          <div className="flex gap-1">
            <div className="h-full">
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
