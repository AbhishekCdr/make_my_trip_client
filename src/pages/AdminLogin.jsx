import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = (props) => {
  const { registerOpen, onClose } = props;
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState(null);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        setErr(data.message);
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/create-listing");
    } catch (error) {
      setErr(error.message);
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col justify-center gap-8 p-5 text-center">
      <Link to={"/"}>
        <span className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-blue-600 transition-colors duration-300 ease-in-out hover:text-green-600">
          Go to Home
          <FaHome />
        </span>
      </Link>

      <h1 className="text-2xl font-bold">Sign In as Admin</h1>
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
          className="rounded-lg bg-gradient-to-r from-red-400 to-red-600 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      {err && <p className="text-red-500">{err}</p>}
    </div>
  );
};

export default AdminLogin;
