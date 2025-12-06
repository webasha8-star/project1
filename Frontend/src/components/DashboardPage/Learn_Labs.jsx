import React from 'react';
import { Link } from 'react-router-dom';
import './Lab_Section.css';

const Lab_Numbers = [
  {
    id: 1,
    image: 'Easy Level 1.png',
    title: 'Offensive Security Basics',
    discount: 'Easy',
  },
  {
    id: 2,
    image: 'Easy Level 2.png',
    title: 'Linux Enumeration Essentials',
    discount: 'Easy',
  },
  {
    id: 3,
    image: 'Medium Level 1.png',
    title: 'Windows Enum & Privesc',
    discount: 'Medium',
  },
  {
    id: 4,
    image: 'Medium Level 2.png',
    title: 'Web Exploitation Fundamentals',
    discount: 'Medium',
  },
  {
    id: 5,
    image: 'Medium Level 3.png',
    title: 'Manual Exploitation & Shells',
    discount: 'Medium',
  },
  {
    id: 6,
    image: 'Medium Level 4.png',
    title: 'Buffer Overflow Basics',
    discount: 'Medium',
  },
  {
    id: 7,
    image: 'Hard Level 1.png',
    title: 'Linux Privesc Mastery',
    discount: 'Hard',
  },
  {
    id: 8,
    image: 'Hard Level 2.png',
    title: 'Windows Exploitation Chain',
    discount: 'Hard',
  },
  {
    id: 9,
    image: 'Hard Level 3.png',
    title: 'Post-Exploitation & Lateral Move',
    discount: 'Hard',
  },
  {
    id: 10,
    image: 'Hard Level 4.png',
    title: 'Active Directory Enumeration',
    discount: 'Hard',
  },
  {
    id: 11,
    image: 'Hard Level 5.png',
    title: 'Internal Network Pivoting',
    discount: 'Hard',
  },
  {
    id: 12,
    image: 'Hard Level 6.png',
    title: 'Custom Exploit Development',
    discount: 'Hard',
  },
  {
    id: 13,
    image: 'Extreme Level 1.png',
    title: 'BlackBox 1 – Linux Exam Sim',
    discount: 'Very Hard',
  },
  {
    id: 14,
    image: 'Extreme Level 2.png',
    title: 'BlackBox 2 – Windows AD Sim',
    discount: 'Very Hard',
  },
  {
    id: 15,
    image: 'Extreme Level 3.png',
    title: 'OSCP 24hr Simulation',
    discount: 'Very Hard',
  }
];

const Lab_Section = () => {
  return (
    <section
      className="gt-shop-section section-padding fix bg-cover"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.3,
        }}
      >
        <source src="/assets/videos/BG_Video_Labs_Character.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional dark overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="gt-section-title-2 text-center">
          <h6 className="subtitle tz-sub-tilte tz-sub-anim text-uppercase tx-subTitle">
            HACKER’S ARSENAL
          </h6>
          <h2 className="tx-title sec_title tz-itm-title tz-itm-anim">
           Choose Your Offensive PathS
          </h2>
        </div>
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: '20px 0' }}>
          {Lab_Numbers.map((item) => (
            <div key={item.id} style={{ display: 'inline-block', verticalAlign: 'top', width: 260, marginRight: 24 }}>
              <div
                className="gt-shop-card-item"
                style={{
                  padding: '24px 12px',
                  background: 'rgba(20,22,28,0.98)',
                  borderRadius: '12px',
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    background: '#0FA30F',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    borderRadius: '4px',
                    padding: '4px 12px',
                    marginBottom: '16px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  {item.discount}
                </span>
                <div className="shop-image">
                  <img
                    src={`/assets/img/home-1/shop/${item.image}`}
                    alt={item.title}
                    className="shop-image"
                  />
                </div>
                <div className="shop-content" style={{ textAlign: 'center' }}>
                  <h5 className="shop-title">
                    <Link to={`/labs/${item.id}`} style={{ color: '#fff', textDecoration: 'none' }}>
                      {item.title.trim()}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lab_Section; 