import React from "react";
import Rating from "@mui/material/Rating";
import { BiSolidOffer } from "react-icons/bi";
import CheckComponent from "./CheckComponent";
import { RiParkingFill } from "react-icons/ri";
import { FaPeopleArrows } from "react-icons/fa";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const {
    name,
    imageUrls,
    rating,
    coupleFriendly,
    parking,
    offer,
    discountPrice,
    regularPrice,
    _id,
  } = hotel;

  return (
    <div className="flex h-28 justify-between rounded-md bg-gray-100 p-4">
      <div className="flex h-full w-2/3 items-center gap-3">
        <div className="flex h-full w-4/5 gap-7">
          <img src={imageUrls[0]} alt={name} className="w-30" />

          <div className="flex flex-col font-bold">
            <Rating
              name="read-only"
              value={rating}
              readOnly
              className="-z-10"
            />
            <h1 className="text-wrap text-2xl">{name}</h1>
          </div>
        </div>
        <div className="flex w-1/5 flex-col items-center gap-2 text-sm">
          <div className="flex items-center gap-2 self-start">
            <FaPeopleArrows className="size-5" />
            Couple Friendly
            <CheckComponent isChecked={coupleFriendly} />
          </div>
          <div className="flex items-center gap-2 self-start">
            <RiParkingFill className="size-5" />
            Parking
            <CheckComponent isChecked={parking} />
          </div>
          <div className="flex items-center gap-2 self-start">
            <BiSolidOffer className="size-5" />
            Offers
            <CheckComponent isChecked={offer} />
          </div>
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center gap-1">
        <div className="w-20 rounded-lg py-2 text-center text-xl font-bold">
          ₹ {discountPrice === 0 ? regularPrice : discountPrice}/-
        </div>
        <Link
          to={`/listing/${_id}`}
          className="rounded-lg bg-blue-500 px-10 py-2 font-semibold text-white transition-all duration-200 ease-in-out hover:bg-blue-700"
        >
          Know More
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
