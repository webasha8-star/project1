// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import axios from "axios";
// import { MessageSquarePlus } from "lucide-react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Layout from "../components/Layout";
// import "./css/Testimonial.css";

// const Testimonial = () => {
//   const [expanded, setExpanded] = useState({});
//   const [testimonials, setTestimonials] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     message: "",
//     rating: 5,
//   });

//   // Fetch testimonials dynamically from backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/testimonials")
//       .then((res) => setTestimonials(res.data))
//       .catch((err) => console.error("Error fetching testimonials:", err.message));
//   }, []);

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/testimonials", formData);
//       const updated = await axios.get("http://localhost:5000/api/testimonials");
//       setTestimonials(updated.data);
//       setShowPopup(false);
//       setFormData({ name: "", role: "", message: "", rating: 5 });
//     } catch (error) {
//       console.error("Error submitting testimonial:", error.message);
//     }
//   };

//   const toggleExpand = (index) => {
//     setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
//   };

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     pauseOnHover: true,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: { slidesToShow: 1 },
//       },
//     ],
//   };

//   return (
//     <Layout>
//       <div className="testimonial-section">
//         <h1 className="testimonial-heading">WHAT OUR LEARNERS SAY</h1>

//         <Slider {...sliderSettings} className="testimonial-grid-two">
//   {testimonials.map((t, index) => {
//     const isExpanded = expanded[index];
//     const textToShow = isExpanded
//       ? t.message
//       : t.message.split(" ").slice(0, 25).join(" ") +
//         (t.message.split(" ").length > 25 ? "..." : "");

//     return (
//       <div className="testimonial-card" key={t.id || index}>
//         <div className="testimonial-rating">
//           {Array(t.rating)
//             .fill()
//             .map((_, i) => (
//               <span key={i} className="star">
//                 ★
//               </span>
//             ))}
//         </div>

//         <p className="testimonial-feedback">{textToShow}</p>

//         {t.message.split(" ").length > 25 && (
//           <button
//             className="testimonial-toggle"
//             onClick={() =>
//               setExpanded((prev) => ({ ...prev, [index]: !prev[index] }))
//             }
//           >
//             {isExpanded ? "See Less" : "See More"}
//           </button>
//         )}

//         <div className="testimonial-user">
//           <h3 className="testimonial-name">{t.name}</h3>
//           <p className="testimonial-role">{t.role}</p>
//         </div>
//       </div>
//     );
//   })}
// </Slider>


//         <a href="/signup" className="testimonial-cta">
//           Start Your Cybersecurity Journey Today
//         </a>
//       </div>

//       {/* Floating Feedback Button (bottom-right corner) */}
//       <button
//         className="feedback-btn"
//         onClick={() => setShowPopup(true)}
//         title="Give Feedback"
//       >
//         <span className="feedback-icon">
//           <MessageSquarePlus size={26} />
//         </span>
//       </button>

//       {/* Popup Form for Feedback */}
//       {/* Popup Form for Feedback */}
// {showPopup && (
//   <div className="popup-overlay">
//     <div className="popup-box">
//       <button className="popup-close" onClick={() => setShowPopup(false)}>
//         ✕
//       </button>

//       <h2 className="popup-title">Add Feedback</h2>

//       <form onSubmit={handleSubmit} className="popup-form">
//         <input
//           type="text"
//           placeholder="Your Name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Your Role"
//           value={formData.role}
//           onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//           required
//         />
//         <textarea
//           placeholder="Your Feedback"
//           value={formData.message}
//           onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//           required
//         ></textarea>
//         <input
//           type="number"
//           min="1"
//           max="5"
//           placeholder="Rating (1–5)"
//           value={formData.rating}
//           onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
//           required
//         />
//         <div className="popup-buttons">
//           <button
//             type="button"
//             className="cancel-btn"
//             onClick={() => setShowPopup(false)}
//           >
//             Cancel
//           </button>
//           <button type="submit" className="submit-btn">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}

//     </Layout>
//   );
// };

// export default Testimonial;











import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import { MessageSquarePlus } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../components/Layout";
import "./css/Testimonial.css";

const Testimonial = () => {
  const [expanded, setExpanded] = useState({});
  const [testimonials, setTestimonials] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    rating: 5,
  });

  // Fetch testimonials
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/testimonials")
      .then((res) => setTestimonials(res.data))
      .catch((err) =>
        console.error("Error fetching testimonials:", err.message)
      );
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/testimonials", formData);
      const updated = await axios.get(
        "http://localhost:5000/api/testimonials"
      );
      setTestimonials(updated.data);
      setShowPopup(false);
      setFormData({ name: "", role: "", message: "", rating: 5 });
    } catch (error) {
      console.error("Error submitting testimonial:", error.message);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Layout>
      <div className="testimonial-section">
        <h1 className="testimonial-heading">WHAT OUR LEARNERS SAY</h1>

        <Slider {...sliderSettings} className="testimonial-grid-two">
          {testimonials.map((t, index) => {
            const isExpanded = expanded[index];
            const textToShow = isExpanded
              ? t.message
              : t.message.split(" ").slice(0, 25).join(" ") +
                (t.message.split(" ").length > 25 ? "..." : "");

            return (
              <div className="testimonial-card" key={t.id || index}>
                <div className="testimonial-rating">
                  {Array(t.rating)
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="star">
                        ★
                      </span>
                    ))}
                </div>

                <p className="testimonial-feedback">{textToShow}</p>

                {t.message.split(" ").length > 25 && (
                  <button
                    className="testimonial-toggle"
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [index]: !prev[index],
                      }))
                    }
                  >
                    {isExpanded ? "See Less" : "See More"}
                  </button>
                )}

                <div className="testimonial-user">
                  <h3 className="testimonial-name">{t.name}</h3>
                  <p className="testimonial-role">{t.role}</p>
                </div>
              </div>
            );
          })}
        </Slider>

        <a href="/signup" className="testimonial-cta">
          Start Your Cybersecurity Journey Today
        </a>
      </div>

      {/* Feedback Button */}
      <button
        className="feedback-btn"
        onClick={() => setShowPopup(true)}
        title="Give Feedback"
      >
        <span className="feedback-icon">
          <MessageSquarePlus size={26} />
        </span>
      </button>

      {/* Popup Form */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              ✕
            </button>

            <h2 className="popup-title">Add Feedback</h2>

            <form onSubmit={handleSubmit} className="popup-form">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Your Role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Your Feedback"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              ></textarea>
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rating (1–5)"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
                required
              />
              <div className="popup-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Testimonial;
