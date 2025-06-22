import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import OurActivities from "./components/OurActivities/OurActivities";
import Banners from "./components/Banners/Banners";
import ImageCarousel from "./components/ImageCarousel/ImageCarousel";
import PrayerRequests from "./components/PrayerRequests/PrayerRequests";
import PastorTestimony from "./components/PastorTestimony/PastorTestimony";
import ChurchJourney from "./components/ChurchJourney/ChurchJourney";
import Gallery from "./components/Gallery/Gallery";
import MembershipHome from "./components/MembershipHome/MembershipHome";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import MembersList from "./components/MembersList/MembersList";
import FamilyTree from "./components/FamilyTree/FamilyTree";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import Offerings from "./components/Offerings/Offerings";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Banners />
              <OurActivities />
              <ImageCarousel />
              <ChurchJourney />
              <PastorTestimony />
              <Gallery />
              <PrayerRequests />
            </>
          }
        />
        <Route path="/membership-home" element={<MembershipHome />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/members" element={<MembersList />} />
        <Route path="/family-tree/:memberId" element={<FamilyTree />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/offerings" element={<Offerings />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;
