import React, { useRef } from "react";
import Img1 from "../../assets/home/1.jpg";
import Img2 from "../../assets/home/2.jpg";
import Img3 from "../../assets/home/3.jpg";
import Img4 from "../../assets/home/4.jpg";
import Img5 from "../../assets/home/5.jpg";
import Img6 from "../../assets/home/6.jpg";
import Img7 from "../../assets/home/7.jpg";
import BackgroundImage from "../../assets/image_carousel/1.jpg";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ImageCarousel = () => {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -240,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 240,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Image Background */}
      <img
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={BackgroundImage}
        alt="Background"
      />

      {/* Overlay Content */}
      <div className="relative top-[30%] z-10  bg-opacity-50 h-full p-10">
        {/* Main Content */}
        <div className="flex justify-between items-start">
          {/* Left Section */}
          <div className="flex flex-col items-start space-y-4 text-white w-1/3">
            <h1 className="text-6xl font-bold font-[Poppins]">
              Latest Sermons
            </h1>
            <p className="text-md font-semibold font-sans">
              These sermons delve into the theme of "Embracing Hope: Navigating
              Life's Challenges," offering guidance and inspiration for
              overcoming the struggles and uncertainties of daily life.
            </p>
            <button className="bg-white mt-10 font-sans text-gray-900 font-semibold py-3 px-4 rounded-sm hover:bg-[#f2f2f2]">
              <a href="https://www.youtube.com/@sundarpaul">WATCH MORE</a>
            </button>
          </div>

          {/* Image Carousel */}
          <div className="relative flex items-center w-2/3">
            <button
              onClick={scrollLeft}
              className="absolute left-5 z-20 text-white p-2 rounded-full shadow-lg "
            >
              <MdKeyboardArrowLeft className="w-12 h-12" />
            </button>

            <div
              className="overflow-x-hidden whitespace-nowrap scroll-smooth rounded-lg w-full px-6"
              ref={scrollRef}
            >
              <div className="flex space-x-4">
                {[Img1, Img2, Img3, Img4, Img5, Img6, Img7].map(
                  (img, index) => (
                    <div
                      key={index}
                      className="h-80 w-60 overflow-hidden rounded-lg shadow-lg flex-shrink-0"
                    >
                      <img
                        alt={`image${index + 1}`}
                        src={img}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <button
              onClick={scrollRight}
              className="absolute right-2 z-20 text-white p-2 rounded-full shadow-lg"
            >
              <MdKeyboardArrowRight className="w-12 h-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
