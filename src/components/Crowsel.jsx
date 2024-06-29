import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Crowsel() {
  const settings = {
    arrow: false,
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: false,
  };
  return (
    <Slider {...settings}>
      <div>
        <img src="src\assets\img1.png" alt="img1" />
      </div>
      <div>
        <img src="src\assets\img2.png" alt="img2" />
      </div>
      <div>
        <img src="src\assets\img3.png" alt="img3" />
      </div>
    </Slider>
  );
}
