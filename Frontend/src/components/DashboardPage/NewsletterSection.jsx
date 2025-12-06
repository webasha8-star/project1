import React from 'react';

const NewsletterSection = () => {
  return (
    <section className="gt-newsletter-section fix mb-4">
      <div className="container">
        <div className="gt-newsletter-wrapper bg-cover" style={{ backgroundImage: "url(/assets/img/ctf/newsletter-bg.jpg)" }}>
          <h4>
            Join CrckmeNow’s Newsletter for <br />
            Exclusive CTF Challenges & OSCP Tips
          </h4>
          <form action="#">
            <div className="form-clt">
              <input type="text" name="email" id="email" placeholder="Enter Your Email for Hacking Updates" style={{ color: '#000' }} />
              <button type="submit" className="gt-theme-btn">
                Subscribe Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;