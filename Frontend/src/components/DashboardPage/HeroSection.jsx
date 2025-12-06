import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const HeroSection = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStartLearning = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      // Store intended route so user is redirected back after login
      localStorage.setItem("returnPath", "/labs/1");
      navigate("/login");
    } else {
      navigate("/labs/1");
    }
  };

  return (
    <section
      className="hero-section hero-1 fix bg-cover"
      style={{
        backgroundImage: "url(/assets/img/home-1/hero/Hero_bg2.jpg)",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="hero-image wow animated-image">
              <img
                src="/assets/img/home-1/hero/CharHacker.png"
                alt="img"
                className="small-hero-img"
              />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="hero-content">
              <h6 className="wow animated-image">
                Your Gateway to the Ultimate Cyber Arena . . .
              </h6>
              <h1 className="wow animated-image">Level Up Your Hacking Skills</h1>
              <div className="gt-hero-button wow animated-image">
                <button className="gt-theme-btn" onClick={handleStartLearning}>
                  Start Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
