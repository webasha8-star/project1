import React from 'react';

const VideoSection = () => {
  return (
    <section className="gt-video-section section-padding pt-0 fix">
      <div className="container">
        <div className="gt-video-wrapper parallaxie style-2 bg-cover" style={{ backgroundImage: "url(/assets/img/home-1/feature/video-bg.jpg)" }}>
          <div className="gt-video-content">
            <h6 className="subtitle tz-sub-tilte tz-sub-anim text-uppercase tx-subTitle">LOVE TO HACK</h6>
            <h2 className="tx-title sec_title tz-itm-title tz-itm-anim">
             SWEET PAYLOAD <br/>
             EXECUTION
            </h2>
            <a href="/game-details" className="gt-theme-btn">
              play now
            </a>
          </div>
          <a href="https://www.youtube.com/watch?v=Cn4G2lZ_g2I" className="video-btn ripple video-popup">
            <i className="fa-solid fa-play"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoSection; 