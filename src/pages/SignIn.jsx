import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";

const SignIn = (props) => {
  const { registerOpen, onClose } = props;
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState(null);
  const { loading, error } = useSelector((state) => state.user);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const dispatch = useDispatch();
  const api = "https://make-my-trip-api.vercel.app";

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      dispatch(signInStart());
      const res = await fetch(api + "/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (isChecked) {
        if (data.username !== "admin") {
          setErr("You are not admin");
          dispatch(signInFailure("User not found"));
          return;
        }
      }
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        setErr(data.message);
        return;
      }
      onClose();
      dispatch(signInSuccess(data));
    } catch (error) {
      setErr(error.message);
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 p-4 text-center">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className="rounded-lg border p-3"
          id="email"
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
          className={
            isChecked
              ? "rounded-lg bg-gradient-to-r from-red-400 to-red-600 p-3 uppercase text-white transition-all duration-200 ease-in-out hover:opacity-95 disabled:opacity-80"
              : "rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 p-3 uppercase text-white transition-all duration-200 ease-in-out hover:opacity-95 disabled:opacity-80"
          }
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex items-center gap-2 self-start">
        <input
          type="checkbox"
          id="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label htmlFor="checkbox" className="">
          admin
        </label>
      </div>
      {err && <p className="text-red-500">{err}</p>}
      <div className="flex gap-2">
        <p>Do not have account ? </p>
        <button
          className="font-semibold text-blue-600 transition-all ease-in-out hover:underline"
          onClick={() => registerOpen()}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignIn;
