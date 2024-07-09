import React, { useState } from "react";

const SignUp = (props) => {
  const { registerOpen, onClose } = props;
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      onClose();
      onClose();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(data);
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-5 p-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="rounded-lg border p-3"
          id="username"
          onChange={handleChange}
        />
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
          className="rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex gap-2">
        <p>Have an account? </p>

        <button
          className="font-semibold text-blue-600 transition-all ease-in-out hover:underline"
          onClick={() => registerOpen()}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SignUp;
