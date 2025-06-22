import React, { useState } from "react";
import BackgroundImg from "../../assets/journey/bg3.jpg";

const timelineData = [
  {
    id: 1,
    date: "2014",
    title: "Foundation Year",
    content:
      "In 2014, our church was established by a small group of believers who felt called to spread the word of God. We gathered for prayer meetings and Bible studies, laying the foundation for our future. Despite humble beginnings, our mission to serve the community and grow in faith started here.",
    image: "path-to-2014-image.jpg",
    // color: "bg-blue-500",
    color: "bg-gray-500",
  },
  {
    id: 2,
    date: "2015",
    title: "First Outreach",
    content:
      "2015 marked the first major outreach program of our church. We organized community events, outreach services, and prayer sessions to reach people outside the church. It was an overwhelming success, and we witnessed many people coming forward to join the church and our mission.",
    image: "path-to-2015-image.jpg",
    // color: "bg-green-500",
    color: "bg-gray-500",
  },
  {
    id: 3,
    date: "2016",
    title: "Growth Phase",
    content:
      "In 2016, our church experienced significant growth. The congregation grew to over 100 members, and we began expanding our programs and services. We introduced youth and children’s ministries and started Bible study groups in various neighborhoods, further strengthening our community.",
    image: "path-to-2016-image.jpg",
    // color: "bg-yellow-500",
    color: "bg-gray-500",
  },
  {
    id: 4,
    date: "2017",
    title: "Youth Ministry",
    content:
      "By 2017, the need for a dedicated ministry for our youth became clear. We launched a Youth Ministry that focused on teaching the younger generation about the importance of faith, prayer, and service. Our youth programs grew rapidly, and many of the youth became active leaders within the church.",
    image: "path-to-2017-image.jpg",
    // color: "bg-purple-500",
    color: "bg-gray-500",
  },
  {
    id: 5,
    date: "2018",
    title: "Charity Work",
    content:
      "2018 was a year of outreach and service. We launched several programs to support underprivileged families, including food banks, clothing drives, and community education initiatives. This charity work became an integral part of our church's mission to serve those in need.",
    image: "path-to-2018-image.jpg",
    // color: "bg-red-500",
    color: "bg-gray-500",
  },
  {
    id: 6,
    date: "2019",
    title: "New Worship Hall",
    content:
      "In 2019, we celebrated the opening of our new worship hall. The new space allowed us to accommodate more people and create a more comfortable and inspiring environment for worship. This milestone marked a new chapter for our church as we continued to expand and serve.",
    image: "path-to-2019-image.jpg",
    // color: "bg-pink-500",
    color: "bg-gray-500",
  },
  {
    id: 7,
    date: "2020",
    title: "Digital Transformation",
    content:
      "In 2020, the pandemic forced us to adapt quickly to a new reality. We transitioned all of our services to an online platform, allowing us to stay connected with our congregation during the lockdown. Virtual Bible studies, worship services, and prayer meetings became a lifeline for our community.",
    image: "path-to-2020-image.jpg",
    // color: "bg-indigo-500",
    color: "bg-gray-500",
  },
  {
    id: 8,
    date: "2021",
    title: "Community Expansion",
    content:
      "2021 was a year of expanding our reach to neighboring communities. We started new satellite locations and partnered with other local churches and organizations. Our online presence also grew significantly, allowing us to touch the lives of people far beyond our local area.",
    image: "path-to-2021-image.jpg",
    // color: "bg-teal-500",
    color: "bg-gray-500",
  },
  {
    id: 9,
    date: "2022",
    title: "Global Partnerships",
    content:
      "In 2022, we took our outreach to a global level. We began collaborating with international faith-based organizations, engaging in missions overseas and providing aid to global communities. This expanded our vision and allowed our church to make an impact on a global scale.",
    image: "path-to-2022-image.jpg",
    // color: "bg-orange-500",
    color: "bg-gray-500",
  },
  {
    id: 10,
    date: "2023",
    title: "Celebrating 10 Years",
    content:
      "2023 was a year of celebration. We marked our 10-year milestone with gratitude and joy. This year was filled with reflection on all that God has done through our church, and we took time to honor the faithful members and leaders who have contributed to our success. The future looks bright as we continue our journey of faith.",
    image: "path-to-2023-image.jpg",
    color: "bg-gray-500",
  },
];

const ChurchJourney = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(milestone);
  };

  const closeModal = () => {
    setSelectedMilestone(null);
  };

  return (
    <div
      className="container mx-auto w-full px-0 py-8"
      style={{
        backgroundImage: `url(${BackgroundImg})`,
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center font-sans text-gray-900">
        Our Journey
      </h1>
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="absolute border-2 border-opacity-20 border-gray-700 h-full left-1/2 transform -translate-x-1/2"></div>
        {timelineData.map((milestone, index) => (
          <div
            key={milestone.id}
            className={`mb-8 flex justify-between items-center w-full ${
              index % 2 === 0 ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl h-8 rounded-full p-4 w-20">
              <h1 className="mx-auto font-semibold text-lg text-white font-sans">
                {milestone.date}
              </h1>
            </div>
            <button
              onClick={() => handleMilestoneClick(milestone)}
              className={`order-1 w-5/12 px-6 py-4 rounded-lg shadow-xl ${milestone.color} text-white transition-transform transform hover:scale-105`}
            >
              <h3 className="mb-3 font-bold text-xl font-sans">
                {milestone.title}
              </h3>
              <p className="text-sm leading-snug tracking-wide">
                {milestone.content}
              </p>
            </button>
          </div>
        ))}
      </div>

      {selectedMilestone && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative w-96 p-5 bg-white rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <selectedMilestone.icon
                className={`text-6xl ${selectedMilestone.color.replace(
                  "bg-",
                  "text-"
                )}`}
              />
              <h3 className="text-lg font-medium text-gray-900 mt-4">
                {selectedMilestone.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Detailed information about{" "}
                {selectedMilestone.title.toLowerCase()} milestone. This section
                can include more specific details, achievements, or reflections
                related to this particular point in your career.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChurchJourney;
