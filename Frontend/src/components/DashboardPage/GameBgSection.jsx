import React from "react";
import { Link } from "react-router-dom";

const GameBgSection = () => {
  return (
    <section
      className=" fix bg-cover position-relative d-flex align-items-center"
      style={{
        backgroundImage: "url(/assets/img/home-1/game/b1.jpg)",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Dark overlay for better readability */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)",
          zIndex: 1,
        }}
      />
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="gt-gaming-bg-wrapper">
          <div className="row g-4 d-flex justify-content-between align-items-center">
            <div className="col-lg-6 col-12 d-flex justify-content-start">
              <div className="animate__animated animate__fadeInLeft" data-aos="fade-right">
                {/* Accent bar */}
                <div
                  style={{
                    width: "60px",
                    height: "4px",
                    background: "#00ff99",
                    borderRadius: "2px",
                    marginBottom: "20px",
                  }}
                ></div>
                <h6 className="text-white subtitle tz-sub-tilte tz-sub-anim text-uppercase tx-subTitle mb-3">
                  World-Class Cyber Arena
                </h6>
                <h2 className="text-white tx-title sec_title tz-itm-title tz-itm-anim mb-4">
                  FORGING LEGENDS IN THE CTF REALM!
                </h2>
                  <Link to="/upcoming-challenges" className="gt-theme-btn gt-style-border">
                    UPCOMING CHALLENGES
                  </Link>
              </div>
            </div>
            <div className="col-lg-6 col-12 d-flex justify-content-end">
              <div className="animate__animated animate__fadeInRight" data-aos="fade-left">
                {/* Accent bar */}
                <div
                  style={{
                    width: "60px",
                    height: "4px",
                    background: "#00ff99",
                    borderRadius: "2px",
                    marginBottom: "20px",
                  }}
                ></div>
                <h6 className="text-white subtitle tz-sub-tilte tz-sub-anim text-uppercase tx-subTitle mb-3">
                  Just Dropped: New CTF Labs
                </h6>
                <h2 className="text-white tx-title sec_title tz-itm-title tz-itm-anim mb-4">
                  GAME ON. GEAR
                  <br />
                  UP. WIN BIG!
                </h2>
                <div className="gt-button gt-style-2 wow animated-image slide-in-right animate__animated animate__fadeInUp animate__delay-1s">
                  {/* <Link to="/historical-challenges" className="gt-theme-btn gt-style-border">
                    HISTORICAL CHALLENGES
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameBgSection;
