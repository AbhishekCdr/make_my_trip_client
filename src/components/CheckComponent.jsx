import React from "react";

const CheckComponent = ({ isChecked }) => {
  return (
    <div
      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${isChecked ? "border-green-500" : "border-red-500"}`}
    >
      {isChecked ? (
        <svg
          className="h-6 w-6 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="h-6 w-6 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </div>
  );
};

export default CheckComponent;
