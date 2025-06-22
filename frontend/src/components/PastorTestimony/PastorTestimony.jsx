import { useState } from "react";
import PropTypes from "prop-types";
import { FaQuoteLeft } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const PastorTestimony = ({
  quote = "God’s grace transformed my heart, and through every trial, I found purpose and growth. My journey has been a testimony of His faithfulness, even in moments of feeling unworthy. As a pastor, I aim to share Christ’s love and offer hope through His Word. There’s no greater joy than witnessing lives changed and hearts healed by His presence. I believe we’re all called to serve with humility and passion, guiding others on their spiritual journeys. Let’s walk in faith, knowing His plans are good, and His love is everlasting.",
  clientName = "Ps. Sundar Paul",
  clientRole = "Founder, TGC",
  clientImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3",
  isDarkMode = false,
}) => {
  const [imageError, setImageError] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const fallbackImage =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3";

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      ref={ref}
      className={`w-full py-16 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto ${
          inView ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div
            className={`relative ${
              inView ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <div className="relative">
              <FaQuoteLeft
                className={`text-4xl mb-4 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <p className="text-xl sm:text-2xl font-medium mb-8 leading-relaxed font-[Poppins]">
                {quote}
              </p>
              <div className="mt-8">
                <div className="mt-4">
                  <h3 className="text-lg font-semibold font-[Poppins]">
                    {clientName}
                  </h3>
                  <p
                    className={`text-sm font-[Poppins] ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {clientRole}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`mt-12 lg:mt-0 relative ${
              inView ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <div className="aspect-w-12 aspect-h-14 lg:aspect-none">
              <img
                src={imageError ? fallbackImage : clientImage}
                alt={`Testimonial by ${clientName}`}
                onError={handleImageError}
                className="rounded-xl shadow-xl transform transition duration-500 hover:scale-105 object-cover object-center lg:w-[600px] lg:h-[600px] w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PastorTestimony.propTypes = {
  quote: PropTypes.string,
  clientName: PropTypes.string,
  clientRole: PropTypes.string,
  clientImage: PropTypes.string,
  rating: PropTypes.number,
  isDarkMode: PropTypes.bool,
};

export default PastorTestimony;
