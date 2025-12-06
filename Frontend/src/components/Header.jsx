// import React, { useContext, useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../AuthContext";
// import { io } from "socket.io-client";
// import "./Header.css";

// const Header = () => {
//   const { isLoggedIn, logout } = useContext(AuthContext);

//   const [hideHeader, setHideHeader] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [hasUnread, setHasUnread] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ Detect scroll to hide header
//   useEffect(() => {
//     const handleScroll = () => setHideHeader(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // ✅ Fetch user role only when logged in
//   useEffect(() => {
//     if (isLoggedIn) {
//       const role = localStorage.getItem("role");
//       setUserRole(role ? role.toLowerCase() : null);
//     } else {
//       setUserRole(null); // hide admin menu after logout
//     }
//   }, [isLoggedIn]);

//   // ✅ Listen for real-time announcements
//   useEffect(() => {
//     if (!isLoggedIn) return;

//     const socket = io("http://localhost:5000", { transports: ["websocket"] });

//     socket.on("connect", () => console.log("🟢 Header socket connected"));

//     socket.on("announcement:new", (announcement) => {
//       console.log("📢 New announcement in Header:", announcement);
//       setHasUnread(true); // 🔴 Show red dot
//     });

//     socket.on("disconnect", () => console.log("🔴 Header socket disconnected"));

//     return () => socket.disconnect();
//   }, [isLoggedIn]);

//   const handleLogout = () => {
//     logout();
//     localStorage.removeItem("role");
//     setUserRole(null);
//     navigate("/");
//   };

//   const handleLogin = () => {
//     localStorage.setItem("returnPath", location.pathname);
//     navigate("/login");
//   };

//   // ✅ Search filtering
//   useEffect(() => {
//     if (searchQuery.trim().length === 0) {
//       setSuggestions([]);
//       return;
//     }

//     const allItems = [
//       { label: "OSCP Simulation", path: "/oscp-style-exercise" },
//       { label: "Upcoming Challenges", path: "/upcoming-challenges" },
//       { label: "Leaderboard", path: "/leaderboard" },
//       { label: "Testimonial", path: "/testimonial" },
//       { label: "Training Path", path: "/training-path" },
//       { label: "Gallery", path: "/gallery" },
//       { label: "FAQ", path: "/faq" },
//     ];

//     const filtered = allItems.filter((item) =>
//       item.label.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setSuggestions(filtered);
//   }, [searchQuery]);

//   // ✅ Handle Esc key & scroll lock
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") {
//         setShowSearch(false);
//         setSearchQuery("");
//         setSuggestions([]);
//       }
//     };

//     if (showSearch) {
//       document.body.style.overflow = "hidden";
//       window.addEventListener("keydown", handleKeyDown);
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [showSearch]);

//   return (
//     <>
//       <header className={`header-1 ${hideHeader ? "hide" : ""}`}>
//         <div className="container-fluid">
//           <div className="header-main">
//             {/* ☰ Hamburger Menu */}
//             <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//               <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
//             </div>

//             {/* ✅ Left Section (Logo + Menu) */}
//             <div className="header-left">
//               <div className="logo">
//                 <Link to="/" className="header-logo">
//                   <img src="/assets/img/logo/New_Logo.png" alt="CrackMeNow Logo" />
//                 </Link>
//               </div>

//               {!showSearch && (
//                 <div className="main-menu">
//                   <nav id="mobile-menu">
//                     <ul className={menuOpen ? "active" : ""}>
//                       <li>
//                         <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
//                       </li>

//                       <li className="has-dropdown">
//                         <Link>Learn</Link>
//                         <ul className="submenu">
//                           <li>
//                             <Link to="/labs/1" onClick={() => setMenuOpen(false)}>Labs</Link>
//                           </li>
//                           <li>
//                             <Link>Get Certified <i className="fas fa-angle-right"></i></Link>
//                             <ul className="submenu">
//                               <li>
//                                 <Link to="/OSCP_Certificate" onClick={() => setMenuOpen(false)}>OSCP</Link>
//                               </li>
//                             </ul>
//                           </li>
//                           <li>
//                             <Link to="/oscp-style-exercise" onClick={() => setMenuOpen(false)}>
//                               OSCP Simulations
//                             </Link>
//                           </li>
//                         </ul>
//                       </li>

//                       <li className="has-dropdown">
//                         <Link>Competes</Link>
//                         <ul className="submenu">
//                           <li><Link to="/upcoming-challenges">Upcoming Challenges</Link></li>
//                           <li><Link to="/historical-challenges">Historical Challenges</Link></li>
//                           <li><Link to="/leaderboard">Leaderboard</Link></li>
//                         </ul>
//                       </li>

//                       <li className="has-dropdown">
//                         <Link>OSCP Track</Link>
//                         <ul className="submenu">
//                           <li><Link to="/training-path">Training Path</Link></li>
//                           <li><Link to="/testimonial">Testimonial</Link></li>
//                           <li><Link to="/gallery">Gallery</Link></li>
//                           <li><Link to="/faq">FAQ</Link></li>
//                         </ul>
//                       </li>

//                       <li>
//                         <Link to="/blank" onClick={() => setMenuOpen(false)}>
//                           Blog
//                         </Link>
//                       </li>

//                       {/* ✅ Admin Dashboard — hidden until admin login */}
//                       {isLoggedIn && userRole === "admin" && (
//                         <li>
//                           <Link
//                             to="/admin-dashboard"
//                             onClick={() => setMenuOpen(false)}
//                             style={{ fontWeight: "bold" }}
//                           >
//                             Admin Dashboard
//                           </Link>
//                         </li>
//                       )}
//                     </ul>
//                   </nav>
//                 </div>
//               )}
//             </div>

//             {/* ✅ Right Section (Search, Profile, Auth) */}
//             <div className="header-right">
//               {/* ✅ Notification Bell (only for logged-in users) */}
//               {/* ✅ Real-time Notification Bell */}
//               {isLoggedIn && !showSearch && (
//                 <button
//                   className="notification-btn"
//                   title="Notifications"
//                   onClick={() => {
//                     navigate("/notifications");
//                     setHasUnread(false); // clear unread indicator on click
//                   }}
//                 >
//                   <i className="fas fa-bell"></i>
//                   {hasUnread && <span className="notification-dot"></span>}
//                 </button>
//               )}

//               {/* ✅ Search Button */}
//               {!showSearch && (
//                 <button onClick={() => setShowSearch(true)}>
//                   <i className="fas fa-search"></i>
//                 </button>
//               )}

//               {isLoggedIn ? (
//                 <div className="profile-menu">
//                   <button
//                     onClick={() => setShowProfileMenu(!showProfileMenu)}
//                     className="profile-btn"
//                   >
//                     <i className="fas fa-user-circle"></i>
//                   </button>

//                   {showProfileMenu && (
//                     <div className="profile-dropdown">
//                       <Link to="/profile" onClick={() => setShowProfileMenu(false)}>
//                         My Profile
//                       </Link>

//                       {/* ✅ Only show Admin Dashboard in profile if admin */}
//                       {userRole === "admin" && (
//                         <Link
//                           to="/admin-dashboard"
//                           style={{ color: "#22c55e", fontWeight: "bold" }}
//                           onClick={() => setShowProfileMenu(false)}
//                         >
//                           Admin Dashboard
//                         </Link>
//                       )}
//                       {/* ✅ Contact Us — visible only to logged-in users */}
//                       {userRole !== "admin" && (
//                         <li>
//                           <Link
//                             to="/contact"
//                             onClick={() => setMenuOpen(false)}
//                             style={{ fontWeight: "bold", color: "#22c55e" }}
//                           >
//                             Contact Us
//                           </Link>
//                         </li>
//                       )}

//                       <button onClick={handleLogout}>Logout</button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <>
//                   <button className="login-btn" onClick={handleLogin}>Log In</button>
//                   <Link to="/signup">
//                     <button className="join-btn">Join For Free</button>
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* 🔍 Search Modal */}
//       {showSearch && (
//         <div className="search-modal">
//           <button
//             className="close-btn"
//             onClick={() => {
//               setShowSearch(false);
//               setSearchQuery("");
//               setSuggestions([]);
//             }}
//           >
//             ❌
//           </button>

//           <input
//             type="text"
//             placeholder="Search CrackMeNow..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             autoFocus
//           />

//           <ul>
//             {suggestions.map((item, idx) => (
//               <li key={idx}>
//                 <Link
//                   to={item.path}
//                   onClick={() => {
//                     setShowSearch(false);
//                     setSearchQuery("");
//                     setSuggestions([]);
//                   }}
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;

import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { io } from "socket.io-client";
import "./Header.css";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const [hideHeader, setHideHeader] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Hide header on scroll
  useEffect(() => {
    const handleScroll = () => setHideHeader(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get user role
  useEffect(() => {
    if (isLoggedIn) {
      const role = localStorage.getItem("role");
      setUserRole(role ? role.toLowerCase() : null);
    } else {
      setUserRole(null);
    }
  }, [isLoggedIn]);

  // Socket for announcements
  useEffect(() => {
    if (!isLoggedIn) return;
    const socket = io("http://localhost:5000", { transports: ["websocket"] });

    socket.on("connect", () => console.log("Header socket connected"));
    socket.on("announcement:new", (announcement) => {
      console.log("New announcement:", announcement);
      setHasUnread(true);
    });
    socket.on("disconnect", () => console.log("Header socket disconnected"));

    return () => socket.disconnect();
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("role");
    setUserRole(null);
    navigate("/");
  };

  const handleLogin = () => {
    localStorage.setItem("returnPath", location.pathname);
    navigate("/login");
  };

  // Search logic
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const allItems = [
      { label: "OSCP Simulation", path: "/oscp-style-exercise" },
      { label: "Upcoming Challenges", path: "/upcoming-challenges" },
      { label: "Leaderboard", path: "/leaderboard" },
      { label: "Testimonial", path: "/testimonial" },
      { label: "Training Path", path: "/training-path" },
      { label: "Gallery", path: "/gallery" },
      { label: "FAQ", path: "/faq" },
    ];

    const filtered = allItems.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchQuery]);

  // Close search on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setSearchQuery("");
        setSuggestions([]);
      }
    };

    if (showSearch) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSearch]);

  return (
    <>
      <header className={`header-1 ${hideHeader ? "hide" : ""}`}>
        <div className="container-fluid">
          <div className="header-main">
            {/* Hamburger Menu */}
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </div>

            {/* Left Section (Logo + Menu) */}
            <div className="header-left">
              <div className="logo">
                <Link to="/" className="header-logo">
                  <img
                    src="/assets/img/logo/New_Logo.png"
                    alt="CrackMeNow Logo"
                  />
                </Link>
              </div>

              {!showSearch && (
                <div className="main-menu">
                  <nav id="mobile-menu">
                    <ul className={menuOpen ? "active" : ""}>
                      <li>
                        <Link to="/" onClick={() => setMenuOpen(false)}>
                          Home
                        </Link>
                      </li>

                      <li className="has-dropdown">
  <Link to="#" onClick={(e) => e.preventDefault()}>
    Learn
  </Link>
  <ul className="submenu">

                          {/* ✅ Only Labs is protected */}
                          <li>
                            <a
                              href="#labs"
                              onClick={(e) => {
                                e.preventDefault();
                                if (!isLoggedIn) {
                                  localStorage.setItem("returnPath", "/labs/1");
                                  navigate("/login");
                                } else {
                                  setMenuOpen(false);
                                  navigate("/labs/1");
                                }
                              }}
                            >
                              Labs
                            </a>
                          </li>

                          {/* The rest (OSCP, Simulation) are normal links */}
                          <li>
                            <Link
                              to="/OSCP_Certificate"
                              onClick={() => setMenuOpen(false)}
                            >
                              Get Certified OSCP
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/oscp-style-exercise"
                              onClick={() => setMenuOpen(false)}
                            >
                              OSCP Simulations
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="has-dropdown">
                        <Link>Competes</Link>
                        <ul className="submenu">
                          <li>
                            <Link to="/upcoming-challenges">
                              Upcoming Challenges
                            </Link>
                          </li>
                          {/* <li><Link to="/historical-challenges">Historical Challenges</Link></li> */}
                          <li>
                            <Link to="/leaderboard">Leaderboard</Link>
                          </li>
                        </ul>
                      </li>

                      <li className="has-dropdown">
  <Link to="#" onClick={(e) => e.preventDefault()}>
    OSCP Track
  </Link>

  <ul className="submenu">

    <li>
      <Link to="/training-path">Training Path</Link>
    </li>

    <li>
      <Link to="/testimonial">Testimonial</Link>
    </li>

    <li>
      <Link to="/gallery">Gallery</Link>
    </li>

    {/* === PROTECTED: FAQ === */}
    <li>
      <a
        href="#faq"
        onClick={(e) => {
          e.preventDefault();
          if (!isLoggedIn) {
            localStorage.setItem("returnPath", "/faq");
            navigate("/login");
          } else {
            navigate("/faq");
          }
        }}
      >
        FAQ
      </a>
    </li>

    {/* === PROTECTED: MYFAQ === */}
    <li>
      <a
        href="#myfaq"
        onClick={(e) => {
          e.preventDefault();
          if (!isLoggedIn) {
            localStorage.setItem("returnPath", "/my-faq");
            navigate("/login");
          } else {
            navigate("/my-faq");
          }
        }}
      >
        MyFAQ
      </a>
    </li>

  </ul>
</li>


                      <li>
                        <Link to="/blank" onClick={() => setMenuOpen(false)}>
                          Blog
                        </Link>
                      </li>

                      {/* Admin Dashboard */}
                      {isLoggedIn && userRole === "admin" && (
                        <li>
                          <Link
                            to="/admin-dashboard"
                            onClick={() => setMenuOpen(false)}
                            style={{ fontWeight: "bold" }}
                          >
                            Admin Dashboard
                          </Link>
                        </li>
                      )}

                      {/* Contact Us for normal users */}
                      {isLoggedIn && userRole !== "admin" && (
                        <li>
                          <Link
                            to="/contact"
                            onClick={() => setMenuOpen(false)}
                            style={{ fontWeight: "bold" }}
                          >
                            Contact Us
                          </Link>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="header-right">
              {isLoggedIn && !showSearch && (
                <button
                  className="notification-btn"
                  title="Notifications"
                  onClick={() => {
                    navigate("/notifications");
                    setHasUnread(false);
                  }}
                >
                  <i className="fas fa-bell"></i>
                  {hasUnread && <span className="notification-dot"></span>}
                </button>
              )}

              {!showSearch && (
                <button onClick={() => setShowSearch(true)}>
                  <i className="fas fa-search"></i>
                </button>
              )}

              {isLoggedIn ? (
                <div className="profile-menu">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="profile-btn"
                  >
                    <i className="fas fa-user-circle"></i>
                  </button>

                  {showProfileMenu && (
                    <div className="profile-dropdown">
                      <Link
                        to="/profile"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        My Profile
                      </Link>

                      {userRole === "admin" && (
                        <Link
                          to="/admin-dashboard"
                          style={{ fontWeight: "bold" }}
                          onClick={() => setShowProfileMenu(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}

                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button className="login-btn" onClick={handleLogin}>
                    Log In
                  </button>
                  <Link to="/signup">
                    <button className="join-btn">Join For Free</button>
                     </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {showSearch && (
        <div className="search-modal">
          <button
            className="close-btn"
            onClick={() => {
              setShowSearch(false);
              setSearchQuery("");
              setSuggestions([]);
            }}
          >
            X
          </button>

          <input
            type="text"
            placeholder="Search CrackMeNow..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />

          <ul>
            {suggestions.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.path}
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                    setSuggestions([]);
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
