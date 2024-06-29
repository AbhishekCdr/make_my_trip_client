import React from "react";

const SignIn = (props) => {
  const { registerOpen } = props;
  return (
    <div className="flex w-full flex-col items-center gap-10 p-4 text-center">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <form
        className="flex w-full flex-col gap-3"
        //   onSubmit={handleSubmit}
      >
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
          Sign In
          {/* {loading ? "Loading..." : "Sign In"} */}
        </button>
      </form>
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
