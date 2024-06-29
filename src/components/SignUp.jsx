import React from "react";

const SignUp = (props) => {
  const { registerOpen } = props;
  return (
    <div className="flex w-full flex-col items-center gap-5 p-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <form
        className="flex w-full flex-col gap-2"
        //   onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="username"
          className="rounded-lg border p-3"
          id="username"
          //   onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="rounded-lg border p-3"
          id="email"
          //   onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="rounded-lg border p-3"
          id="password"
          //   onChange={handleChange}
        />
        <button
          //   disabled={loading}
          className="rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80"
        >
          Sign Up
          {/* {loading ? "Loading..." : "Sign Up"} */}
        </button>
      </form>
      <div className="mt-5 flex gap-2">
        <p>Have an account? </p>

        <button
          className="font-semibold text-blue-600 transition-all ease-in-out hover:underline"
          onClick={() => registerOpen()}
        >
          Sign in
        </button>
      </div>
      {/* {error && <p className="mt-5 text-red-500">{error}</p>} */}
    </div>
  );
};

export default SignUp;
