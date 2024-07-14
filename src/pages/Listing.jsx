import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import Rating from "@mui/material/Rating";
import "swiper/css/bundle";
import { FaPeopleArrows } from "react-icons/fa";
import { RiParkingFill } from "react-icons/ri";
import { MdFreeBreakfast } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import CheckComponent from "../components/CheckComponent";
import Crowsel from "../components/Crowsel";
import RatingComponent from "../components/RatingComponent";
import Modal from "../components/Modal/Modal";
import HotelBookingForm from "../components/HotelBookForm";
import { useSelector } from "react-redux";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [open, isOpen] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const api = "https://make-my-trip-api.vercel.app";

  function onOpen() {
    if (
      currentUser !== null &&
      currentUser !== "User not found" &&
      currentUser !== "Wrong Credentials !"
    ) {
      isOpen((old) => !old);
    } else {
      navigate("/flight");
    }
  }

  function onClose() {
    isOpen((old) => !old);
  }

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(api + `/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      <Modal open={open} onClose={onClose}>
        <HotelBookingForm listing={listing} />
      </Modal>
      {loading && <p className="my-7 text-center text-2xl">Loading...</p>}
      {error && (
        <p className="my-7 text-center text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className="fbg-gradient-to-b flex min-h-svh w-full flex-col justify-center gap-5 bg-gradient-to-b from-slate-900 to-indigo-400 p-24 text-white">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">{listing.name}</h1>
            <Rating name="read-only" value={listing.rating} readOnly />
          </div>
          <div className="flex h-full w-full gap-10">
            <div className="flex w-3/5 flex-col gap-4 overflow-hidden rounded-lg object-contain">
              <div className="h-96 overflow-hidden shadow-lg">
                <Crowsel images={listing.imageUrls} className="h-2/3" />
              </div>

              <p>{listing.description}</p>
            </div>
            <div className="flex w-2/5 flex-col justify-center gap-6 self-start">
              <div className="flex flex-col gap-5 rounded-2xl border p-5 shadow-lg">
                <h1 className="text-lg font-bold">Amenities</h1>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-4">
                    <FaPeopleArrows className="size-5" />
                    Couple Friendly
                    <CheckComponent isChecked={listing.coupleFriendly} />
                  </div>
                  <div className="flex items-center gap-3">
                    <RiParkingFill className="size-5" />
                    Parking
                    <CheckComponent isChecked={listing.parking} />
                  </div>
                  <div className="flex items-center gap-3">
                    <MdFreeBreakfast className="size-5" />
                    Breakfast
                    <CheckComponent isChecked={listing.breakfast} />
                  </div>
                  <div className="flex items-center gap-3">
                    <BiSolidOffer className="size-5" />
                    Offers
                    <CheckComponent isChecked={listing.offer} />
                  </div>
                </div>
                <div className="flex flex-col">
                  {listing.offer ? (
                    <div className="flex flex-col">
                      <span className="flex gap-2 text-sm font-bold">
                        <s>₹ {listing.regularPrice}</s>
                        <span className="text-xs">Per Night:</span>
                      </span>
                      <span className="text-4xl font-bold">
                        ₹ {listing.discountPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold">
                      ₹ {listing.regularPrice} /-
                    </span>
                  )}
                </div>

                <button
                  className="self-start rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-2 font-extrabold uppercase text-white"
                  onClick={onOpen}
                >
                  {currentUser !== null &&
                  currentUser !== "User not found" &&
                  currentUser !== "Wrong Credentials !"
                    ? "Book now"
                    : "Login to Book"}
                </button>
              </div>
              <div className="flex rounded-2xl border p-5 shadow-lg">
                <RatingComponent rating={listing.rating} />
              </div>
            </div>
          </div>
          <div className="fixed right-[3%] top-[13%] z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-slate-100">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed right-[5%] top-[23%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
        </div>
      )}
    </main>
  );
}
