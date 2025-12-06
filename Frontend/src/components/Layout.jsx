import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const innerRef = useRef(null);
  const outerRef = useRef(null);

  useEffect(() => {
    const inner = innerRef.current;
    const outer = outerRef.current;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      if (inner && outer) {
        inner.style.transform = `translate(${clientX}px, ${clientY}px)`;
        outer.style.transform = `translate(${clientX}px, ${clientY}px)`;
      }
    };

    const addHover = () => {
      inner.classList.add("hover");
      outer.classList.add("hover");
    };

    const removeHover = () => {
      inner.classList.remove("hover");
      outer.classList.remove("hover");
    };

    const hoverTargets = document.querySelectorAll("a, button, .cursor-pointer");

    document.addEventListener("mousemove", moveCursor);
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [location.pathname]); 

  const cursorOuterStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "30px",
    height: "30px",
    border: "2px solid green",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 9999,
    transition: "transform 0.2s ease",
    transform: "translate(-50%, -50%)",
  };

  const cursorInnerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "8px",
    height: "8px",
    background: "limegreen",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 9999,
    transition: "transform 0.16s ease",
    transform: "translate(-50%, -50%)",
  };

  const hoverEffect = `
    .cursor-inner.hover {
      transform: scale(1.8);
      background: rgba(255, 255, 255, 0.4);
    }
    .cursor-outer.hover {
      transform: scale(1.5);
      border-color: rgba(255, 255, 255, 0.3);
    }
  `;

  return (
    <>
      <style>{hoverEffect}</style>

      {/* Custom Cursor */}
      <div className="cursor-outer" ref={outerRef} style={cursorOuterStyle}></div>
      <div className="cursor-inner" ref={innerRef} style={cursorInnerStyle}></div>

      {/* Back to Top Button */}
      <button
        id="gt-back-top"
        className="gt-back-to-top show"
        onClick={() => {
          // Kill any ongoing GSAP animations
          if (window.gsap) {
            window.gsap.killTweensOf(window);
            window.gsap.killTweensOf(document.documentElement);
            window.gsap.killTweensOf(document.body);
          }
          
          // Scroll to top instantly
          window.scrollTo({ top: 0, behavior: "auto" });
          
          // Also reset scroll position for smooth-content if it exists
          const smoothContent = document.getElementById('smooth-content');
          if (smoothContent) {
            smoothContent.scrollTop = 0;
          }
        }}
      >
        <i className="fa-regular fa-arrow-up"></i>
      </button>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
