import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection3 from "../components/FeaturedChallenges/HeroSection3";
import AboutSection3 from "../components/FeaturedChallenges/AboutSection3";

const FeaturedChallenges = () => (
  <>
    {/* Back to Top Button */}
    <button id="gt-back-top" className="gt-back-to-top show">
      <i className="fa-regular fa-arrow-up"></i>
    </button>
    {/* Mouse Cursor */}
    <div className="mouseCursor cursor-outer"></div>
    <div className="mouseCursor cursor-inner"></div>
    {/* Offcanvas and Search Popup would go here if needed */}
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Header />
        <HeroSection3 />
        <AboutSection3 />
        <Footer />
      </div>
    </div>
  </>
);

export default FeaturedChallenges; 