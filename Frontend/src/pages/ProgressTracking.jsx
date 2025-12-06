import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/ProgressTracking/HeroSection";
import BrandSection from "../components/ProgressTracking/BrandSection";
import PopularGameSection from "../components/ProgressTracking/PopularGameSection";
import TrendingMatchSection from "../components/ProgressTracking/TrendingMatchSection";
import FeatureGameSection from "../components/ProgressTracking/FeatureGameSection";
import PricingSection from "../components/ProgressTracking/PricingSection";
import GamingFeatureSection from "../components/ProgressTracking/GamingFeatureSection";
import TeamSection from "../components/ProgressTracking/TeamSection";
import TestimonialSection from "../components/ProgressTracking/TestimonialSection";
import CtaDownloadAppSection from "../components/ProgressTracking/CtaDownloadAppSection";
import NewsSection from "../components/ProgressTracking/NewsSection";
import NewsletterSection from "../components/NewsletterSection";

const modules = [
  { name: "Real-world hacking labs", key: "labs" },
  { name: "OSCP-style exercises", key: "oscp" },
  { name: "Web Exploitation", key: "web" },
  { name: "Progress tracking", key: "progress" },
];

const ProgressTracking = () => {
  const [progress, setProgress] = useState({ labs: true, oscp: false, web: false, progress: true });
  const completed = Object.values(progress).filter(Boolean).length;
  const percent = Math.round((completed / modules.length) * 100);

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2>Learning Progress</h2>
        <div style={{ background: "#222", borderRadius: 8, padding: 24, marginBottom: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ height: 24, background: "#444", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ width: `${percent}%`, background: "#e63946", height: "100%", transition: "width 0.5s" }} />
            </div>
            <div style={{ marginTop: 8, color: "#fff" }}>{percent}% complete</div>
          </div>
          <ul style={{ listStyle: "none", padding: 0, color: "#fff" }}>
            {modules.map((mod) => (
              <li key={mod.key} style={{ marginBottom: 8 }}>
                <input
                  type="checkbox"
                  checked={progress[mod.key]}
                  onChange={() => setProgress((p) => ({ ...p, [mod.key]: !p[mod.key] }))}
                  style={{ marginRight: 8 }}
                />
                {mod.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <HeroSection />
      <BrandSection />
      <PopularGameSection />
      <TrendingMatchSection />
      <FeatureGameSection />
      <PricingSection />
      <GamingFeatureSection />
      <TeamSection />
      <TestimonialSection />
      <CtaDownloadAppSection />
      <NewsSection />
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default ProgressTracking; 