// import React from "react";
// import Layout from "../components/Layout";
// import HeroSection from "../components/DashboardPage/HeroSection";
// import AboutSection from "../components/DashboardPage/AboutSection";
// import MarqueeSection from "../components/DashboardPage/MarqueeSection";
// import GameBgSection from "../components/DashboardPage/GameBgSection";
// import GameSection from "../components/DashboardPage/GameSection";
// import ShopSection from "../components/DashboardPage/Learn_Labs";
// import BrandSection from "../components/DashboardPage/BrandSection";
// import NewsletterSection from "../components/DashboardPage/NewsletterSection";

// const DashboardPage = () => {
//   return (
//     <Layout>
//       <HeroSection />
//       <AboutSection />
//       <MarqueeSection />
//       <GameBgSection />
//       <GameSection />
//       {/* <ShopSection /> */}
//       <BrandSection />
//       {/* <NewsletterSection /> */}
//     </Layout>
//   );
// };

// export default DashboardPage;



import React from "react";
import Layout from "../components/Layout";
import HeroSection from "../components/DashboardPage/HeroSection";
import AboutSection from "../components/DashboardPage/AboutSection";
import MarqueeSection from "../components/DashboardPage/MarqueeSection";
import GameBgSection from "../components/DashboardPage/GameBgSection";
import GameSection from "../components/DashboardPage/GameSection";
import BrandSection from "../components/DashboardPage/BrandSection";
// Removed: ShopSection
// Removed: NewsletterSection

const DashboardPage = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <MarqueeSection />
      <GameBgSection />
      <GameSection />
      {/* <ShopSection /> */}
      <BrandSection />
      {/* <NewsletterSection /> */}
    </Layout>
  );
};

export default DashboardPage;
