import React from 'react';
import Layout from '../components/Layout';

const EpicGallery = () => {
  const images = [
    "/assets/gallery/1.jpg",
    "/assets/gallery/2.jpg",
    "/assets/gallery/3.jpg",
    "/assets/gallery/4.jpg",
    "/assets/gallery/5.jpg",
  ];

  return (
    <>
      <Layout>

        <div style={{ padding: '60px', textAlign: 'center' , paddingTop:'130px' }}>
          <h1>Epic Gallery</h1>
          <p>Explore amazing moments captured from the CrackMeNow community.</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "40px",
            }}
          >
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Gallery ${idx + 1}`}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  objectFit: "cover",
                  height: "200px",
                }}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default EpicGallery;
