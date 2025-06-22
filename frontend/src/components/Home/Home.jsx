import React from "react";
import Img1 from "../../assets/home/1.jpg";
import Img2 from "../../assets/home/2.jpg";
import Img3 from "../../assets/home/3.jpg";
import Img4 from "../../assets/home/4.jpg";
import Img5 from "../../assets/home/5.jpg";
import Img6 from "../../assets/home/6.jpg";
import Img7 from "../../assets/home/7.jpg";
import BackgroundVideo from "../../assets/videos/background-video.mp4"; // Import your video file
// import Navbar from "../Navbar/Navbar";

const Home = () => {
  return (
    <>
      <div className="relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 -z-10">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={BackgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content Section */}
        {/* <Navbar /> */}
        <div className="pt-16 pb-80 mb-10 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8 md:flex md:items-center">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-sans">
                AS ABOVE, <br />
                SO BELOW
              </h1>
              <p className="mt-4 text-md text-[#f2f2f2] font-[Poppins]">
                A place of worship, community, and spiritual growth. Join us to
                experience uplifting sermons, heartfelt worship, and a welcoming
                family. Everyone is invited to share in faith, hope, and love.
              </p>
            </div>
            {/* <div>
              <div className="mt-10">
                
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 border-4 border-white shadow-[0_4px_15px_rgba(255,255,255,0.7)]">
                          <img
                            alt="image1"
                            src={Img1}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg border-4 border-white shadow-[0_4px_15px_rgba(255,255,255,0.7)]">
                          <img
                            alt="image2"
                            src={Img2}
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg border-4 border-white shadow-[0_4px_15px_rgba(255,255,255,0.7)]">
                          <img
                            alt="image3"
                            src={Img3}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg border-4 border-white shadow-[0_4px_15px_rgba(255,255,255,0.7)]">
                          <img
                            alt="image4"
                            src={Img4}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg border-4 border-white shadow-[0_4px_15px_rgba(255,255,255,0.7)]">
                          <img
                            alt="image5"
                            src={Img5}
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg border-4 border-white shadow-[0_4px_15px_rgba(255,255,255,0.7)]">
                          <img
                            alt="image6"
                            src={Img6}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg border-4 border-white shadow-[0_4px_15px_rgba(255,255,255,0.7)]">
                          <img
                            alt="image7"
                            src={Img7}
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.youtube.com/@sundarpaul"
                  className="inline-block font-sans rounded-sm border border-transparent bg-white px-8 py-3 text-center font-semibold text-xl text-gray hover:bg-[#f2f2f2]"
                >
                  JOIN LIVE
                </a>
              </div>
            </div> */}
            <div className="relative md:left-[46%] mt-8 md:-mt-[39%]">
              <a
                href="https://www.youtube.com/@sundarpaul"
                className="inline-block w-[140px] h-[50px] font-sans rounded-sm border border-transparent bg-white px-8 py-3 text-center font-semibold text-[16px] text-gray hover:bg-[#f2f2f2]"
              >
                JOIN LIVE
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
