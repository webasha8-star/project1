import React from "react";

const BrandSection = () => {
  const brands = [
    { id: 1, image: "1.png" },
    { id: 2, image: "2.png" },
    { id: 3, image: "3.png" },
    { id: 4, image: "4.png" },
    { id: 5, image: "5.png" },
    { id: 6, image: "6.png" },
    { id: 7, image: "7.png" },
    { id: 8, image: "8.png" },
    { id: 9, image: "9.png" },
    { id: 10, image: "10.png" },
    { id: 11, image: "11.png" },
    { id: 12, image: "12.png" },
  ];

  // Duplicate list for continuous scroll effect
  const loopedBrands = [...brands, ...brands];

  return (
    <section className="gt-brand-section bg-black overflow-hidden relative">
      <div className="container mx-auto">
        <div className="brand-marquee">
          <div className="brand-track">
            {loopedBrands.map((brand, index) => (
              <div key={index} className="brand-item">
                <img
                  src={`/assets/img/home-1/brand/${brand.image}`}
                  alt={`brand-${brand.id}`}
                  className="brand-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inline CSS for styling and animation */}
      <style>{`
        .gt-brand-section {
          padding-top: 100px;    /* space above */
          padding-bottom: 100px; /* space below */
        }

        .brand-marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .brand-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: scroll-left 45s linear infinite;
        }

        .brand-item {
          flex: 0 0 auto;
          margin-right: 25px; /* space between logos */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .brand-image {
          width: 220px;   /* increased image size */
          height: 220px;
          object-fit: contain;
          opacity: 0.95;
        }

        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .brand-marquee:hover .brand-track {
          animation-play-state: paused;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .brand-image {
            width: 180px;
            height: 180px;
          }
          .gt-brand-section {
            padding-top: 80px;
            padding-bottom: 80px;
          }
        }

        @media (max-width: 768px) {
          .brand-image {
            width: 130px;
            height: 130px;
          }
          .gt-brand-section {
            padding-top: 60px;
            padding-bottom: 60px;
          }
        }

        @media (max-width: 480px) {
          .brand-image {
            width: 100px;
            height: 100px;
          }
          .gt-brand-section {
            padding-top: 50px;
            padding-bottom: 50px;
          }
        }
      `}</style>
    </section>
  );
};

export default BrandSection;
