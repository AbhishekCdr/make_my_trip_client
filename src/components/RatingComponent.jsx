import React from "react";
import PropTypes from "prop-types";

const RatingComponent = ({ rating }) => {
  const getRatingWord = (rating) => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex items-center gap-2 rounded p-4 text-center">
      <div className="flex items-center space-x-2 rounded-xl bg-blue-700 px-8 py-3 text-3xl font-bold text-white">
        {rating}
      </div>
      <p className="mt-2 text-lg font-semibold text-blue-700">
        {getRatingWord(rating)}
      </p>
    </div>
  );
};

RatingComponent.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default RatingComponent;
