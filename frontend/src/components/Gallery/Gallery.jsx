import React, { useRef, useState } from "react";
import Img1 from "../../assets/home/1.jpg";
import Img2 from "../../assets/home/2.jpg";
import Img3 from "../../assets/home/3.jpg";
import Img4 from "../../assets/home/4.jpg";
import Img5 from "../../assets/home/5.jpg";
import Img6 from "../../assets/home/6.jpg";
import Img7 from "../../assets/home/7.jpg";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Gallery = () => {
  const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7];
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef();

  // Function to move to the next image
  const nextImage = () => {
    scrollRef.current.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  // Function to move to the previous image
  const prevImage = () => {
    scrollRef.current.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-6 my-15">
      {/* Gallery Title and Text */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold mb-6 font-sans">Gallery</h2>
        <p className="text-lg text-gray-600 mb-20 font-sans">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec.
        </p>
      </div>

      {/* Image Carousel */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-5 w-14 h-14 rounded-full focus:outline-none z-10"
        >
          <MdKeyboardArrowLeft className="w-12 h-12" />
        </button>

        {/* Image Container */}
        <div className="overflow-hidden" ref={scrollRef}>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full max-w-[600px] px-2"
              >
                <img
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-[400px] object-cover rounded-sm shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute right-[2%] top-1/2 transform -translate-y-1/2 text-white p-5 w-14 h-14 rounded-full focus:outline-none z-10"
        >
          <MdKeyboardArrowRight className="w-12 h-12" />
        </button>
      </div>
    </div>
  );
};

export default Gallery;
