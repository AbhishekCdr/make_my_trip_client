import React from "react";
import Rating from "@mui/material/Rating";
import { BiSolidOffer } from "react-icons/bi";

const HomeCard = ({ hotel }) => {
  const { imageUrls, name, rating, discountPrice, regularPrice } = hotel;

  return (
    <div className="z-10 overflow-hidden rounded-lg border shadow-md">
      <img src={imageUrls[0]} alt={name} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>

        <Rating name="read-only" value={rating} readOnly />

        <p className="mt-2 flex justify-between gap-1 text-xl">
          <div className="flex gap-1 font-bold">
            ₹ {discountPrice === 0 ? regularPrice : discountPrice}
            <span className="self-end text-sm text-gray-500">per night</span>
          </div>
          {discountPrice !== 0 ? (
            <span className="size-8 text-sm">
              <img src="src\assets\offer.png" alt="" />
            </span>
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
};

export default HomeCard;
