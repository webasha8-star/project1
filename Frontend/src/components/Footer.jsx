import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollBtn(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // MAIN STYLES
  const footer = {
    background: "#0a0e12",
    padding: "70px 20px 30px",
    color: "#d1d5db",
    fontFamily: "Poppins, sans-serif",
    borderTop: "1px solid #0f231c",
  };

  const container = {
    maxWidth: "1200px",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    gap: "40px",
    flexWrap: "wrap",
  };

  const left = {
    flex: 1,
    minWidth: "260px",
  };

  const title = {
    color: "#00ff7f",
    fontSize: "1.2rem",
    fontWeight: 600,
    marginBottom: "12px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  };

  const text = {
    margin: "6px 0",
    fontSize: "0.95rem",
    color: "#c5cdd1",
    lineHeight: 1.6,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const logoContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  };

  const logo = {
    width: "180px",
    filter: "drop-shadow(0 0 10px rgba(0, 255, 0, 0.3))",
  };

  const bottom = {
    textAlign: "center",
    marginTop: "40px",
    fontSize: "0.85rem",
    color: "#8b949e",
    paddingTop: "25px",
    borderTop: "1px solid #162225",
  };

  const scrollBtn = {
    position: "fixed",
    bottom: "28px",
    right: "28px",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#00ff7f",
    color: "#000",
    border: "none",
    cursor: "pointer",
    fontSize: "22px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: showScrollBtn ? 1 : 0,
    transform: showScrollBtn ? "translateY(0)" : "translateY(20px)",
    pointerEvents: showScrollBtn ? "auto" : "none",
    transition: "0.3s ease",
    boxShadow: "0 0 16px #00ff7f",
    zIndex: 9999,
  };

  // MOBILE RESPONSIVE FIX
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    container.flexDirection = "column-reverse";
    container.textAlign = "center";
    logo.width = "140px";
  }

  return (
    <>
      <footer style={footer}>
        <div style={container}>
          {/* LEFT SIDE */}
          <div style={left}>
            <h4 style={title}>Contact</h4>

            <p style={text}>
              <Phone size={18} color="#00ff7f" /> +91 8010911256
            </p>

            <p style={text}>
              <Mail size={18} color="#00ff7f" /> xyz@gmail.com
            </p>

            <p style={text}>
              <MapPin size={18} color="#00ff7f" />
              1st Floor (Beside Mahanagar Co-op Bank), Nagar Road,
              Chandan Nagar, Pune – 411014
            </p>

            <div style={{ marginTop: "20px" }}>
              <h4 style={title}>About Us</h4>
              <p style={text}>
                CrackMeNow provides cutting-edge cybersecurity training,
                hands-on labs, and real-world challenges.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE LOGO */}
          <div style={logoContainer}>
            <img
              src="/assets/img/logo/Footer_logo.png"
              alt="CrackMeNow"
              style={logo}
            />
          </div>
        </div>

        <div style={bottom}>
          © {new Date().getFullYear()} CrackMeNow. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
